JSEPackage("ViaMichelin.Api.Util.HTML"),JSEImportApi("JSE.HTML"),ViaMichelin.Api.Util.HTML={truncDescription:function(e,t,n){if(n||(n=".."),!e)return"";if(e.length<=t)return e;var a=e.substring(0,t),r=a.lastIndexOf("&"),i=a.lastIndexOf(";");return-1!=r&&r>i&&r>Math.max(0,t-6)&&(a=a.substring(0,a.lastIndexOf("&"))),a+n},adaptableDescription:function(e,t){if("string"==typeof e.innerHTML&&e.innerHTML){var n=e,a=0;null!=e.href&&(n=e.parentNode);var r=parseInt(JSE.HTML.getStyle(n,"marginTop"),10),i=parseInt(JSE.HTML.getStyle(n,"marginBottom"),10),l=parseInt(JSE.HTML.getStyle(n,"paddingTop"),10),s=parseInt(JSE.HTML.getStyle(n,"paddingBottom"),10);a=parseInt(r+i+l+s,10);var o=e.innerHTML,c=JSE.HTML.getStyle(n,"lineHeight");c&&(c=parseInt(c.replace("px","").replace("pt","").replace("e",""),10));for(var f=o.length;f>0;f--){var u=ViaMichelin.Api.Util.HTML.truncDescription(o,f,t);if(e.innerHTML=u,parseInt(n.offsetHeight,10)<=c+a)break}n.style.overflow="hidden",c&&(n.style.height=c+"px"),e.className=e.className.replace(/adaptable/gi,"adapted")}},removeTags:function(e){var t=new RegExp("<.[^<>]*>","gi");return e.replace(t,"")},addClassNameToHTMLElement:function(e,t){ViaMichelin.Api.Util.HTML.isClassNameExistInHTMLElement(e,t)||(e.className=e.className+" "+t)},removeClassNameToHTMLElement:function(e,t){if(t instanceof Array)for(var n in t)$isDefined(t[n])&&(e.className=e.className.replace(t[n],""));else e.className=e.className.replace(t,"")},isClassNameExistInHTMLElement:function(e,t){for(var n=e.className.split(" "),a=0;a<n.length;a++)if(n[a]==t)return!0;return!1},getElementsByClassName:function(e,t){var n,a,r,i=[];if("undefined"!=typeof e&&null!=e){if(e.getElementsByClassName){for(n=e.getElementsByClassName(t),a=n.length,r=0;a>r;r++)i.push(n[r]);return i}for(n=e.getElementsByTagName("*"),a=n.length,r=0;a>r;r++)if(n[r].className.indexOf(" ")>=0)for(var l=n[r].className.split(" "),s=0;s<l.length;s++)l[s]==t&&i.push(n[r]);else n[r].className==t&&i.push(n[r])}return i},getElementById:function(e,t){var n,a,r,i=null;if("undefined"!=typeof e&&null!=e)if(e.querySelector)i=e.querySelector("#"+t);else for(n=e.getElementsByTagName("*"),a=n.length,r=0;a>r;r++)if(n[r].id===t){i=n[r];break}return i},removeHTMLList:function(e){if(null!=e)for(;e.childNodes.length>0;)e.removeChild(e.childNodes[0])},pluralize:function(e,t,n){return"number"!=typeof e&&(e=0),n||(n=null),1>=e?t:n?n:t+"s"},capitalize:function(e){return e.replace(/[^\s-]+/g,function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()})},htmlDecode:function(e){return e&&(e=e.replace(/&lt;/g,"<"),e=e.replace(/&gt;/g,">"),e=e.replace(/&quot;/g,'"'),e=e.replace(/&#39;/g,"'"),e=e.replace(/&amp;/g,"&"),e=e.replace(/<br>/g,"\n"),e=e.replace(/<br\/>/g,"\n")),e},isItemExistInList:function(e,t){for(var n=0;n<e.length;n++)if(t==e[n])return!0;return!1},focused:function(e){e.exp=this,e.onfocus=e.onkeypress=function(){this.exp._focusFieldWithDefVal(this)},e.onblur=function(){this.exp._blurFieldWithDefVal(this)},e.value||(this._blurFieldWithDefVal(e),e.blur())},_focusFieldWithDefVal:function(e){e.className.indexOf("fFocused")<0&&(e.className+=" fFocused")},_blurFieldWithDefVal:function(e){e.value||(e.className=e.className.replaceAll(" fFocused",""))},addOrRemoveValueInArray:function(e,t){for(var n=[],a=0;a<e.length;a++)e[a]!=t&&n.push(e[a]);return n},isSupportSVG:function(){return!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect},getDomObjectFromXMLString:function(e){e=e.replace(/<([a-zA-z]*)([^\/>]*)\/>/g,"<$1$2></$1>");var t;if(window.DOMParser){var n=new DOMParser;t=n.parseFromString(e,"text/xml")}else t=new ActiveXObject("Microsoft.XMLDOM"),t.async=!1,t.loadXML(e);return t},isParentFixed:function(e){return e.offsetParent?"fixed"==JSE.HTML.getStyle(e.offsetParent,"position")?!0:ViaMichelin.Api.Util.HTML.isParentFixed(e.offsetParent):!1},addEvent:function(e,t,n){window.addEventListener?e.addEventListener(t,n,!1):window.attachEvent&&e.attachEvent("on"+t,n)},removeEvent:function(e,t,n){window.addEventListener?e.removeEventListener(t,n,!1):window.attachEvent&&e.detachEvent("on"+t,n)},styleSupport:function(e){var t,n,a=e.charAt(0).toUpperCase()+e.slice(1),r=["Moz","Webkit","O","ms"],i=document.createElement("div");if(e in i.style)n=e;else for(var l=0;l<r.length;l++)if(t=r[l]+a,t in i.style){n=t;break}return i=null,n}},ViaMichelin.Api.Util.extend(ViaMichelin.Api.Util.HTML);