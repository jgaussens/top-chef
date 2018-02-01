/**
 * @file
 * JavaScript code containing all utility functions for Michelin Map.
 */

Drupal.michelinMapUtility = {};

Drupal.michelinMapUtility.getIcon = function(params) {
  return new ViaMichelin.Api.MMap.Core.Layer.Marker.Icon({
    iconUrl: params.url,
    iconSize: [parseInt(params.x), parseInt(params.y)],
    iconAnchor: [-parseInt(params.x / 2), -parseInt(params.y)]
  });
}

Drupal.michelinMapUtility.getBubble = function(content) {
  var html = document.createElement('div');
  html.innerHTML = content;

  var popup = new ViaMichelin.Api.MMap.Core.Layer.Popup({
    'minWidth': 200,
    'closeButton': false,
    'className': 'michelin-marker-bubble',
    'autoPanPadding': [0, 45],
  });

  popup.setContent(content);

  return popup;
}

Drupal.michelinMapUtility.htmlControl = function (position, wrapper_class, content) {
  ViaMichelin.Api.Util.Object.extend(this, ViaMichelin.Api.MMap.Core.Control);
  this.options.position = position;
  this._wrapper_class = wrapper_class;
  this._content = content;
}

Drupal.michelinMapUtility.htmlControl.prototype = {
  onAdd : function (map) {
    this._map = map;
    this._controls = ViaMichelin.Api.Util.Dom.create('div');
    this._controls.className = 'michelin-maps-control ' + this._wrapper_class;
    this._controls.innerHTML = this._content;
    return this._controls;
  }
};

ToJSEObject(Drupal.michelinMapUtility.htmlControl);

Drupal.michelinMapUtility.zoomControl = function (type) {
  ViaMichelin.Api.Util.Object.extend(this, ViaMichelin.Api.MMap.Core.Control);
  this._type = type;
};

Drupal.michelinMapUtility.zoomControl.prototype = {
  options : {
    position : 'topright'
  },
  onAdd : function (map) {
    var self = this;
    this._map = map;
    this._controls = ViaMichelin.Api.Util.Dom.create('div');
    this._controls.className = 'michelin-maps-zoom-control michelin-maps-zoom-control-' + self._type;

    if (self._type === 'plus') {
      this._controls.innerHTML = '+';
    }
    else if (self._type === 'minus') {
      this._controls.innerHTML = '-';
    }

    this._controls.onclick = function () {
      if (self._type === 'plus') {
        map.zoomIn();
      }
      else if (self._type === 'minus') {
        map.zoomOut();
      }
    };
    return this._controls;
  }
};

ToJSEObject(Drupal.michelinMapUtility.zoomControl);
;
/**
 * @file
 * MR B2C Michelin Maps - Functions to load maps and attach events.
 */

Drupal.michelinMap = function (id, params) {
  this.id = id;
  this.mapObject = null;
  this.markers = {};
  this.allowSearchUpdate = false;

  // We merge the given parameters with the default ones.
  // See mr_b2c_michelin_maps_get_libraries().
  this.params = jQuery.extend({}, Drupal.settings.mr_b2c_michelin_maps.default, params);
};

Drupal.michelinMap.prototype.loadMap = function () {
  this.conf = {
    container : $_id(this.id),
    center: this.params.center,
    zoom: this.params.zoom,
    scrollWheel: false,
    touchZoom: false,
    controls: {
      scale: false,
      copyright: false,
      logo: false
    }
  };

  var parent = this;

  JSELaunch('ViaMichelin.Api.MMap', this.conf, {
    onInit: function(map) {
      // Store map in object.
      parent.mapObject = map;

      // Add default classes.
      jQuery('#' + parent.id).addClass('michelin-map-wrapper');
      jQuery('#' + parent.id).addClass('michelin-map-initialised');

      // Trigger event.
      jQuery('#' + parent.id).trigger('michelin-maps-event-onInit');
    },
    onInitError: function() {
      // Trigger event.
      jQuery('#' + parent.id).trigger('michelin-maps-event-onInitError');
    },
    onSuccess: function(map) {
      parent.mapObject = map;

      // Add the zoom control.
      parent.addZoomControl();

      // Update map style.
      this.setMapStyle(ViaMichelin.Api.Constants.Map.TYPE.LIGHT)

      // Trigger event.
      jQuery('#' + parent.id).trigger('michelin-maps-event-onSuccess', [map]);

      // Bind all other events.
      this.plugWire('click', function() {
        parent.allowSearchUpdate = true;
        jQuery('#' + parent.id).trigger('michelin-maps-event-onClick', parent.getBoundingBox());
      });

      this.plugWire('mousedown', function() {
        parent.allowSearchUpdate = true;
      });

      this.plugWire('moveend', function() {
        if (parent.allowSearchUpdate) {
          jQuery('#' + parent.id).trigger('michelin-maps-event-onMapMoved', parent.getBoundingBox());
        }
      });
    }
  });
};

Drupal.michelinMap.prototype.addZoomControl = function() {
  new Drupal.michelinMapUtility.zoomControl('minus').addTo(this.mapObject);
  new Drupal.michelinMapUtility.zoomControl('plus').addTo(this.mapObject);
};

