(this["webpackJsonpdgi-portal"]=this["webpackJsonpdgi-portal"]||[]).push([[3],{61:function(e,t,a){"use strict";t.a={BLANK_LINK:"javascript:void(0);"}},74:function(e,t,a){"use strict";var i=a(14),n=a(15),r=a(17),l=a(16),c=a(0),o=a.n(c),s=a(11),m=a(19),p=a(81),u=a(61),d=a(28),h=function(e){Object(r.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={main:[],item:[]},e.componentWillReceiveProps=function(){p.a.items.map((function(t,a){return t.type&&"group"===t.type&&e.getCollapse(t),!1}))},e.getCollapse=function(t){t.children&&t.children.filter((function(a){return a.type&&"collapse"===a.type?e.getCollapse(a):a.type&&"item"===a.type&&document.location.pathname===m.a.basename+a.url&&e.setState({item:a,main:t}),!1}))},e}return Object(n.a)(a,[{key:"componentDidMount",value:function(){var e=this;p.a.items.map((function(t,a){return t.type&&"group"===t.type&&e.getCollapse(t,a),!1}))}},{key:"render",value:function(){var e,t,a="",i="Welcome";return this.state.main&&"collapse"===this.state.main.type&&(e=o.a.createElement("li",{className:"breadcrumb-item"},o.a.createElement("a",{href:u.a.BLANK_LINK},this.state.main.title))),this.state.item&&"item"===this.state.item.type&&(i=this.state.item.title,t=o.a.createElement("li",{className:"breadcrumb-item"},o.a.createElement("a",{href:u.a.BLANK_LINK},i)),!1!==this.state.item.breadcrumbs&&(a=o.a.createElement("div",{className:"page-header"},o.a.createElement("div",{className:"page-block"},o.a.createElement("div",{className:"row align-items-center"},o.a.createElement("div",{className:"col-md-12"},o.a.createElement("div",{className:"page-header-title"},o.a.createElement("h5",{className:"m-b-10"},i)),o.a.createElement("ul",{className:"breadcrumb"},o.a.createElement("li",{className:"breadcrumb-item"},o.a.createElement(s.b,{to:"/"},o.a.createElement("i",{className:"feather icon-home"}))),e,t))))))),document.title=i+" | Portail - DGI",o.a.createElement(d.a,null,a)}}]),a}(c.Component);t.a=h},81:function(e,t,a){"use strict";t.a={items:[{id:"navigation",title:"Administrateur",type:"group",icon:"icon-navigation",children:[{id:"dashboard",title:"Application",type:"item",url:"/apps",icon:"feather icon-box"},{id:"bootstrap",title:"Utilisateur",type:"item",icon:"feather icon-users",url:"/users"},{id:"privilege",title:"Privil\xe8ge",type:"item",icon:"feather icon-shield",url:"/privileges"}]},{id:"ui-element",title:"Compte",type:"group",icon:"icon-ui",children:[{id:"form-basic",title:"Mon profile",type:"item",url:"/profile",icon:"feather icon-home"},{id:"disabled-menu",title:"D\xe9connexion",type:"item",url:"/logout",classes:"nav-item",icon:"feather icon-power"}]}]}},88:function(e,t,a){}}]);
//# sourceMappingURL=3.b4104da0.chunk.js.map