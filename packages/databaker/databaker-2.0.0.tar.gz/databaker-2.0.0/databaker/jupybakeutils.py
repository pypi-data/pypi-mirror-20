# encoding: utf-8
# HTML preview of the dimensions and table (will be moved to a function in databakersolo)

import io, os, collections, re, warnings, csv, datetime
import databaker.constants
import xypath
from databaker import richxlrd
import pandas
template = databaker.constants.template


def svalue(cell):
    if not isinstance(cell.value, datetime.datetime):
        return str(cell.value)
    # the fmt string is some excel generated garbage format, like: '[$-809]dd\\ mmmm\\ yyyy;@'
    # the xlrd module does its best and creates a date tuple, which messytables constructs into a datetime using xldate_as_tuple()
    xls_format = cell.properties['formatting_string'].upper()
    quarter = int((cell.value.month -1 ) // 3) + 1
    if   'Q' in xls_format:   py_format = "%Y Q{quarter}"   # may be very rare
    elif 'D' in xls_format:   py_format = "%Y-%m-%d"
    elif 'M' in xls_format:   py_format = "%b %Y"
    elif 'Y' in xls_format:   py_format = "%Y"
    else:                     py_format = "%Y-%m-%d"
    return cell.value.strftime(py_format).format(quarter=quarter)


class HDim:
    "Dimension object which defines the lookup between an observation cell and a bag of header cells"
    def __init__(self, hbagset, label, strict=None, direction=None, cellvalueoverride=None):
        self.label = label
        self.name = label
            
        self.cellvalueoverride = cellvalueoverride or {} # do not put {} into default value otherwise there is only one static one for everything
        assert not isinstance(hbagset, str), "Use empty set and default value for single value dimension"
        self.hbagset = hbagset
        self.bhbagsetCopied = False
        
        if self.hbagset is None:   # single value type
            assert direction is None and strict is None
            assert len(cellvalueoverride) == 1 and None in cellvalueoverride, "single value type should have cellvalueoverride={None:defaultvalue}"
            return
        
        assert isinstance(self.hbagset, xypath.xypath.Bag), "dimension should be made from xypath.Bag type, not %s" % type(self.hbagset)
        self.strict = strict
        self.direction = direction
        assert direction is not None and strict is not None

        self.bxtype = (self.direction[1] == 0)
        self.samerowlookup = None
    
            
    def celllookup(self, scell):
        "Lookup function from a given cell to the matching header cell"
        
        # caching that can be removed in AddCellValueOverride
        if self.strict and self.samerowlookup is None:
            self.samerowlookup = {}
            for hcell in self.hbagset.unordered_cells:
                k = hcell.y if self.bxtype else hcell.x
                if k not in self.samerowlookup:
                    self.samerowlookup[k] = []
                self.samerowlookup[k].append(hcell)
        
        def mult(cell):
            return cell.x * self.direction[0] + cell.y * self.direction[1]
        def dgap(cell, target_cell):
            if direction[1] == 0:
                return abs(cell.x - target_cell.x)
            return abs(cell.y - target_cell.y)
        
        def betweencells(scell, target_cell, best_cell):
            if mult(scell) <= mult(target_cell):
                if not best_cell or mult(target_cell) <= mult(best_cell):
                    return True
            return False
        
        def same_row_col(a, b):
            return  (a.x - b.x  == 0 and self.direction[0] == 0) or (a.y - b.y  == 0 and self.direction[1] == 0)
    
        if self.strict:
            hcells = self.samerowlookup.get(scell.y if self.bxtype else scell.x, [])
        else:
            hcells = self.hbagset.unordered_cells
        hcells = self.hbagset.unordered_cells
        
        best_cell = None
        second_best_cell = None

        #if strict:  print(len(list(hcells)), len(list(hbagset.unordered_cells)))
        for target_cell in hcells:
            if betweencells(scell, target_cell, best_cell):
                if not self.strict or same_row_col(scell, target_cell):
                    second_best_cell = best_cell
                    best_cell = target_cell
        if second_best_cell and mult(best_cell) == mult(second_best_cell):
            raise xypath.LookupConfusionError("{!r} is as good as {!r} for {!r}".format(best_cell, second_best_cell, scell))
        if best_cell is None:
            return None
        return best_cell

    def headcellval(self, hcell):
        "Extract the string value of a member header cell (including any value overrides)"
        if hcell is not None:
            assert isinstance(hcell, xypath.xypath._XYCell), "celllookups should only go to an _XYCell"
            if hcell in self.cellvalueoverride:
                val = self.cellvalueoverride[hcell]
                assert isinstance(val, (str, float, int)), "Override from hcell value should go directly to a str,float,int,None-value (%s)" % type(val)
                return val
            val = svalue(hcell)
            #assert val is None or isinstance(val, (str, float, int)), "cell value should only be str,float,int,None (%s)" % type(val)
        else:
            val = None
         
        # It's allowed to have {None:defaultvalue} to set the NoLookupValue
        if val in self.cellvalueoverride:
            val = self.cellvalueoverride[val]
            assert val is None or isinstance(val, (str, float, int)), "Override from value should only be str,float,int,None (%s)" % type(val)

        # type call if no other things match
        elif type(val) in self.cellvalueoverride:
             val = self.cellvalueoverride[type(val)](val)
            
        return val


    def cellvalobs(self, ob):
        "Full lookup from a observation cell to its dimensional value (which can apply before lookup)"
        if isinstance(ob, xypath.xypath.Bag):
            assert len(ob) == 1, "Can only lookupobs a single cell"
            ob = ob._cell
        assert isinstance(ob, xypath.xypath._XYCell), "Lookups only allowed on an obs cell"
        
        # we do two steps through cellvalueoverride in three places on mutually distinct sets (obs, heading, strings)
        # and not recursively as these are wholly different applications.  the celllookup is itself like a cellvalueoverride
        if ob in self.cellvalueoverride:
            val = self.cellvalueoverride[ob]  # knock out an individual obs for this cell
            assert isinstance(val, str), "Override from obs should go directly to a string-value"
            return None, val
            
        if self.hbagset is not None:
            hcell = self.celllookup(ob)
        else:
            hcell = None
            
        return hcell, self.headcellval(hcell)
        
    def AddCellValueOverride(self, overridecell, overridevalue):
        "Override the value of a header cell (and insert it if not present in the bag)" 
        if isinstance(overridecell, str):
            self.cellvalueoverride[overridecell] = overridevalue
            return
        if overridecell is None:
            self.cellvalueoverride[overridecell] = overridevalue
            return
        if isinstance(overridecell, xypath.xypath.Bag):
            assert len(overridecell) == 1, "Can only lookupobs a single cell"
            overridecell = overridecell._cell
        assert isinstance(overridecell, xypath.xypath._XYCell), "Lookups only allowed on an obs cell"
        
        # add the cell into the base set of cells if it's new 
        if overridecell not in self.hbagset.unordered_cells:
            if not self.bhbagsetCopied:
                self.hbagset = self.hbagset | (self.hbagset.by_index(1) if len(self.hbagset) else self.hbagset)  # force copy by adding element from itself
                self.bhbagsetCopied = True  # avoid inefficient copying every single time
            self.hbagset.add(overridecell)
            self.samerowlookup = None  # abolish any caching
        else:
            if overridecell in self.cellvalueoverride:
                if self.cellvalueoverride[overridecell] != overridevalue:
                    warnings.warn("Cell %s was already overridden by value %s; is this a mistake?" % (overridecell, self.cellvalueoverride[overridecell]))
            
        assert overridevalue is None or isinstance(overridevalue, (str, float, int)), "Override from value should only be str,float,int,None (%s)" % type(overridevalue)
        self.cellvalueoverride[overridecell] = overridevalue

    def discardcellsnotlookedup(self, obs):
        "Remove header cells to which none of the observation cells looks up to"
        hbagsetT = xypath.xypath.Bag(self.hbagset.table)
        for ob in obs.unordered_cells:
            hbagsetT.add(self.celllookup(ob))
        self.hbagset = hbagsetT

    def valueslist(self):
        "List of all the header cell values"
        return [self.headcellval(cell)  for cell in sorted(self.hbagset.unordered_cells, key=lambda cell: (cell.y, cell.x))]

    def checkvalues(self, vlist):
        "Check that the header cell values match"
        scells = sorted(self.hbagset.unordered_cells, key=lambda cell: (cell.y, cell.x))
        if len(scells) != len(vlist):
            warnings.warn("checkvalues list length doesn't match")
            return False
            
        for cell, v in zip(scells, vlist):
            nv = self.headcellval(cell)
            if nv != v:
                warnings.warn("checkvalues mismatch in cell (%d,%d) cell value '%s' doesn't match '%s'" % (cell.x, cell.y, nv, v))
                return False
        return True
        

def HDimConst(name, val):
    "Define a constant value dimension across the whole segment"
    return HDim(None, name, cellvalueoverride={None:val})


def Ldatetimeunitloose(date):
    if not isinstance(date, str):
        if isinstance(date, (float, int)) and 1000<=date<=9999 and int(date)==date:
            return "Year"
        return ''
    d = date.strip()
    if re.match('\d{4}(?:\.0)?$', d):
        return 'Year'
    if re.match('\d{4}(?:\.0)?\s*[Qq]\d$', d):
        return 'Quarter'
    if re.match('[Qq]\d\s*\d{4}(?:\.0)?$', d):
        return 'Quarter'
    if re.match('[A-Za-z]{3}-[A-Za-z]{3}\s*\d{4}(?:\.0)?$', d):
        return 'Quarter'
    if re.match('[A-Za-z]{3}\s*\d{4}(?:\.0)?$', d):
        return 'Month'
    return ''

def Ldatetimeunitforce(st, timeunit):
    st = str(st).strip()
    if timeunit == 'Year':
        mst = re.match("(\d\d\d\d)(?:\.0)?$", st)
        if mst:
            return mst.group(1)
            
    elif timeunit == "Quarter":
        mq1 = re.match('(\d{4})(?:\.0)?\s*[Qq](\d)', st)
        mq2 = re.match('([A-Za-z]{3}-[A-Za-z]{3})\s*(\d{4})', st)
        mq3 = re.match('[Qq](\d)\s*(\d{4})', st)
        if mq1:
            return "%s Q%s" % (mq1.group(1), mq1.group(2))
        if mq2:
            return "%s %s" % (mq2.group(1), mq2.group(2))
        if mq3:
            return "%s Q%s" % (mq3.group(2), mq3.group(1))
            
    elif timeunit == "Month":
        mm1 = re.match('\s*([A-Za-z]{3})\s*(\d{4})', st)
        if mm1:
            return "%s %s" % (mm1.group(1), mm1.group(2))
    elif timeunit == "":
        return st
    else:
        timeunit = "unknown:%s" % timeunit
    warnings.warn("TIME %s disagrees with TIMEUNIT %s" % (st, timeunit))
    return st


def HLDUPgenerate_header_row(numheaderadditionals):
    res = [ (k[0] if isinstance(k, tuple) else k)  for k in template.headermeasurements ]
    for i in range(numheaderadditionals):
        for k in template.headeradditionals:
            if isinstance(k, tuple):
                sk = k[0]
            else:
                sk = k
            res.append("%s_%d" % (sk, i+1))
    return res


class ConversionSegment:
    "Single output table object generated from a bag of observations that look up to a list of dimensions"
    def __init__(self, observations, dimensions, Lobservations=None, processTIMEUNIT=True, includecellxy=False):
        if Lobservations is None:   # new format that drops the unnecessary table element
            tab = observations.table
            Lobservations = observations
        else:
            tab = observations  # old function format
            
        self.tab = tab
        self.dimensions = dimensions
        self.segment = Lobservations   # original name for observations list
        
        self.processtimeunit = processTIMEUNIT
        self.includecellxy = includecellxy

        for dimension in self.dimensions:
            assert isinstance(dimension, HDim), ("Dimensions must have type HDim()")
            assert dimension.hbagset is None or dimension.hbagset.table is tab, "dimension %s from different tab" % dimension.name
            
        self.numheaderadditionals = sum(1  for dimension in self.dimensions  if dimension.label not in template.headermeasurementnamesSet)

        # generate the ordered obslist here (so it is fixed here and can be reordered before processing)
        if isinstance(self.segment, xypath.xypath.Bag):
            assert self.segment.table is tab, "segments from different tab"
            self.obslist = list(self.segment.unordered_cells)  # list(segment) otherwise gives bags of one element
            self.obslist.sort(key=lambda cell: (cell.y, cell.x))
        else:
            assert isinstance(self.segment, (tuple, list)), "segment needs to be a Bag or a list, not a %s" % type(self.segment)
            self.obslist = self.segment
            
        # holding place for output of processing.  
        # technically no reason we shouldn't process at this point either, on this constructor, 
        # but doing it in stages allows for interventions along the way
        self.processedrows = None  
            

    # used in tabletohtml for the subsets, and where we would find the mappings for over-ride values
    def dsubsets(self):
        tsubs = [ ]
        if self.segment:
            tsubs.append((0, "OBS", self.segment))
        for i, dimension in enumerate(self.dimensions):
            if dimension.hbagset is not None:   # filter out TempValue headers
                tsubs.append((i+1, dimension.name, dimension.hbagset))
        return tsubs
        
    # used in tabletohtml for the subsets, and where we would find the mappings for over-ride values
    def consolidatedcellvalueoverride(self):
        res = { }
        for i, dimension in enumerate(self.dimensions):
            if dimension.hbagset is not None:   # filter out TempValue headers
                for hcell in dimension.hbagset.unordered_cells:
                    sval = svalue(hcell)
                    val = hcell.value
                    if hcell in dimension.cellvalueoverride:
                        val = str(dimension.cellvalueoverride[hcell])
                    elif sval in dimension.cellvalueoverride:
                        val = str(dimension.cellvalueoverride[val])
                    elif type(hcell.value) in dimension.cellvalueoverride:
                        val = str(dimension.cellvalueoverride[type(hcell.value)](hcell.value))
                    else:
                        val = sval
                    if val != sval:
                        res[(hcell.x, hcell.y)] = val
        return res

    # individual lookup across the dimensions here
    def lookupobs(self, ob):
        if type(ob) is xypath.xypath.Bag:
            assert len(ob) == 1, "Can only lookupobs on a single cell"
            ob = ob._cell

        # force it to be float and split off anything not float into the datamarker
        if not isinstance(ob.value, float):
            if ob.properties['richtext']:  # should this case be implemented into the svalue() function?
                sval = richxlrd.RichCell(ob.properties.cell.sheet, ob.y, ob.x).fragments.not_script.value
            else:
                sval = svalue(ob)
                
            if template.SH_Split_OBS:
                assert template.SH_Split_OBS == databaker.constants.DATAMARKER, (template.SH_Split_OBS, databaker.constants.DATAMARKER)
                ob_value, dm_value = re.match(r"([-+]?[0-9]+\.?[0-9]*)?(.*)", sval).groups()
                dval = { }
                if dm_value:
                    dval[template.SH_Split_OBS] = dm_value
                if ob_value:
                    dval[databaker.constants.OBS] = float(ob_value)
                else:
                    dval[databaker.constants.OBS] = ""
            else:
                dval = { databaker.constants.OBS:sval }
        else:
            dval = { databaker.constants.OBS:ob.value }
        
        for hdim in self.dimensions:
            hcell, val = hdim.cellvalobs(ob)
            dval[hdim.label] = val
            
        if self.includecellxy:
            dval["__x"] = ob.x
            dval["__y"] = ob.y
            dval["__tablename"] = self.tab.name
        return dval

    def guesstimeunit(self):
        for dval in self.processedrows:
            dval[template.TIMEUNIT] = Ldatetimeunitloose(dval[template.TIME])
        ctu = collections.Counter(dval[template.TIMEUNIT]  for dval in self.processedrows)
        if len(ctu) == 1:
            return "TIMEUNIT='%s'" % list(ctu.keys())[0]
        return "multiple TIMEUNITs: %s" % ", ".join("'%s'(%d)" % (k,v)  for k,v in ctu.items())
        
    def fixtimefromtimeunit(self):  # this works individually and not across the whole segment homogeneously
        for dval in self.processedrows:
            dval[template.TIME] = Ldatetimeunitforce(dval[template.TIME], dval[template.TIMEUNIT])

    def process(self):
        assert self.processedrows is None, "Conversion segment already processed"
        self.processedrows = [ self.lookupobs(ob)  for ob in self.obslist ]
        
        kdim = dict((dimension.label, dimension)  for dimension in self.dimensions)
        timeunitmessage = ""
        if self.processtimeunit:
            if template.SH_Create_ONS_time and ((template.TIMEUNIT not in kdim) and (template.TIME in kdim)):
                timeunitmessage = self.guesstimeunit()
                self.fixtimefromtimeunit()
            elif template.TIME in kdim and template.TIMEUNIT not in kdim:
                self.fixtimefromtimeunit()
        return timeunitmessage
        
        
    def topandas(self):
        timeunitmessage = ""
        if self.processedrows is None: 
            timeunitmessage = self.process()  
        print(timeunitmessage)
        df = pandas.DataFrame.from_dict(self.processedrows)
        
        # sort the columns
        dfcols = list(df.columns)
        newdfcols = [ ]
        for k in template.headermeasurements:
            if isinstance(k, tuple):
                if k[1] in dfcols:
                    newdfcols.append(k[1])
                    dfcols.remove(k[1])
        for dimension in self.dimensions:
            if dimension.label not in template.headermeasurementnamesSet:
                assert dimension.label in dfcols
                newdfcols.append(dimension.label)
                dfcols.remove(dimension.label)
                
        for excol in ["__x", "__y", "__tablename"]:
            if excol in dfcols:
                if self.includecellxy:
                    newdfcols.append(excol)
                dfcols.remove(excol)
        assert not dfcols, ("unexplained extra columns", dfcols)
        
        df = df[newdfcols]   # map the new column list in
        return df

def pdguessforceTIMEUNIT(df):
    df["TIMEUNIT"] = df.apply(lambda row: Ldatetimeunitloose(row.TIME), axis=1)
    df["TIME"] = df.apply(lambda row: Ldatetimeunitforce(row.TIME, row.TIMEUNIT), axis=1)
    