Drupal.michelinMap.prototype.addHtmlControl = function(position, wrapper_class, content) {
  new Drupal.michelinMapUtility.htmlControl(position, wrapper_class, content).addTo(this.mapObject);
};

Drupal.michelinMap.prototype.addMarker = function(id, coord, icon, title, content) {
  // Marker might already exist if resutls are updated.
  if (typeof this.markers[id] != 'undefined') {
    return;
  }

  var marker = new ViaMichelin.Api.MMap.Core.Layer.Marker(
    {lon : coord.lon, lat : coord.lat},
    {icon : icon, riseOnHover : true, zIndex: 1}
  );

  var parent = this;
  marker.addEventListener('click', function () {
    jQuery('#' + parent.id).trigger('marker-clicked', id);
  });

  marker.addEventListener('mouseover', function () {
    jQuery('#' + parent.id).trigger('michelin-maps-event-marker-mouseover', id);
  });

  marker.addEventListener('mouseout', function () {
    jQuery('#' + parent.id).trigger('michelin-maps-event-marker-mouseout', id);
  });

  marker.addEventListener('popupopen', function () {
    jQuery('#' + parent.id).trigger('michelin-maps-event-popupopen', id);
  });

  marker.addEventListener('popupclose', function () {
    jQuery('#' + parent.id).trigger('michelin-maps-event-popupclose', id);
  });

  marker.addTo(this.mapObject);
  this.markers[id] = marker;

  if (content) {
    marker.bindPopup(Drupal.michelinMapUtility.getBubble(content));
  }
};

Drupal.michelinMap.prototype.getBoundingBox = function () {
  var bbox = {};

  try {
    bbox['ne'] = this.mapObject.getNorthEast();
    bbox['sw'] = this.mapObject.getSouthWest();
  }
  catch (e) {
  }

  return bbox;
};

Drupal.michelinMap.prototype.updateBounds = function(params) {
  var bounds = null;

  for (i in this.markers) {
    if (bounds == null) {
      bounds = this.markers[i].getBounds();
    }
    else {
      bounds.extend(this.markers[i].getBounds());
    }
  }

  if (bounds) {
    this.mapObject.fitBounds(bounds, params);
  }
};

