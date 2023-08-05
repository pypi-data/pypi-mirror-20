from Variable import Variable
from netCDF4 import Dataset
import ilamblib as il
import numpy as np
import glob,os

class ModelResult():
    """A class for exploring model results.

    This class provides a simplified way of accessing model
    results. It is essentially a pointer to a top level directory and
    defines the model as all netCDF4 files found in its
    subdirectories. If this directory contains model output from
    several runs or experiments, you may wish to specify a string (the
    *filter* argument) which we will require to be in the filename for
    it to be considered part of the model.

    Parameters
    ----------
    path : str
        the full path to the directory which contains the model result
        files
    modelname : str, optional
        a string representing the name of the model, will be used as a
        label in plot legends
    color : 3-tuple, optional
        a normalized tuple representing a color in RGB color space,
        will be used to color line plots
    filter : str, optional
        this string must be in file's name for it to be considered as
        part of the model results

    """
    def __init__(self,path,modelname="unamed",color=(0,0,0),filter=""):
        self.path           = path
        self.color          = color
        self.filter         = filter
        self.name           = modelname
        self.confrontations = {}
        self.cell_areas     = None
        self.land_fraction  = None
        self.land_areas     = None
        self.land_area      = None
        self.lat            = None
        self.lon            = None        
        self.lat_bnds       = None
        self.lon_bnds       = None
        self.variables      = None
        self._getGridInformation()
        self._findVariables()
        
    def _findVariables(self):
        """Loops through the netCDF4 files in a model's path and builds a dictionary of which variables are in which files.
        """
        variables = {}
        for subdir, dirs, files in os.walk(self.path):
            for fileName in files:
                if ".nc"       not in fileName: continue
                if self.filter not in fileName: continue
                pathName  = "%s/%s" % (subdir,fileName)
                dataset   = Dataset(pathName)
                for key in dataset.variables.keys():
                    if not variables.has_key(key):
                        variables[key] = []
                    variables[key].append(pathName)
        self.variables = variables
    
    def _fileExists(self,contains):
        """Looks through the model result path for a file that contains the text specified in "constains". Returns "" if not found.
        """
        fname = ""
        for subdir, dirs, files in os.walk(self.path):
            for f in files:
                if contains not in f: continue
                if ".nc" not in f: continue
                fname = "%s/%s" % (subdir,f)
                return fname
        return fname

    def _getGridInformation(self):
        """Looks in the model output for cell areas as well as land fractions. 
        """
        fname = self._fileExists("areacella")
        if fname == "": return # there are no areas associated with this model result

        # Now grab area information for this model
        f = Dataset(fname)
        self.cell_areas    = f.variables["areacella"][...]
        self.lat           = f.variables["lat"][...]
        self.lon           = f.variables["lon"][...]
        self.lat_bnds      = np.zeros(self.lat.size+1)
        self.lat_bnds[:-1] = f.variables["lat_bnds"][:,0]
        self.lat_bnds[-1]  = f.variables["lat_bnds"][-1,1]
        self.lon_bnds      = np.zeros(self.lon.size+1)
        self.lon_bnds[:-1] = f.variables["lon_bnds"][:,0]
        self.lon_bnds[-1]  = f.variables["lon_bnds"][-1,1]

        # Now we do the same for land fractions
        fname = self._fileExists("sftlf")
        if fname == "": 
            self.land_areas = self.cell_areas 
        else:
            self.land_fraction = (Dataset(fname).variables["sftlf"])[...]
            # some models represent the fraction as a percent 
            if np.ma.max(self.land_fraction) > 1: self.land_fraction *= 0.01 
            self.land_areas = self.cell_areas*self.land_fraction
        self.land_area = np.ma.sum(self.land_areas)
        return
                
    def extractTimeSeries(self,variable,lats=None,lons=None,alt_vars=[],initial_time=-1e20,final_time=1e20,output_unit="",expression=None):
        """Extracts a time series of the given variable from the model.

        Parameters
        ----------
        variable : str
            name of the variable to extract
        alt_vars : list of str, optional
            alternate variables to search for if *variable* is not found
        initial_time : float, optional
            include model results occurring after this time
        final_time : float, optional
            include model results occurring before this time
        output_unit : str, optional
            if specified, will try to convert the units of the variable 
            extract to these units given. 
        lats : numpy.ndarray, optional
            a 1D array of latitude locations at which to extract information
        lons : numpy.ndarray, optional
            a 1D array of longitude locations at which to extract information
        expression : str, optional
            an algebraic expression describing how to combine model outputs

        Returns
        -------
        var : ILAMB.Variable.Variable
            the extracted variable

        """
        # prepend the target variable to the list of possible variables
        altvars = list(alt_vars)
        altvars.insert(0,variable)

        # create a list of datafiles which have a non-null intersection
        # over the desired time range
        V = []
        for v in altvars:
            if not self.variables.has_key(v): continue
            for pathName in self.variables[v]:
                var = Variable(filename       = pathName,
                               variable_name  = variable,
                               alternate_vars = altvars[1:],
                               area           = self.land_areas,
                               t0             = initial_time,
                               tf             = final_time)
                if lats is not None: var = var.extractDatasites(lats,lons)
                V.append(var)
            if len(V) > 0: break

        # If we didn't find any files, try to put together the
        # variable from a given expression
        if len(V) == 0:
            if expression is not None:
                v = self.derivedVariable(variable,
                                         expression,
                                         lats         = lats,
                                         lons         = lons,
                                         initial_time = initial_time,
                                         final_time   = final_time)
            else:
                raise il.VarNotInModel()
        else:
            v = il.CombineVariables(V)
        return v

    def derivedVariable(self,variable_name,expression,lats=None,lons=None,initial_time=-1e20,final_time=1e20):
        """Creates a variable from an algebraic expression of variables in the model results.

        Parameters
        ----------
        variable_name : str
            name of the variable to create
        expression : str
            an algebraic expression describing how to combine model outputs
        initial_time : float, optional
            include model results occurring after this time
        final_time : float, optional
            include model results occurring before this time
        lats : numpy.ndarray, optional
            a 1D array of latitude locations at which to extract information
        lons : numpy.ndarray, optional
            a 1D array of longitude locations at which to extract information
        
        Returns
        -------
        var : ILAMB.Variable.Variable
            the new variable

        """      
        from sympy import sympify
        from cfunits import Units
        if expression is None: raise il.VarNotInModel()
        args  = {}
        units = {}
        unit  = expression
        mask  = None
        time  = None
        tbnd  = None
        lat   = None
        lon   = None
        ndata = None
        area  = None

        for arg in sympify(expression).free_symbols:
            try:
                var  = self.extractTimeSeries(arg.name,
                                              lats = lats,
                                              lons = lons,
                                              initial_time = initial_time,
                                              final_time   = final_time)
            except:
                raise il.VarNotInModel()
            
            units[arg.name] = var.unit
            args [arg.name] = var.data.data

            if mask is None:
                mask  = var.data.mask
            else:
                mask += var.data.mask
            if time is None:
                time  = var.time
            else:
                assert(np.allclose(time,var.time))
            if tbnd is None:
                tbnd  = var.time_bnds
            else:
                assert(np.allclose(tbnd,var.time_bnds))
            if lat is None:
                lat  = var.lat
            else:
                assert(np.allclose(lat,var.lat))
            if lon is None:
                lon  = var.lon
            else:
                assert(np.allclose(lon,var.lon))
            if area is None:
                area  = var.area
            else:
                assert(np.allclose(area,var.area))
            if ndata is None:
                ndata  = var.ndata
            else:
                assert(np.allclose(ndata,var.ndata))
            
        np.seterr(divide='ignore',invalid='ignore')
        result,unit = il.SympifyWithArgsUnits(expression,args,units)
        np.seterr(divide='raise',invalid='raise')
        mask  += np.isnan(result)
        result = np.ma.masked_array(np.nan_to_num(result),mask=mask)
        
        return Variable(data      = np.ma.masked_array(result,mask=mask),
                        unit      = unit,
                        name      = variable_name,
                        time      = time,
                        time_bnds = tbnd,
                        lat       = lat,
                        lon       = lon,
                        area      = area,
                        ndata     = ndata)
