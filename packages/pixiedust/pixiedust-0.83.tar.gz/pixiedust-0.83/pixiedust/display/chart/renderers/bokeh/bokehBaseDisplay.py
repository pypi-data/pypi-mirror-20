# -------------------------------------------------------------------------------
# Copyright IBM Corp. 2016
# 
# Licensed under the Apache License, Version 2.0 (the 'License');
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
# http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an 'AS IS' BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# -------------------------------------------------------------------------------

from pixiedust.display.display import CellHandshake
from pixiedust.display.chart.renderers import PixiedustRenderer
from pixiedust.utils import Logger
from ..baseChartDisplay import BaseChartDisplay
from six import with_metaclass
from abc import abstractmethod, ABCMeta
from bokeh.plotting import figure, output_notebook
from bokeh.models.tools import *
from bokeh.io import notebook_div
import pkg_resources

@PixiedustRenderer(rendererId="bokeh")
@Logger()
class BokehBaseDisplay(with_metaclass(ABCMeta, BaseChartDisplay)):
    CellHandshake.addCallbackSniffer( lambda: "{'nostore_bokeh':!!window.Bokeh}")

    #get the bokeh version
    try:
        bokeh_version = pkg_resources.get_distribution("bokeh").parsed_version._version.release
    except:
        bokeh_version = None
        self.exception("Unable to get bokeh version")

    """
    Default implementation for creating a chart object.
    """
    def createBokehChart(self):
        return figure()

    def getPreferredOutputWidth(self):
        return super(BokehBaseDisplay,self).getPreferredOutputWidth() * 0.92

    def doRenderChart(self):
        if BokehBaseDisplay.bokeh_version < (0,12):
            raise Exception("""
                <div>Incorrect version of Bokeh detected. Expected {0}, got {1}</div>
                <div>Please upgrade by using the following command: <b>!pip install --user --upgrade bokeh</b></div>
            """.format((0,12), BokehBaseDisplay.bokeh_version))
        clientHasBokeh = self.options.get("nostore_bokeh", "false") == "true"
        if not clientHasBokeh:          
            output_notebook(hide_banner=True)
        charts = self.createBokehChart()

        if not isinstance(charts, list):
            charts.add_tools(ResizeTool())
            charts.title = self.options.get("title", "")
            charts.plot_width = int(self.getPreferredOutputWidth() - 10 )
            charts.plot_height = int(self.getPreferredOutputHeight() - 10  )
            charts.grid.grid_line_alpha=0.3
            return notebook_div(charts)
        else:
            from bokeh.layouts import gridplot
            ncols = 2
            nrows = 1
            if(len(charts) > ncols):
                nrows = len(charts) / ncols
                if(len(charts) % ncols != 0):
                    nrows = nrows + 1
      
            return notebook_div(gridplot(charts, ncols=ncols, nrows=nrows))