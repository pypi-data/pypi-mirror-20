
import ttk
import tkMessageBox
from Tkconstants import NSEW, EW, NORMAL, TOP, BOTH, YES

from ..window.root import RootWindow
from ..frame.frame import BaseFrame
from ..frame.scroll import BaseScrollFrame
from ..frame.label import BaseLabelFrame
from ..helper.layout import nice_grid


class ExampleWindow(RootWindow):

    def __init__(self, *args, **kwargs):
        super(ExampleWindow, self).__init__(*args, **kwargs)

    def _setup(self):

        self.base = BaseFrame(self._main_frame,
                              grid_column=0,
                              grid_row=0)
        self.base.grid(sticky=EW)

        tkMessageBox.showinfo(u"Test",
                              u"Some information...",
                              icon=u'warning',
                              parent=self.base)

        self.button = ttk.Button(self.base,
                                 state=NORMAL,
                                 text=u'Button 1',
                                 width=15, )
        self.button.grid(row=self.base.row.start(),
                         column=self.base.column.start())

        self.button2 = ttk.Button(self.base,
                                  state=NORMAL,
                                  text=u'Button 2',
                                  width=15)
        self.button2.grid(row=self.base.row.current,
                          column=self.base.column.next())

        nice_grid(self.base)

        self.base1 = BaseLabelFrame(self._main_frame,
                                    grid_column=0,
                                    grid_row=1)
        self.base1.grid(sticky=EW)

        self.button = ttk.Button(self.base1,
                                 state=NORMAL,
                                 text=u'Button 3',
                                 width=15)

        self.button.grid(row=self.base1.row.start(),
                         column=self.base1.column.start())

        self.button2 = ttk.Button(self.base1,
                                  state=NORMAL,
                                  text=u'Button 4',
                                  width=15)

        self.button2.grid(row=self.base1.row.current,
                          column=self.base1.column.next())

        nice_grid(self.base1)

        self.base2 = BaseFrame(self._main_frame,
                               grid_column=0,
                               grid_row=2)

        self.base2.grid(sticky=NSEW)

        self.base2canvas = BaseScrollFrame(self.base2)
        self.base2canvas.pack(side=TOP,
                              fill=BOTH,
                              expand=YES)

        for row in range(100):
            ttk.Label(self.base2canvas.canvas_frame,
                      text=u"%s" % row,
                      width=3,
                      borderwidth=u"1",
                      relief=u"solid",
                      style = u"Blue.TLabel").grid(row=row, column=0)
            t = u"this is the second column for row %s... Text, " \
                u"More text and even more text!" % row
            ttk.Label(self.base2canvas.canvas_frame,
                      text=t,
                      style = u"Blue.TLabel").grid(row=row, column=1)

        nice_grid(self._main_frame)
