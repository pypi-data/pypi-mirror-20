
=============
lektor-minify
=============

This plugin allows you to minify the build artifacts of your `Lektor`_ project
during the build process, without any additional tool. It currently supports
minifying HTML, CSS and JS files.

The plugin only minifies the files changed during the last build, avoiding
slowing down the build if your project consists of a lot of files. Internally
it uses the rcssmin and rjsmin libraries, and it's released under the MIT
license.

`Learn more about the plugin`_

.. _Lektor: https://www.getlektor.com
.. _Learn more about the plugin: https://github.com/pietroalbini/lektor-minify


