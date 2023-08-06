import logging
import collections

from detectem.utils import (
    extract_version, extract_name, extract_version_from_headers,
    get_most_complete_version, check_presence
)
from detectem.plugin import get_plugin_by_name
from detectem.settings import VERSION_TYPE, INDICATOR_TYPE, HINT_TYPE

logger = logging.getLogger('detectem')


class Result():
    def __init__(self, name, version=None, homepage=None, type=VERSION_TYPE):
        self.name = name
        self.type = type
        self.version = version
        self.homepage = homepage


class Detector():
    def __init__(self, response, plugins, requested_url):
        self.har = response['har']
        self.requested_url = requested_url

        self._softwares = response['softwares']
        self._results = set()

        # Separate plugins according to its type
        self.version_plugins = [p for p in plugins if not p.is_indicator]
        self.indicators = [p for p in plugins if p.is_indicator]

    def get_hints(self, plugin, entry):
        """ Get plugins hints from `plugin` on `entry`.

        Plugins hints return `Result` or `None`.

        """
        hints = []

        for hint_function in getattr(plugin, 'hints', []):
            hint = hint_function(entry)
            if hint:
                hint.type = HINT_TYPE
                hints.append(hint)

        return hints

    def process_har(self):
        """ Detect plugins present in the page.

        First, start with version plugins, then software from Splash
        and finish with indicators.
        In each phase try to detect plugin hints in already detected plugins.

        """
        hints = []
        for entry in self.har:
            for plugin in self.version_plugins:
                version = self.get_plugin_version(plugin, entry)
                if version:
                    # Name can be different than plugin name in modular plugins
                    name = self.get_plugin_name(plugin, entry)
                    self._results.add(
                        Result(name, version, plugin.homepage)
                    )
                    hints += self.get_hints(plugin, entry)

        # Feedback from Javascript, it comes from Splash
        for software in self._softwares:
            plugin = get_plugin_by_name(software['name'], self.version_plugins)
            self._results.add(
                Result(plugin.name, software['version'], plugin.homepage)
            )
            hints += self.get_hints(plugin, entry)

        for entry in self.har:
            for plugin in self.indicators:
                is_present = self.check_indicator_presence(plugin, entry)
                if is_present:
                    self._results.add(
                        Result(
                            plugin.name,
                            homepage=plugin.homepage,
                            type=INDICATOR_TYPE
                        )
                    )
                    hints += self.get_hints(plugin, entry)

        for hint in hints:
            self._results.add(hint)

    def get_results(self, metadata=False):
        """ Return results of the analysis. """
        results_data = []

        self.process_har()

        for rt in self._results:
            rdict = {'name': rt.name}
            if rt.version:
                rdict['version'] = rt.version

            if metadata:
                rdict['homepage'] = rt.homepage
                rdict['type'] = rt.type

            results_data.append(rdict)

        return results_data

    def _is_first_request(self, entry):
        return entry['request']['url'].rstrip('/') == self.requested_url.rstrip('/')

    def get_values_from_matchers(self, entry, matchers, extraction_function):
        values = []

        for key, matchers in matchers.items():
            method = getattr(self, 'from_{}'.format(key))
            value = method(entry, matchers, extraction_function)
            if value:
                values.append(value)

        return values

    def get_plugin_version(self, plugin, entry):
        """ Return a list of (name, version) after applying every plugin matcher. """
        versions = []
        grouped_matchers = plugin.get_grouped_matchers()

        # Check headers just for the first request
        if not self._is_first_request(entry) and 'header' in grouped_matchers:
            del grouped_matchers['header']

        versions = self.get_values_from_matchers(
            entry, grouped_matchers, extract_version
        )

        return get_most_complete_version(versions)

    def get_plugin_name(self, plugin, entry):
        if not plugin.is_modular:
            return plugin.name

        grouped_matchers = plugin.get_grouped_matchers('modular_matchers')
        module_name = self.get_values_from_matchers(
            entry, grouped_matchers, extract_name
        )

        if module_name:
            name = '{}-{}'.format(plugin.name, module_name[0])
        else:
            name = plugin.name

        return name

    def check_indicator_presence(self, plugin, entry):
        grouped_matchers = plugin.get_grouped_matchers('indicators')

        presence_list = self.get_values_from_matchers(
            entry, grouped_matchers, check_presence
        )

        return any(presence_list)

    @staticmethod
    def from_url(entry, matchers, extraction_function):
        """ Return version from request or response url.
        Both could be different because of redirects.

        """
        for rtype in ['request', 'response']:
            url = entry[rtype]['url']
            version = extraction_function(url, matchers)
            if version:
                return version

    @staticmethod
    def from_body(entry, matchers, extraction_function):
        body = entry['response']['content']['text']

        version = extraction_function(body, matchers)
        if version:
            return version

    @staticmethod
    def from_header(entry, matchers, _):
        """ Return version from valid headers.
        It only applies on first request.

        """
        headers = entry['response']['headers']
        version = extract_version_from_headers(headers, matchers)
        if version:
            return version
