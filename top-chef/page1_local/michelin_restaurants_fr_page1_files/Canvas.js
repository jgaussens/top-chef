JSEPackage("ViaMichelin.Api.Util.Drawing.Canvas"),ViaMichelin.Api.Util.Drawing.Canvas={_plugCanvasListener:function(){var e=this.reportCanvasHTMLEvent;this._canvas.expando=this,this._canvas.onclick=e,this._canvas.onmousedown=e,this._canvas.onmouseup=e,this._canvas.onmousemove=e,this._canvas.onmouseout=e,this._canvas.oncontextmenu=e,this._canvas.ontouchstart=e,this._canvas.addEventListener&&this._canvas.addEventListener("DOMMouseScroll",e,!1),this._canvas.onmousewheel=e},reportCanvasHTMLEvent:function(e){var t,a,o;navigator.isIE&&(e=window.event),t=navigator.isMozilla?e.pageX:e.clientX+document.documentElement.scrollLeft,a=navigator.isMozilla?e.pageY:e.clientY+document.documentElement.scrollTop,navigator.isSafari&&(t=e.pageX+document.body.offsetLeft,a=e.pageY+document.body.offsetTop),o=JSE.HTML.findPosition(this.expando._canvas),t-=o[0],a-=o[1];var n=e.type;"DOMMouseScroll"==e.type&&(n="mousewheel");var s=Boolean(this.expando.shapes[t]&&this.expando.shapes[t][a]);if(!s&&"touchstart"==n){var i=5;e:for(var h=1;i>=h;h++)for(var r=-h;h>=r;r++)if(this.expando.shapes[t+r])for(var l=-h;h>=l;l++)if((r==-h||r==h||l==-h||l==h)&&this.expando.shapes[t+r][a+l]){s=!0,t+=r,a+=l;break e}}s?"mousedown"===n?this.expando.stimulate("ShapeEvent_mousedown",e,this.expando.shapes[t][a][4]):"mousemove"==n?null==this.expando.mouseoverElement&&this.expando.shapes[t][a]?(this.expando.mouseoverElement=this.expando.shapes[t][a],this.expando.stimulate("ShapeEvent_mouseover",e,this.expando.shapes[t][a][4])):this.expando.mouseoverElement&&(this.expando.mouseoverElement[4]==this.expando.shapes[t][a][4]?this.expando.stimulate("ShapeEvent_mousemove",e,this.expando.mouseoverElement[4]):this.expando.mouseoverElement[4]!=this.expando.shapes[t][a][4]&&(this.expando.stimulate("ShapeEvent_mouseout",e,this.expando.mouseoverElement[4]),this.expando.mouseoverElement=this.expando.shapes[t][a],this.expando.stimulate("ShapeEvent_mouseover",e,this.expando.shapes[t][a][4]))):("touchstart"==n&&(n="mouseup"),this.expando.stimulate("ShapeEvent_"+n,e,this.expando.shapes[t][a][4])):"mouseout"===n?this.expando.mouseoverElement&&(this.expando.stimulate("ShapeEvent_mouseout",e,this.expando.mouseoverElement[4]),this.expando.mouseoverElement=null):"mousemove"==n&&this.expando.mouseoverElement&&(this.expando.stimulate("ShapeEvent_mouseout",e,this.expando.mouseoverElement[4]),this.expando.mouseoverElement=null)},_drawArrowCANVAS:function(e,t,a){function o(e,t){return 0===t?e/(t+1e-6):e/t}function n(e,t){return Math.tan(t)*e}function s(e,t,a){return[(t[0]-e[0])*Math.cos(a)-(t[1]-e[1])*Math.sin(a)+e[0],(t[0]-e[0])*Math.sin(a)+(t[1]-e[1])*Math.cos(a)+e[1]]}function i(e,t){var a,n;return a=o(e[1]-t[1],e[0]-t[0]),n=e[1]-a*e[0],{a:a,b:n}}function h(e,t,a,n){var s,i,h,r,l,m,d,p,u,v;return l=e.a,m=e.b,d=t[0],p=a[0],u=t[1],v=a[1],h=Math.sqrt((d-p)*(d-p)+(u-v)*(u-v)),r=n,s=o(-d*p+d*d+m*v-u*v-u*m+u*u-h*r,-p+d-l*v+l*u),i=l*s+m,[s,i]}var r,l,m,d,p,u,v,c,f,x,_,w,M;if(c=this._drawPathCANVAS(e,t),M=a.type,delete a.type,x=e.length,$isDefined(M)?1==M?(w=Math.PI/4,_=.9*t.lineWidth):2==M?(w=Math.PI/4,_=1.5*t.lineWidth):3==M&&(w=Math.PI/2.7,_=1.1*t.lineWidth):(w=Math.PI/4,_=1.5*t.lineWidth),f=[[e[x-1][0],e[x-1][1]],[e[x-2][0],e[x-2][1]]],e[x-1][0]!=e[x-2][0]||e[x-1][1]!=e[x-2][1]){l=i(f[0],f[1]),m=h(l,f[0],f[1],_),d=s(f[0],m,Math.PI/2),p=s(f[0],m,-Math.PI/2),e=[d,p],u=n(_,w),v=s(f[0],h(l,f[0],f[1],u),Math.PI),c.beginPath();for(r in a)c[r]=a[r];c.moveTo(e[0][0],e[0][1]),isNaN(v[0])||isNaN(v[1])||($isDefined(M)&&1!=M&&2!=M?3==M&&(c.moveTo(e[1][0],e[1][1]),c.lineTo(v[0],v[1]),c.lineTo(e[0][0],e[0][1]),c.stroke()):(c.moveTo(f[0][0],f[0][1]),c.lineTo(e[0][0],e[0][1]),c.lineTo(v[0],v[1]),c.lineTo(e[1][0],e[1][1]),c.lineTo(f[0][0],f[0][1]),c.stroke(),$isDefined(a.fillStyle)&&"none"!=a.fillStyle&&c.fill()))}return c},_drawCircleCANVAS:function(e,t,a,o){var n=this._context;n.lineWidth=a.lineWidth,n.strokeStyle=a.strokeStyle,"none"!=a.fillStyle&&(n.fillStyle=a.fillStyle),n.shadowBlur=a.shadowBlur&&"none"!=a.shadowBlur?a.shadowBlur:0,n.shadowColor=a.shadowColor&&"none"!=a.shadowColor?a.shadowColor:"rgba(0,0,0,0)",n.shadowOffsetX=a.shadowOffsetX&&"none"!=a.shadowOffsetX?a.shadowOffsetX:0,n.shadowOffsetY=a.shadowOffsetY&&"none"!=a.shadowOffsetY?a.shadowOffsetY:0,e=e.map(Math.round),n.beginPath(),n.arc(e[0],e[1],t,0,2*Math.PI,!0),n.stroke(),n.fill();var s=e[0]-t;0>s&&(s=0);var i=e[0]+t;i>=this._width&&(i=this._width);var h=e[1]-t;0>h&&(h=0);var r=e[1]+t;r>=this._height&&(r=this._height);for(var l=s;i>l;l++)for(var m=h;r>m;m++){var d=Math.sqrt(Math.pow(e[0]-l,2)+Math.pow(e[1]-m,2));d>t||(this.shapes[l][m]=["circle",e,t,a,o])}},_drawPathCANVAS:function(e,t){var a,o,n;n=e.length,a=this._canvas.getContext("2d"),a.beginPath();for(o in t)a[o]=t[o];for(a.moveTo(e[0][0],e[0][1]),o=0;n>o;o++)a.lineTo(e[o][0],e[o][1]);return a.stroke(),$isDefined(t.fillStyle)&&"none"!=t.fillStyle&&a.fill(),a},_drawImageCANVAS:function(e,t,a,o){var n,s,i,h,r=this._context,l=new Image;l.onload=function(){r.drawImage(l,t[0]-15,t[1]-15)},l.src=e;var m,d,p,u;n=t[0]-parseInt(a[0]/2),s=t[1]-parseInt(a[1]/2),i=t[0]+parseInt(a[0]/2),h=t[1]+parseInt(a[1]/2),d=ViaMichelin.Api.MMap.Core.Geometry.point([n,s]),p=ViaMichelin.Api.MMap.Core.Geometry.point([i,h]),m=ViaMichelin.Api.MMap.Core.Geometry.bounds(d,p),u=ViaMichelin.Api.MMap.Core.Geometry.bounds([0,0],[this._width-1,this._height-1]),u.contains(m)||(m.min.x<u.min.x&&(m.min.x=u.min.x),m.max.x>u.max.x&&(m.max.x=u.max.x),m.min.y<u.min.y&&(m.min.y=u.min.y),m.max.y>u.max.y&&(m.max.y=u.max.y));for(var v=m.min.x;v<m.max.x;v++)for(var c=m.min.y;c<m.max.y;c++)this.shapes[v][c]=["image",t,a,{},o];return r},_clearContainerCANVAS:function(){this._context&&this._context.clearRect(0,0,this._canvas.width,this._canvas.height)},_createContainerCANVAS:function(){var e=document.createElement("canvas");return e.style.width=this._width+"px",e.style.height=this._height+"px",e.setAttribute("width",this._width),e.setAttribute("height",this._height),$isDefined(this._options)&&$isDefined(this._options.className)&&e.setAttribute("class",this._options.className),e}};