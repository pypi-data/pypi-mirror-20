# -*- coding: utf-8 -*-

# Copyright 2016 Yowza Ltd. All rights reserved
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# pylint: disable=invalid-name, unused-argument

"""
yabt Docker Builder
~~~~~~~~~~~~~~~~~~~

:author: Itamar Ostricher
"""


from ..extend import (
    PropType as PT, register_build_func, register_builder_sig,
    register_manipulate_target_hook)
from ..logging import make_logger
from ..docker import build_docker_image, get_image_name
from ..utils import yprint


logger = make_logger(__name__)


# `deps` on ExtDockerImage is a way to tell YABT that this external image
# comes preinstalled with a bunch of deps, so when using a specific external
# image as a base image for a new Docker image target that has common deps
# with those of the extenral image, there's no need to re-add those deps
# during the build of the new image.
# Beyond that, it doesn't mean anything to have "deps" on an external image.
register_builder_sig(
    'ExtDockerImage',
    [('image', PT.str),
     ('tag', PT.str, None),
     ('distro', PT.dict, None),
     ])


@register_build_func('ExtDockerImage')
def ext_docker_image_builder(build_context, target):
    yprint(build_context.conf,
           'Fetch and cache Docker image from registry', target)


register_builder_sig(
    'DockerImage',
    [('start_from', PT.Target),
     ('docker_entrypoint', PT.StrList, None),
     ('docker_cmd', PT.StrList, None),
     ('full_path_cmd', PT.bool, False),
     ('image_name', PT.str, None),
     ('image_tag', PT.str, 'latest'),
     ('work_dir', PT.str, '/usr/src/app'),
     ('env', PT.dict, None),
     ('distro', PT.dict, None),
     ('image_caching_behavior', PT.dict, None),
     ('truncate_common_parent', PT.str, None),
     ('ybt_bin_path', PT.str, None),
     ('build_user', PT.str, None),
     ('run_user', PT.str, None),
     ])


@register_manipulate_target_hook('DockerImage')
def docker_image_manipulate_target(build_context, target):
    logger.debug('Injecting "{}" to deps of {}',
                 target.props.start_from, target)
    target.deps.append(target.props.start_from)


@register_build_func('DockerImage')
def docker_image_builder(build_context, target):
    metadata = build_docker_image(
        build_context,
        name=get_image_name(target),
        tag=target.props.image_tag,
        base_image=build_context.targets[target.props.start_from],
        deps=build_context.walk_target_deps_topological_order(target),
        env=target.props.env,
        work_dir=target.props.work_dir,
        truncate_common_parent=target.props.truncate_common_parent,
        entrypoint=target.props.docker_entrypoint,
        cmd=target.props.docker_cmd,
        full_path_cmd=target.props.full_path_cmd,
        distro=target.props.distro,
        image_caching_behavior=target.props.image_caching_behavior,
        runtime_params=target.props.runtime_params,
        ybt_bin_path=target.props.ybt_bin_path,
        build_user=target.props.build_user,
        run_user=target.props.run_user)
    build_context.register_target_artifact_metadata(target, metadata)
