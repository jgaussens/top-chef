JSEPackage("ViaMichelin.Api.UI.Overlay"),JSEImportApi("ViaMichelin.Api.UI.Core.Overlay"),JSEImportApi("JSE.HTML"),JSEImportApi("ViaMichelin.Api.Util.Css"),ViaMichelin.Api.UI.Overlay=function(i){this.initialConf={};var t,e;for(t in ViaMichelin.Api.UI.Overlay.prototype.initialConf)if("object"==typeof ViaMichelin.Api.UI.Overlay.prototype.initialConf[t]){this.initialConf[t]={};for(e in ViaMichelin.Api.UI.Overlay.prototype.initialConf[t])this.initialConf[t][e]=ViaMichelin.Api.UI.Overlay.prototype.initialConf[t][e]}else this.initialConf[t]=ViaMichelin.Api.UI.Overlay.prototype.initialConf[t];for(t in i)if("object"==typeof i[t])for(e in i[t])this.initialConf[t][e]=i[t][e];else this.initialConf[t]=i[t];this.extend(ViaMichelin.Api.UI.Core.Overlay,this.initialConf.width,this.initialConf.top),this.prepare(),this.dynId=this.dynIds[0]++,this.screenCenter=document.body.offsetWidth/2,this.sheetZone=document.createElement("div"),this.sheetZone.className="vmapi-overlay vmapi-overlay-"+this.initialConf.color+" vmapi-overlay-"+ViaMichelin.Api.Constants.System.ApiLang,$isNotEmpty(this.initialConf.className)&&(this.sheetZone.className+=" "+this.initialConf.className),this.HTMLElement.appendChild(this.sheetZone);var s=this.commonTemplate;if(s=s.replaceAll("{$DYNID}",this.dynId),s=s.replaceAll("{$LOGO_DISPLAYED}","display:none;"),this.sheetZone.innerHTML=s,this.closeImageUI=new JSE.HTML.UIComponent(JSE.HTML.getChild("img","idVMOverlayCloseButton"+this.dynId,this.sheetZone)),this.closeImageUI.plugWire(new JSEWire("HTMLEvent_click",this.close,this)),this.overlayMain=JSE.HTML.getChild("table","overlayMain"+this.dynId,this.sheetZone),this.mainContainer=JSE.HTML.getChild("div","mainContainer"+this.dynId,this.sheetZone),this.initialConf.internal.border&&(this.mainContainer.style.border="1px solid "+this.initialConf.internal.borderColor),this.initialConf.internal.margin){var n=parseInt(this.initialConf.internal.margin,10)+"px",a=parseInt(this.initialConf.internal.margin,10)<11?"11px":parseInt(this.initialConf.internal.margin,10)-11+"px";this.mainContainer.style.margin=a+" "+n+" "+n+" "+n}if(this.initialConf.internal.padding){var l=parseInt(this.initialConf.internal.padding,10)+"px";this.mainContainer.style.padding=l}this.overlayLeft=JSE.HTML.getChild("td","overlayLeft"+this.dynId,this.sheetZone),this.leftColumnContainer=JSE.HTML.getChild("div","leftColumnContainer"+this.dynId,this.sheetZone),this.logoBib=JSE.HTML.getChild("div","idLogoBib"+this.dynId,this.sheetZone);var h=ViaMichelin.Api.Util.Css.generateUrlCss("ApiOverlays","",{ie:!0,ie6:!0});ViaMichelin.Api.Util.Css.loadCss("ApiOverlays",h)},ViaMichelin.Api.UI.Overlay.prototype={JSEwireHub:{onAppendChild:[]},closeImageUI:null,initialConf:{internal:{border:!1,borderColor:"#323232",borderRadius:0,padding:0,margin:13},color:"white",width:975,top:20,className:""},overlayMain:null,mainContainer:null,leftColumnContainer:null,sheetZone:null,isBibDisplayed:!1,commonTemplate2:'<div id="idLogoBib{$DYNID}" class="bib" style="{$LOGO_DISPLAYED}"></div>'+"<div id='idVMOverlayBorder{$DYNID}' class='vm-overlay-border overlayBlack'><span id='idVMOverlayCloseButton{$DYNID}' class='vm-overlay-titlebar-close'>close</span><div id='mainContainer{$DYNID}' class='vm-overlay-content'></div></div>",commonTemplate3:'<div id="idLogoBib{$DYNID}" class="bib" style="{$LOGO_DISPLAYED}"></div><table cellpadding="0" cellspacing="0" width="100%"><tr><td valign="top" id="overlayLeft{$DYNID}" style="display:none;"><table width="100%" cellpadding="0" cellspacing="0" class="left-column"><tr height="35"><td width="4"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="4" height="35" /></td><td><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="1" height="35" /></td><td width="8"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="8" height="35" /></td></tr><tr height="4" class="top"><td class="left"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="4" height="4" /></td><td class="center"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="1" height="4" /></td><td class="right"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="8" height="4" /></td></tr><tr class="middle"><td class="left"></td><td class="center"><div class="left-column-cont" id="leftColumnContainer{$DYNID}"></div></td><td class="right"></td></tr><tr height="4" class="bottom"><td class="left"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="4" height="4" /></td><td class="center"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="1" height="4" /></td><td class="right"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="8" height="4" /></td></tr></table></td><td valign="top"><table width="100%" cellpadding="0" cellspacing="0" class="main" id="overlayMain{$DYNID}"><tr height="1" class="layout-fixer"><td width="4"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="4" height="1" /></td><td></td><td width="20"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="20" height="1" /></td><td width="8"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="6" height="1" /></td></tr><tr height="27" class="top"><td class="left"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="4" height="27" /></td><td class="center"></td><td class="right" colspan="2"><img class="vmapi-close" id="idVMOverlayCloseButton{$DYNID}" width="28" height="27" src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" /></td></tr><tr class="middle"><td class="left bgimg"></td><td class="center bgimg"><div class="main-cont vmapi-overlay-content" id="mainContainer{$DYNID}"></div></td><td class="right bgimg"></td><td></td></tr><tr height="4" class="bottom"><td class="left"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="4" height="4" /></td><td class="center"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="1" height="4" /></td><td class="right"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="20" height="4" /></td><td></td></tr></table></td></tr></table>',commonTemplate:'<div id="idLogoBib{$DYNID}" class="bib" style="{$LOGO_DISPLAYED}"></div><table cellpadding="0" cellspacing="0" width="100%"><tr><td valign="top" id="overlayLeft{$DYNID}" style="display:none;"><table width="100%" cellpadding="0" cellspacing="0" class="left-column"><tr height="35"><td width="4"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="4" height="35" /></td><td><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="1" height="35" /></td><td width="8"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="8" height="35" /></td></tr><tr height="4" class="top"><td class="left"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="4" height="4" /></td><td class="center"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="1" height="4" /></td><td class="right"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="8" height="4" /></td></tr><tr class="middle"><td class="left"></td><td class="center"><div class="left-column-cont" id="leftColumnContainer{$DYNID}"></div></td><td class="right"></td></tr><tr height="4" class="bottom"><td class="left"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="4" height="4" /></td><td class="center"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="1" height="4" /></td><td class="right"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="8" height="4" /></td></tr></table></td><td valign="top"><table width="100%" cellpadding="0" cellspacing="0" class="main" id="overlayMain{$DYNID}"><tr height="1" class="layout-fixer"><td width="4"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="4" height="1" /></td><td></td><td width="16"></td><td width="4"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="20" height="1" /></td><td width="8"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="6" height="1" /></td></tr><tr height="27" class="top"><td class="left"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="4" height="27" /></td><td class="center"></td><td class="right" colspan="3"><img class="vmapi-close" id="idVMOverlayCloseButton{$DYNID}" width="28" height="27" src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" /></td></tr><tr class="middle"><td class="left bgimg"></td><td class="center bgimg" colspan="2"><div class="main-cont vmapi-overlay-content" id="mainContainer{$DYNID}"></div></td><td class="right bgimg"></td><td></td></tr><tr height="4" class="bottom"><td class="left"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="4" height="4" /></td><td class="center"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="1" height="4" /></td><td class="right" colspan="2"><img src="'+ViaMichelin.Api.Constants.System.ApiImgPath+'all/s.gif" width="20" height="4" /></td><td></td></tr></table></td></tr></table>',screenCenter:0,dynIds:[0],hideLogoBib:function(){},release:function(){try{this.closeImageUI.isolate(),this.closeImageUI.release(),this.closeImageUI=null,this.mainContainer=null,this.leftColumnContainer=null,this.overlayLeft=null,this.overlayMain=null,this.sheetZone=null}catch(i){}ViaMichelin.Api.UI.Core.Overlay.prototype.release.call(this)},setVisible:function(i){i?(this.HTMLElementContainer.HTMLElement.style.display="block",this.underLayer.HTMLElement.style.display="block"):(this.HTMLElementContainer.HTMLElement.style.display="none",this.underLayer.HTMLElement.style.display="none")},setWidth:function(i){this.HTMLElement.style.width=i+"px"},showLogoBib:function(){},_addContent:function(){},_appendToLeftColumnContent:function(i){this.leftColumnContainer.appendChild(i)},_clearMainContainer:function(){for(;this.mainContainer.hasChildNodes();)this.mainContainer.removeChild(this.mainContainer.firstChild)},_replaceToMainContent:function(i){var t=this.mainContainer.innerHTML.replace(this.mainContainer.innerHTML,i.innerHTML);this.mainContainer.innerHTML=t},_appendToMainContent:function(i){this.mainContainer.appendChild(i)},_removeFromMainContent:function(i){try{this.mainContainer.removeChild(i)}catch(t){}},_setMainContainerClass:function(i){JSE.HTML.addClass(this.overlayMain,i)},_setLeftColumnWidth:function(i){i?(this.overlayLeft.width=i,this.overlayLeft.style.display=""):this.overlayLeft.style.display="none"}};