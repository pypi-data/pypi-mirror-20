#!/usr/bin/env python
# -*- coding: utf-8 -*-

# This file is part of OTC Tool released under MIT license.
# Copyright (C) 2016 T-systems Kurt Garloff, Zsolt Nagy


from otcclient.core.OtcConfig import OtcConfig 
from otcclient.utils import utils_http

from otcclient.core.otcpluginbase import otcpluginbase
from otcclient.core.pluginmanager import getplugin

import json
from otcclient.plugins.ecs import ecs

    
class mrs(otcpluginbase):
    ar = {}    
    
    @staticmethod
    def otcOutputHandler(): 
        return getplugin(OtcConfig.OUTPUT_FORMAT)
 
    def otctype(self):
        return "func" 


    @staticmethod
    def describe_clusters():

        url = "https://" + OtcConfig.DEFAULT_HOST + "/bigdata/api/v1/clusters?pageSize=10&currentPage=1&clusterState=existing"
        
        if OtcConfig.CLUSTER_ID is None: 
            ret = utils_http.get(url)
            print (url)
            print (ret)        
            ecs.otcOutputHandler().print_output(ret, mainkey = "clusters", listkey={"id", "name"})
        else:            
            ret = utils_http.get(url + '/' + OtcConfig.INSTANCE_ID )        
            maindata = json.loads(ret)
            if "itemNotFound" in  maindata:
                raise RuntimeError("Not found!")                      
            ecs.otcOutputHandler().print_output(ret,mainkey="server") 
        return ret


