JSEPackage("ViaMichelin.Api.MMap.Module.Itinerary.MarkerFollower"),JSEImportApi("ViaMichelin.Api.MMap.Core.Geometry.LineUtil"),JSEImportApi("ViaMichelin.Api.MMap.Core.Layer.Marker"),JSEImportApi("ViaMichelin.Api.MMap.Core.Layer.Marker.DivIcon"),JSEImportApi("ViaMichelin.Api.Util.Dom"),ViaMichelin.Api.MMap.Module.Itinerary.MarkerFollower=function(e,i){var t,o,s;if(this.polyline=e,this.map=e._map,!this.map)throw"'polyline' must be attached to the map before using MarkerFollower";this._overMarker=!1,i&&(i.gap&&(this._gap=i.gap),i.icon&&(o=i.icon)),t=new ViaMichelin.Api.MMap.Core.Layer.Marker.DivIcon(this._initializeIcon(o)),s={icon:t,interactive:!1},this.marker=new ViaMichelin.Api.MMap.Core.Layer.Marker({},s),this._plug()},ViaMichelin.Api.MMap.Module.Itinerary.MarkerFollower.prototype={_gap:6,_overMarker:!1,_initializeIcon:function(e){var i,t=12,o="box-shadow: 1px 1px 5px 1px #333;border:2px solid #fff;background-color:#1095f9;border-radius:5px;width:"+t+"px;height:"+t+"px;cursor:pointer",s={iconAnchor:[t/2,t/2],iconSize:[t,t],className:"mmap-div-icon mmap-marker-follower no-background no-events-listener",html:"<div id='idMarkerOver' style='"+o+"'></div>"};return e?(i=e,e.iconSize||(i.iconSize=s.iconSize),e.iconAnchor||(i.iconAnchor=s.iconAnchor),i.className=e.className?i.className+" no-background no-events-listener":s.className,e.html||(i.html=s.html)):i=s,i},_deleteMarkerOver:function(){var e=this;setTimeout(function(){e._overMarker||e.marker.removeFrom(e.map)},100)},_bestPointOnRouteProcess:function(e,i,t){var o,s,r,a,n;r=t;for(var l=0;l<e.length;l++)for(var h=e[l],p=1;p<h.length;p++)o=h[p-1],s=h[p],a=ViaMichelin.Api.MMap.Core.Geometry.LineUtil.pointToSegmentDistance(i,o,s),t>=a&&r>a&&(r=a,n=ViaMichelin.Api.MMap.Core.Geometry.LineUtil.closestPointOnSegment(i,o,s));return n?n:null},_processItiFollower:function(e){var i,t;return i=this.polyline._parts,t=this._bestPointOnRouteProcess(i,e.layerPoint,this._gap),t?this.map.layerPointToLatLon(t):null},_plug:function(){this.map.plugWire("mouseover",this._mouseOver,this),this.map.plugWire("mousemove",this._mouseMove,this),this.map.plugWire("mouseout",this._mouseOut,this),this.map.plugWire("click",this._mouseClick,this),this.plugWire("mouseover",this._polylineOver,this),this.plugWire("mousemove",this._polylineMove,this),this.plugWire("mouseout",this._polylineOut,this)},_unplug:function(){this.map&&(this.map.unplugWire("mouseover",this._mouseOver,this),this.map.unplugWire("mousemove",this._mouseMove,this),this.map.unplugWire("mouseout",this._mouseOut,this),this.map.unplugWire("click",this._mouseClick,this)),this.unplugWire("polylineOver",this._polylineOver,this),this.unplugWire("polylineMove",this._polylineMove,this),this.unplugWire("polylineOut",this._polylineOut,this)},_mouseClick:function(e){var i=this._processItiFollower(e);i&&this.stimulate("click",i)},_mouseOver:function(e){var i=this._processItiFollower(e);this._stateMouse(i)},_mouseMove:function(e){var i=this._processItiFollower(e);this._stateMouse(i)},_mouseOut:function(e){var i=this._processItiFollower(e);this._stateMouse(i)},_deleteSavedState:function(){var e=this;e._savedState=!1,e.stimulate("mouseout")},_savedState:!1,_stateMouse:function(e){!this._savedState&&e?(this._savedState=!0,ViaMichelin.Api.Util.Dom.addClass(document.body,"mmap-interactive"),this.stimulate("mouseover",e)):this._savedState&&e?(this._savedState=!0,ViaMichelin.Api.Util.Dom.addClass(document.body,"mmap-interactive"),this.stimulate("mousemove",e)):this._savedState&&!e&&(this._savedState=!1,ViaMichelin.Api.Util.Dom.removeClass(document.body,"mmap-interactive"),this._deleteSavedState())},_polylineOver:function(e){e&&!this.map.hasLayer(this.marker)&&(this.marker.setLatLon([e.lat,e.lon]),this.marker.addTo(this.map)),this._overMarker=!0},_polylineMove:function(e){e&&this.map.hasLayer(this.marker)&&this.marker.setLatLon([e.lat,e.lon])},_polylineOut:function(){this.map.hasLayer(this.marker)&&this._deleteMarkerOver(),this._overMarker=!1},release:function(){this._unplug(),this.marker.remove(),this.marker.removeEventListeners(),this.marker=null,this.polyline=null}};