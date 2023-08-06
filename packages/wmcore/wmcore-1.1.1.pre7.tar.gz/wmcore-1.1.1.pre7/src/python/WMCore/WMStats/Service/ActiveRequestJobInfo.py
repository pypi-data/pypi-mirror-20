"""
Gets the cache data from server cache. This shouldn't update the server cache.
Just wait for the server cache to be updated
"""
from __future__ import (division, print_function)
from WMCore.REST.Server import RESTEntity, restcall, rows
from WMCore.REST.Tools import tools
from WMCore.WMStats.DataStructs.DataCache import DataCache
from WMCore.REST.Format import JSONFormat, PrettyJSONFormat
from WMCore.ReqMgr.DataStructs.RequestStatus import ACTIVE_NO_CLOSEOUT_FILTER

class ActiveRequestJobInfo(RESTEntity):
    """
    get all the active requests with job information attatched
    """
    def __init__(self, app, api, config, mount):
        # main CouchDB database where requests/workloads are stored
        RESTEntity.__init__(self, app, api, config, mount)  
        
    def validate(self, apiobj, method, api, param, safe):
        return            

    
    @restcall(formats = [('text/plain', PrettyJSONFormat()), ('application/json', JSONFormat())])
    @tools.expires(secs=-1)
    def get(self):
        # This assumes DataCahe is periodically updated. 
        # If data is not updated, need to check, dataCacheUpdate log
        return rows([DataCache.getlatestJobData()])
    
class ProtectedLFNList(RESTEntity):
    
    def __init__(self, app, api, config, mount):
        # main CouchDB database where requests/workloads are stored
        RESTEntity.__init__(self, app, api, config, mount)  
        
    def validate(self, apiobj, method, api, param, safe):
        return            

    
    @restcall(formats = [('text/plain', PrettyJSONFormat()), ('application/json', JSONFormat())])
    @tools.expires(secs=-1)
    def get(self):
        # This assumes DataCahe is periodically updated. 
        # If data is not updated, need to check, dataCacheUpdate log
        return rows(DataCache.getProtectedLFNs())
    
class GlobalLockList(RESTEntity):
    
    def __init__(self, app, api, config, mount):
        # main CouchDB database where requests/workloads are stored
        RESTEntity.__init__(self, app, api, config, mount)  
        
    def validate(self, apiobj, method, api, param, safe):
        return            

    
    @restcall(formats = [('text/plain', PrettyJSONFormat()), ('application/json', JSONFormat())])
    @tools.expires(secs=-1)
    def get(self):
        # This assumes DataCahe is periodically updated. 
        # If data is not updated, need to check, dataCacheUpdate log
        return rows(DataCache.filterData(ACTIVE_NO_CLOSEOUT_FILTER, 
                        ["InputDatasets", "OutputDatasets", "MCPileup", "DataPileup"]))