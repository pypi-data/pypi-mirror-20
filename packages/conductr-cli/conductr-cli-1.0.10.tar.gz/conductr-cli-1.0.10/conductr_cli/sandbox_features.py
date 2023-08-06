"""Sandbox features.

Features are specified on the command line with `-f/--feature NAME [ ARGS ... ]`.

Any feature arguments will be passed to the feature class constructor.

Feature attributes:
    name (str): Feature name used for command line argument.
    ports (list of int): Docker port mappings for the feature.
    dependencies (list of str): Names of other features that should also be enabled.
    conductr_feature_envs (list of str): Feature names to pass when ConductR is started in Docker.
    conductr_args (list of str): Args that should be added during ConductR start.
    conductr_roles (list of str): Roles that should be added during ConductR start.
    start (method): Start the feature as needed. Called after the sandbox has started.
"""

import conductr_cli
from conductr_cli import docker, sandbox_proxy
from conductr_cli.constants import FEATURE_PROVIDE_LOGGING, FEATURE_PROVIDE_PROXYING
from conductr_cli.sandbox_common import major_version
from conductr_cli.screen_utils import h1
import logging


class FeatureStartResult:
    def __init__(self, started, bundle_results):
        self.started = started
        self.bundle_results = bundle_results


class BundleStartResult:
    def __init__(self, name, port):
        self.name = name
        self.port = port


class ProxyingFeature:
    """Proxying feature.

    On start, the proxying features will be run.
    """

    name = 'proxying'
    ports = []
    dependencies = []
    provides = [FEATURE_PROVIDE_PROXYING]

    def __init__(self, version_args, image_version, offline_mode):
        self.version_args = version_args
        self.image_version = image_version
        self.offline_mode = offline_mode
        self.host = None
        self.proxy_bind_addr = None
        self.bundle_http_port = None
        self.proxy_ports = None

    def conductr_post_start(self, args, run_result):
        if major_version(self.image_version) != 1:
            self.host = run_result.host
            self.proxy_bind_addr = run_result.core_addrs[0]
            self.bundle_http_port = args.bundle_http_port
            self.proxy_ports = sorted(args.ports)

    @staticmethod
    def conductr_args():
        return []

    def conductr_feature_envs(self):
        return []

    def conductr_roles(self):
        if major_version(self.image_version) == 1:
            return []
        else:
            return ['haproxy']

    def start(self):
        if major_version(self.image_version) == 1 or None in [self.host, self.proxy_bind_addr, self.bundle_http_port,
                                                              self.proxy_ports]:
            return FeatureStartResult(False, [])
        else:
            log = logging.getLogger(__name__)
            log.info(h1('Starting proxying feature'))

            started = sandbox_proxy.start_proxy(proxy_bind_addr=self.proxy_bind_addr,
                                                bundle_http_port=self.bundle_http_port,
                                                proxy_ports=self.proxy_ports,
                                                all_feature_ports=all_feature_ports())

            if started:
                log.info('HAProxy has been started')
                log.info('Your Bundles are by default accessible on:')
                log.info('  {}:{}'.format(self.host, self.bundle_http_port))
            else:
                log.info('HAProxy has not been started')
                log.info('To enable proxying ensure Docker is running and restart the sandbox')

            return FeatureStartResult(started, [])

    @staticmethod
    def stop():
        return sandbox_proxy.stop_proxy()


class VisualizationFeature:
    """Visualization feature.

    On start, the visualizer bundle will be run. The version of the visualizer
    bundle can also be configured using feature arguments. For example:

        `-f visualization`: default latest version of the Visualizer bundle
        `-f visualization v2`: specify the compatibility version
    """

    name = 'visualization'
    ports = [9999]
    dependencies = []
    provides = []

    def __init__(self, version_args, image_version, offline_mode):
        self.version_args = version_args
        self.image_version = image_version
        self.offline_mode = offline_mode

    def conductr_post_start(self, args, run_result):
        return

    def conductr_feature_envs(self):
        if major_version(self.image_version) == 1:
            return [self.name]
        else:
            return []

    @staticmethod
    def conductr_args():
        return []

    @staticmethod
    def conductr_roles():
        return []

    def start(self):
        if major_version(self.image_version) == 1:
            return FeatureStartResult(False, [])
        else:
            log = logging.getLogger(__name__)
            log.info(h1('Starting visualization feature'))
            visualizer = select_bintray_uri('visualizer', self.version_args)
            log.info('Deploying bundle %s..' % visualizer['bundle'])
            load_command = ['load', visualizer['bundle'], '--disable-instructions'] + \
                parse_offline_mode_arg(self.offline_mode)
            conductr_cli.conduct_main.run(load_command, configure_logging=False)
            conductr_cli.conduct_main.run(['run', visualizer['name'], '--disable-instructions'],
                                          configure_logging=False)
            return FeatureStartResult(True, [BundleStartResult('visualizer', self.ports[0])])

    @staticmethod
    def stop():
        return True


