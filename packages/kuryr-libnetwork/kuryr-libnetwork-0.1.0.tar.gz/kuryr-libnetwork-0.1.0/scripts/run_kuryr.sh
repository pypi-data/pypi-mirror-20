#!/usr/bin/env bash
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

KURYR_HOME=${KURYR_HOME:-.}
KURYR_JSON_FILENAME=kuryr.json
KURYR_DEFAULT_JSON=${KURYR_HOME}/etc/${KURYR_JSON_FILENAME}
# See libnetwork's plugin discovery mechanism:
# https://github.com/docker/docker/blob/c4d45b6a29a91f2fb5d7a51ac36572f2a9b295c6/docs/extend/plugin_api.md#plugin-discovery
KURYR_JSON_DIR=${KURYR_JSON_DIR:-/usr/lib/docker/plugins/kuryr}
KURYR_JSON=${KURYR_JSON_DIR}/${KURYR_JSON_FILENAME}

KURYR_CONFIG_FILENAME=kuryr.conf
KURYR_DEFAULT_CONFIG=${KURYR_HOME}/etc/${KURYR_CONFIG_FILENAME}
KURYR_CONFIG_DIR=${KURYR_CONFIG_DIR:-/etc/kuryr}
KURYR_CONFIG=${KURYR_CONFIG_DIR}/${KURYR_CONFIG_FILENAME}

SSL_ENABLED=${SSL_ENABLED:-False}
KURYR_SSL_ENABLED_JSON=${KURYR_HOME}/contrib/tls/${KURYR_JSON_FILENAME}


if [[ ! -d "${KURYR_JSON_DIR}" ]]; then
    echo -n "${KURYR_JSON_DIR} directory is missing. Creating it... "
    sudo mkdir -p ${KURYR_JSON_DIR}
    echo "Done"
fi


if [ "$SSL_ENABLED" == "True" ]; then
    echo -n "Copying ${KURYR_SSL_ENABLED_JSON} one... "
    sudo cp ${KURYR_SSL_ENABLED_JSON} ${KURYR_JSON}
fi


if [[ ! -f "${KURYR_JSON}" ]]; then
    echo -n "${KURYR_JSON} is missing. Copying the ssl enabled one... "
    sudo cp ${KURYR_DEFAULT_JSON} ${KURYR_JSON}
    echo "Done"
fi

if [[ ! -d "${KURYR_CONFIG_DIR}" ]]; then
    echo -n "${KURYR_CONFIG_DIR} directory is missing. Creating it... "
    sudo mkdir -p ${KURYR_CONFIG_DIR}
    echo "Done"
fi

if [[ ! -f "${KURYR_CONFIG}" ]]; then
    if [[ -f "${KURYR_DEFAULT_CONFIG}" ]]; then
        echo -n "${KURYR_CONFIG} is missing. Copying the default one... "
        sudo cp ${KURYR_DEFAULT_CONFIG} ${KURYR_CONFIG}
    else
        if [ "$SSL_ENABLED" == "True" ];then
            # To Avoid tls compatible Config file and json file mismatch it would be
            # better to raise an error than to continue with corrupt env.
            echo "Please check configuration for Tls.."
            echo "Aborting"
            exit 1
        else
            echo -n "${KURYR_CONFIG} and the default config missing. Auto generating and copying one... "
            cd ${KURYR_HOME}
            tox -egenconfig
            sudo cp ${KURYR_DEFAULT_CONFIG}.sample ${KURYR_DEFAULT_CONFIG}
            sudo cp ${KURYR_DEFAULT_CONFIG} ${KURYR_CONFIG}
        fi
    fi
    echo "Done"
fi

PYTHONPATH=${KURYR_HOME} python ${KURYR_HOME}/scripts/run_server.py  --config-file /etc/kuryr/kuryr.conf $@
