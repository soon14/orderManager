var _model=function(){function c(){}function a(a,f){for(var e in f)d.call(f,e)&&(a[e]=typeof f[e]==="function"&&typeof a[e]=="function"&&b.test(f[e])?function(a,b,h){return function(){var a=this._super,f;this._super=h;f=b.apply(this,arguments);this._super=a;return f}}(e,f[e],a[e]):f[e])}var b=/xyz/.test(function(){})?/_super/:/.*/,d=Object.prototype.hasOwnProperty,g;c.prototype={batch:function(a){for(var b in this)d.call(this,b)&&a.test(b)&&this[b].call(this)},setOptions:function(a){typeof a=="object"&&
this.options&&$.extend(!0,this.options,a)},getmodel:function(a){if(d.call(this,a))return this[a]},addmodel:function(a,b){for(var a=a.split("."),e=this,d,g=0;d=a[g];g++)if(e=e.getmodel(d),!e){if(b===!1)return;e=this[d]=new c}return e}};g=new c;return{define:function(){for(var b=Array.prototype.slice.call(arguments),c=b.pop(),e=b.shift(),b=typeof b[0]==="string"?b:b[0]||[],d=g.addmodel(e),e=[d],i=0,k=b.length,j;i<k;i++)j=b[i],e.push(g.addmodel(j,!1));typeof c==="function"?(c=c.apply(null,e))&&a(d,c):
a(d,c);if(!d.__initialize)eventsManage.make(d),d.__initialize=!0;if(d.domready&&!d.__domready)$(function(){d.domready()}),d.__domready=!0;d.init&&d.init();return d},require:function(a){return g.addmodel(a,!1)}}}(),eventsManage=function(){return{_events:$({}),bind:function(c,a,b){a=b?$.proxy(a,b):a;this._events.bind(c,a)},trigger:function(c){var a=Array.prototype.slice.call(arguments,1);return this._events.trigger(c,a)},unbind:function(c,a){this._events.unbind(c,a)},make:function(c){for(var a in this)this.hasOwnProperty(a)&&
(c[a]=this[a]);c._events=$({})}}}();
_model.define("menu",function(){var c={layout:"transverse",tmplurl:"xxxx",cssactive:"active",csshover:"hover",ajaxResponseReader:{data:"data"},tmpl:"[tmpl-menu],[tmpl-menu-sub]",tmplcontent:"[data-menu],[data-menu-sub]",parentTag:"li",params:["menuId","href","target","active","parentId","name"]};return{options:c,inilize:!1,activedata:[],cachedata:{},domready:function(){this.elem=$(c.tmplcontent);this.template=$(c.tmpl);this.getdata()},getdata:function(){var a=this,b,d=a.elem.length;$.ajax({type:"GET",
dataType:"json",url:c.tmplurl,success:function(c){a.menudata=c;a.parseData(c);a.resetActive(a.activeId);for(var h=0;h<d;h++)b=a.template.eq(h).tmpl(c),a.elem.eq(h).html(b);a.changeActiveClass();a.batch(/^onEvent/);a.inilize=!0;a.trigger("inilize")}})},getactive:function(){return this.activedata},isInit:function(){return this.inilize},getparam:function(a,b){for(var d={},c=0,h=a.length,f;c<h;c++)f=a[c],d[f]=b[f];return d},parseData:function(a){for(var b=this.cachedata,d=a[this.options.ajaxResponseReader.data],
g=0,h=d.length,f,e;g<h;g++){f=d[g];e=this.getparam(c.params,f);if(typeof e.parentId!=null&&a.menuId!=null)e.parentId=a.menuId;if(e.active==1)this.activeId=e.menuId;b[e.menuId]=e;f.data&&f.data.length&&this.parseData(f)}},resetActive:function(a){var b=this.cachedata,a=b[a];for(this.activedata=[a];a=a.parentId;)a=b[a],this.activedata.unshift(a)},changeActiveClass:function(){var a=this,b=this.options.cssactive,c=this.activedata,g=this.options.parentTag;this.elem.find("."+b).removeClass(b);$.each(c,function(c,
d){$("[menuId="+d.menuId+"]",a.elem).closest(g).addClass(b)})},onEventMenuClick:function(){var a=this,b;this.bind("click",function(c,g){var h=a.elem.find("[menuId="+g+"]").eq(0);a.resetActive(g);b=a.menuClick.call(h,c,a,a.cachedata[g],g)});this.elem.on("click","a",function(){var c=$(this).attr("menuId");a.trigger("click",[c]);return b})}}});
_model.define("menu",function(){return{menuClick:function(c,a,b){c=b.target;a.changeActiveClass();if(b.target&&b.target!=="_blank")return $("#"+c).attr("src",b.href),!1;return!0},menuEnter:function(c,a){var b=$(this),d;b.addClass(a.options.csshover);(d=b.children("div")).length&&d.show()},menuLeave:function(c,a){var b=$(this),d;b.removeClass(a.options.csshover);(d=b.children("div")).length&&d.hide()},onEventMenuHover:function(){var c=this;this.elem.on("mouseenter","li",function(a){return c.menuEnter.call(this,
a,c)}).on("mouseleave","li",function(a){return c.menuLeave.call(this,a,c)})}}});
_model.define("position",["menu"],function(c,a){var b={positionDiv:"#breadcrumbs",templatecontent:"<ul>",isBindMenuClick:!0,template:'<li><a href="{href}"><span>{name}</span></a></li>'},d=/\{([^}]*)\}/g;return{options:b,init:function(){eventsManage.bind("positions",this.viewpos,this)},viewpos:function(c,h){var f=this;if(!a.isInit())return a.bind("inilize.positions",function(){f.viewpos(c,h);a.unbind("inilize.positions")}),!1;var e=a.getactive(),l=$(b.templatecontent),i,k,j,m;j=0;for(m=e.length;j<
m;j++)k=e[j],i=$(b.template.replace(d,function(a,b){if(k[b])return k[b]})),b.isBindMenuClick&&i.bind("click",function(b){return function(){a.trigger("click",b);return!1}}(k.menuId)),l.append(i);$(b.positionDiv).html(l.append(h))}}});