class LoggingFeature:
    """Logging feature.

    On start, the conductr-elasticsearch and conductr-kibana bundles are started.
    The version of the bundles can also be configured using feature arguments. For example:

        `-f logging`: default latest version of the Visualizer bundle
        `-f logging v2`: specify the compatibility version
    """

    name = 'logging'
    ports = [5601, 9200]
    dependencies = []
    provides = [FEATURE_PROVIDE_LOGGING]

    def __init__(self, version_args, image_version, offline_mode):
        self.version_args = version_args
        self.image_version = image_version
        self.offline_mode = offline_mode

    def conductr_post_start(self, args, run_result):
        return

    def conductr_feature_envs(self):
        if major_version(self.image_version) == 1:
            return [self.name]
        else:
            return []

    def conductr_args(self):
        if major_version(self.image_version) == 1:
            return []
        else:
            return ['-Dcontrail.syslog.server.port=9200', '-Dcontrail.syslog.server.elasticsearch.enabled=on']

    def conductr_roles(self):
        if major_version(self.image_version) == 1:
            return []
        else:
            return ['elasticsearch', 'kibana']

    def start(self):
        if major_version(self.image_version) == 1:
            return FeatureStartResult(False, [])
        else:
            log = logging.getLogger(__name__)
            log.info(h1('Starting logging feature based on elasticsearch and kibana'))
            log.info('conductr-kibana bundle is packaged as a Docker image. Checking Docker requirements..')
            docker.validate_docker_vm(docker.vm_type())
            log.info('Docker is installed and configured correctly.')
            elasticsearch = select_bintray_uri('conductr-elasticsearch', self.version_args)
            log.info('Deploying bundle %s..' % elasticsearch['bundle'])
            elasticsearch_load_command = ['load', elasticsearch['bundle'], '--disable-instructions'] + \
                parse_offline_mode_arg(self.offline_mode)
            conductr_cli.conduct_main.run(elasticsearch_load_command, configure_logging=False)
            conductr_cli.conduct_main.run(['run', elasticsearch['name'], '--disable-instructions'],
                                          configure_logging=False)
            kibana = select_bintray_uri('conductr-kibana', self.version_args)
            log.info('Deploying bundle %s..' % kibana['bundle'])
            kibana_load_command = ['load', kibana['bundle'], '--disable-instructions'] + \
                parse_offline_mode_arg(self.offline_mode)
            conductr_cli.conduct_main.run(kibana_load_command, configure_logging=False)
            conductr_cli.conduct_main.run(['run', kibana['name'], '--disable-instructions', '--wait-timeout', '600'],
                                          configure_logging=False)
            return FeatureStartResult(True, [
                BundleStartResult('conductr-kibana', self.ports[0]),
                BundleStartResult('conductr-elasticsearch', self.ports[1])
            ])

    @staticmethod
    def stop():
        return True


class LiteLoggingFeature:
    """Lite logging feature.

    On start, the latest eslite bundle is started
    """

    name = 'lite-logging'
    ports = []
    dependencies = []
    provides = [FEATURE_PROVIDE_LOGGING]

    def __init__(self, version_args, image_version, offline_mode):
        self.version_args = version_args
        self.image_version = image_version
        self.offline_mode = offline_mode

    def conductr_post_start(self, args, run_result):
        return

    @staticmethod
    def conductr_feature_envs():
        return []

    def conductr_args(self):
        if major_version(self.image_version) == 1:
            return []
        else:
            return ['-Dcontrail.syslog.server.port=9200', '-Dcontrail.syslog.server.elasticsearch.enabled=on']

    def conductr_roles(self):
        if major_version(self.image_version) == 1:
            return []
        else:
            return ['elasticsearch']

    def start(self):
        if major_version(self.image_version) == 1:
            return FeatureStartResult(False, [])
        else:
            log = logging.getLogger(__name__)
            log.info(h1('Starting logging feature based on eslite'))
            eslite = select_bintray_uri('eslite', self.version_args)
            log.info('Deploying bundle %s..' % eslite['bundle'])
            load_command = ['load', eslite['bundle'], '--disable-instructions'] + \
                parse_offline_mode_arg(self.offline_mode)
            conductr_cli.conduct_main.run(load_command, configure_logging=False)
            conductr_cli.conduct_main.run(['run', eslite['name'], '--disable-instructions'], configure_logging=False)
            return FeatureStartResult(True, [])

    @staticmethod
    def stop():
        return True