Drupal.michelinMap.prototype.hideOtherMarkers = function(markers) {
  for (var i in this.markers) {
    if (typeof markers[i] == 'undefined') {
      this.markers[i].removeFrom(this.mapObject);
      delete this.markers[i];
    }
  }
};
;
(function ($) {
  Drupal.behaviors.eu_cookie_compliance_popup = {
    attach: function(context, settings) {
      $('body').not('.sliding-popup-processed').addClass('sliding-popup-processed').each(function() {
        try {
          var enabled = Drupal.settings.eu_cookie_compliance.popup_enabled;
          if(!enabled) {
            return;
          }
          if (!Drupal.eu_cookie_compliance.cookiesEnabled()) {
            return;
          } 
          var status = Drupal.eu_cookie_compliance.getCurrentStatus();
          var clicking_confirms = Drupal.settings.eu_cookie_compliance.popup_clicking_confirmation;
          var agreed_enabled = Drupal.settings.eu_cookie_compliance.popup_agreed_enabled;
          var popup_hide_agreed = Drupal.settings.eu_cookie_compliance.popup_hide_agreed;
          if (status == 0) {
            var next_status = 1;
            if (clicking_confirms) {
              $('a, input[type=submit]').bind('click.eu_cookie_compliance', function(){
                if(!agreed_enabled) {
                  Drupal.eu_cookie_compliance.setStatus(1);
                  next_status = 2;
                }
                Drupal.eu_cookie_compliance.changeStatus(next_status);
              });
            }

            $('.agree-button').click(function(){
              if(!agreed_enabled) {
                Drupal.eu_cookie_compliance.setStatus(1);
                next_status = 2;
              }
              Drupal.eu_cookie_compliance.changeStatus(next_status);
            });

            Drupal.eu_cookie_compliance.createPopup(Drupal.settings.eu_cookie_compliance.popup_html_info);
          } else if(status == 1) {
            Drupal.eu_cookie_compliance.createPopup(Drupal.settings.eu_cookie_compliance.popup_html_agreed);
            if (popup_hide_agreed) {
              $('a, input[type=submit]').bind('click.eu_cookie_compliance_hideagreed', function(){
                Drupal.eu_cookie_compliance.changeStatus(2);
              });
            }

          } else {
            return;
          }
        }
        catch(e) {
          return;
        }
      });
    }
  }

  Drupal.eu_cookie_compliance = {};

  Drupal.eu_cookie_compliance.createPopup = function(html) {
    var popup = $(html)
      .attr({"id": "sliding-popup"})
      .height(Drupal.settings.eu_cookie_compliance.popup_height)
      .width(Drupal.settings.eu_cookie_compliance.popup_width)
      .hide();
    if(Drupal.settings.eu_cookie_compliance.popup_position) {
      popup.prependTo("body");
      var height = popup.height();
      popup.show()
        .attr({"class": "sliding-popup-top"})
        .css({"top": -1 * height})
        .animate({top: 0}, Drupal.settings.eu_cookie_compliance.popup_delay);
    } else {
      popup.appendTo("body");
      height = popup.height();
      popup.show()
        .attr({"class": "sliding-popup-bottom"})
        .css({"bottom": -1 * height})
        .animate({bottom: 0}, Drupal.settings.eu_cookie_compliance.popup_delay)
    }
    Drupal.eu_cookie_compliance.attachEvents();
  }

  Drupal.eu_cookie_compliance.attachEvents = function() {
	var clicking_confirms = Drupal.settings.eu_cookie_compliance.popup_clicking_confirmation;
    var agreed_enabled = Drupal.settings.eu_cookie_compliance.popup_agreed_enabled;
    $('.find-more-button').click(function(){
      if (Drupal.settings.eu_cookie_compliance.popup_link_new_window) {
        window.open(Drupal.settings.eu_cookie_compliance.popup_link);
      }
      else{
        window.location.href = Drupal.settings.eu_cookie_compliance.popup_link;
      }
    });
    $('.agree-button').click(function(){
      var next_status = 1;
      if(!agreed_enabled) {
        Drupal.eu_cookie_compliance.setStatus(1);
        next_status = 2;
      }
      if (clicking_confirms) {
        $('a, input[type=submit]').unbind('click.eu_cookie_compliance');
      }
      Drupal.eu_cookie_compliance.changeStatus(next_status);
    });
    $('.hide-popup-button').click(function(){
      Drupal.eu_cookie_compliance.changeStatus(2);
    });
  }

  Drupal.eu_cookie_compliance.getCurrentStatus = function() {
	name = 'cookie-agreed';
	value = Drupal.eu_cookie_compliance.getCookie(name);
	return value;
  }

  Drupal.eu_cookie_compliance.changeStatus = function(value) {
    var status = Drupal.eu_cookie_compliance.getCurrentStatus();
    if (status == value) return;
    if(Drupal.settings.eu_cookie_compliance.popup_position) {
      $(".sliding-popup-top").animate({top: $("#sliding-popup").height() * -1}, Drupal.settings.eu_cookie_compliance.popup_delay, function () {
        if(status == 0) {
          $("#sliding-popup").html(Drupal.settings.eu_cookie_compliance.popup_html_agreed).animate({top: 0}, Drupal.settings.eu_cookie_compliance.popup_delay);
          Drupal.eu_cookie_compliance.attachEvents();
        }
        if(status == 1) {
          $("#sliding-popup").remove();
        }
      })
    } else {
      $(".sliding-popup-bottom").animate({bottom: $("#sliding-popup").height() * -1}, Drupal.settings.eu_cookie_compliance.popup_delay, function () {
        if(status == 0) {
          $("#sliding-popup").html(Drupal.settings.eu_cookie_compliance.popup_html_agreed).animate({bottom: 0}, Drupal.settings.eu_cookie_compliance.popup_delay)
          Drupal.eu_cookie_compliance.attachEvents();
        }
        if(status == 1) {
          $("#sliding-popup").remove();
        }
      ;})
    }
    Drupal.eu_cookie_compliance.setStatus(value);
  }

  Drupal.eu_cookie_compliance.setStatus = function(status) {
    var date = new Date();
    date.setDate(date.getDate() + parseInt(Drupal.settings.eu_cookie_compliance.cookie_expiration_period));
    var path = Drupal.settings.basePath;
    if(path.length > 1) {
      var pathEnd = path.length - 1;
      if (path.lastIndexOf('/') === pathEnd) {
          path = path.substring(0, pathEnd);
      }
    }
    var cookie = "cookie-agreed=" + status + ";expires=" + date.toUTCString() + ";path=" + path;
    if(Drupal.settings.eu_cookie_compliance.domain) {
      cookie += ";domain="+Drupal.settings.eu_cookie_compliance.domain;
    }
    document.cookie = cookie;
  }

  Drupal.eu_cookie_compliance.hasAgreed = function() {
    var status = Drupal.eu_cookie_compliance.getCurrentStatus();
    if(status == 1 || status == 2) {
      return true;
    }
    return false;
  }


  /**
   * Verbatim copy of Drupal.comment.getCookie().
   */
  Drupal.eu_cookie_compliance.getCookie = function(name) {
    var search = name + '=';
    var returnValue = '';

    if (document.cookie.length > 0) {
      offset = document.cookie.indexOf(search);
      if (offset != -1) {
        offset += search.length;
        var end = document.cookie.indexOf(';', offset);
        if (end == -1) {
          end = document.cookie.length;
        }
        returnValue = decodeURIComponent(document.cookie.substring(offset, end).replace(/\+/g, '%20'));
      }
    }

    return returnValue;
  };
  
  Drupal.eu_cookie_compliance.cookiesEnabled = function() {
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;
      if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) { 
        document.cookie="testcookie";
        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
      }
    return (cookieEnabled);
  }
  
})(jQuery);;
