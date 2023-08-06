
This is a plugin for the Spyder IDE that integrates the Python line profiler.
It allows you to see the time spent in every line.

Usage
-----

Add a ``@profile`` decorator to the functions that you wish to profile
then press Shift+F10 (line profiler default) to run the profiler on
the current script, or go to ``Run > Profile line by line``.

The results will be shown in a dockwidget, grouped by function. Lines
with a stronger color take more time to run.

.. image: https://raw.githubusercontent.com/spyder-ide/spyder-line-profiler/master/img_src/screenshot_profler.png