class MonitoringFeature:
    """Monitoring feature.

    The monitoring feature depends on the logging feature.

    On start, a Grafana bundle will be run. The version of the Grafana
    bundle can also be configured using feature arguments. For example:

        `-f monitoring`: default latest version of the Grafana bundle
        `-f monitoring v2`: specify the compatibility version
        `-f monitoring 2.1.0`: specify the full Cinnamon version
        `-f monitoring snapshot 2.1.0-20161018-43bab24`: specify a snapshot version
    """

    name = 'monitoring'
    ports = [3000]
    conductr_args = []
    conductr_roles = []
    dependencies = [LoggingFeature.name]
    provides = []

    def __init__(self, version_args, image_version, offline_mode):
        self.version_args = version_args
        self.image_version = image_version
        self.offline_mode = offline_mode

    def conductr_post_start(self, args, run_result):
        return

    @staticmethod
    def conductr_feature_envs():
        return []

    @staticmethod
    def conductr_args():
        return []

    @staticmethod
    def conductr_roles():
        return []

    def start(self):
        log = logging.getLogger(__name__)
        log.info(h1('Starting monitoring feature'))
        bundle_repo = 'lightbend/commercial-monitoring/' if self.version_args and self.version_args[0] == 'snapshot' \
            else ''
        bundle_name = 'cinnamon-grafana' if major_version(self.image_version) == 1 else 'cinnamon-grafana-docker'
        grafana = select_bintray_uri(bundle_name, self.version_args, bundle_repo)
        log.info('Deploying bundle %s..' % grafana['bundle'])
        load_command = ['load', grafana['bundle'], '--disable-instructions'] + \
            parse_offline_mode_arg(self.offline_mode)
        conductr_cli.conduct_main.run(load_command, configure_logging=False)
        conductr_cli.conduct_main.run(['run', grafana['name'], '--disable-instructions', '--wait-timeout', '600'], configure_logging=False)
        return FeatureStartResult(True, [BundleStartResult(grafana['name'], self.ports[0])])

    @staticmethod
    def stop():
        return True


feature_classes = [ProxyingFeature, VisualizationFeature, LoggingFeature, LiteLoggingFeature, MonitoringFeature]

feature_names = [feature.name for feature in feature_classes]
feature_lookup = {feature.name: feature for feature in feature_classes}


def calculate_features(features):
    """Given a list of feature names, calculates all features that are to be started in dependency order.

    Returns:
        list of str: All features (by name) to be started in dependency order
    """

    visited = set()
    calculated_names = []

    def visit(feature_names):
        for feature_name in feature_names:
            if feature_name not in visited:
                visited.add(feature_name)
                visit(feature_lookup[feature_name].dependencies)
                calculated_names.append(feature_name)

    visit(features)

    return calculated_names


def collect_features(feature_args, no_default_features, image_version, offline_mode):
    """Collect all enabled features.

    Collect features recursively with topological sort to include all dependencies in order.

    Args:
        feature_args (list of list of str): Command-line arguments for features.
            Note that each feature has a list of arguments, the first is the feature name,
            followed by optional arguments. For example: `[['logging'], ['monitoring', '2.1.0']]`.
        no_default_features: If true, no features will be enabled unless explicitly included
        image_version: Version of the ConductR docker image.
        offline_mode: The offline mode flag

    Returns:
        list of obj: All enabled features, initialised with feature arguments, in dependency order.
    """

    feature_names = [name for name, *args in feature_args]
    feature_args = {name: args for name, *args in feature_args}

    features = []

    all_feature_names = calculate_features(feature_names)

    for feature_name in all_feature_names:
        args = feature_args[feature_name] if feature_name in feature_args else []
        feature = feature_lookup[feature_name](args, image_version, offline_mode)
        features.append(feature)

    def add_default_features(features):
        def add_proxying(features):
            features.insert(0, feature_lookup[ProxyingFeature.name]([], image_version, offline_mode))

        def add_logging_lite(features):
            names = [feature.name for feature in features]
            if LoggingFeature.name not in names:
                features.insert(0, feature_lookup[LiteLoggingFeature.name]([], image_version, offline_mode))

        add_logging_lite(features)
        add_proxying(features)

    if not no_default_features:
        add_default_features(features)

    return features


def feature_conflicts(names):
    """Calculates all feature conflicts (according to provides)

    Args:
        names: list of str

    Returns:
        dictionary with key equals provide, value equals list of conflicting names
        e.g. { 'logging': ['logging-lite', 'logging'] }
    """

    conflicts = {}

    for n in calculate_features(names):
        f = feature_lookup[n]

        for p in f.provides:
            if p in conflicts:
                conflicts[p].append(f.name)
            else:
                conflicts[p] = [f.name]

    for p in list(conflicts):
        if len(conflicts[p]) < 2:
            del conflicts[p]

    return conflicts


def stop_features():
    feature_success = True

    for f in feature_classes:
        feature_success = f.stop() and feature_success

    return feature_success


def select_bintray_uri(name, version_args=[], bundle_repo=''):
    bundle_version = ''  # latest
    # parse args: [VERSION]
    if version_args:
        if version_args[0] == 'snapshot':
            if version_args[1:]:
                bundle_version = version_args[1]
        else:
            bundle_version = version_args[0]

    # reformat version: dashes to dots and ensure 'v' prefix
    if bundle_version:
        bundle_version = bundle_version.replace('-', '.')
        bundle_version = 'v' + bundle_version if not bundle_version.startswith('v') else bundle_version
        bundle_version = ':' + bundle_version
    bundle_expression = bundle_repo + name + bundle_version
    return {'name': name, 'bundle': bundle_expression}


def parse_offline_mode_arg(offline_mode):
    if offline_mode:
        return ['--offline']
    else:
        return []


def all_feature_ports():
    return sorted([
        port
        for f in feature_classes
        for port in f.ports
    ])
