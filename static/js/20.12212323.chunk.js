(this["webpackJsonpdgi-portal"]=this["webpackJsonpdgi-portal"]||[]).push([[20],{485:function(e,t,a){"use strict";a.r(t);var n=a(3),r=a(29),l=a(0),c=a.n(l),s=a(2),o=a(97),u=a(76),i=a(105),m=a(89),p=a(98),d=a(60),b=a(71),E=a(54),f=a(28),v=a(79);t.default=function(){var e=Object(s.h)(),t=Object(s.g)(),a=E.a+"storage/",h=Object(l.useState)(),g=Object(r.a)(h,2),O=g[0],j=g[1],N=Object(l.useState)({color:"text-muted",text:"Veuillez importer une ic\xf4ne ici"}),x=Object(r.a)(N,2),w=x[0],_=x[1],y=Object(l.useState)({}),C=Object(r.a)(y,2),S=C[0],B=C[1],z=Object(l.useState)([]),A=Object(r.a)(z,2),k=A[0],I=A[1],T=Object(l.useState)(!0),V=Object(r.a)(T,2),D=V[0],L=V[1],P=function(e){e.target.src=E.b+"/user-icon-default.png"},J=function(){if(e.state&&e.state.item){var r=e.state.item;r.photo.includes("default-icon")||(j(a+r.photo),_(Object(n.a)(Object(n.a)({},w),{},{text:r.photo.split("/")[1]}))),B(Object(n.a)({},r)),l=r.id,e.state&&e.state.newValue&&(Object(d.a)().fire("Privil\xe8ge modifi\xe9 avec succ\xe8s","","success"),console.log(e.state.newValue),t.replace()),v.a.get(l).then((function(e){var t=e.data;I(t)})).catch((function(e){Object(d.c)(e)})).finally((function(){L(!1)}))}else t.push("/users");var l};return Object(l.useEffect)((function(){J()}),[]),c.a.createElement(f.a,null,c.a.createElement(o.a,null,c.a.createElement(u.a,null,c.a.createElement(i.a,null,c.a.createElement(i.a.Header,null,c.a.createElement(i.a.Title,{as:"h5"}," Information sur l'utilisateur ")),c.a.createElement(i.a.Body,null,c.a.createElement(o.a,null,c.a.createElement(u.a,{md:2},c.a.createElement(i.a,null,c.a.createElement(i.a.Img,{id:"show_mode",onError:P,style:{height:"100%"},variant:"top",src:O,alt:"activity-user"}),c.a.createElement("small",{className:"mt-3 text-center ".concat(w.color)},w.text))),c.a.createElement(u.a,null),c.a.createElement(u.a,{md:8},c.a.createElement(o.a,{className:"mb-3"},c.a.createElement(u.a,null,c.a.createElement("label",{className:"mr-4"}," Nom  : "),c.a.createElement("b",null,S.nom))),c.a.createElement(o.a,{className:"mb-3"},c.a.createElement(u.a,null,c.a.createElement("label",{className:"mr-4"}," Pr\xe9nom  : "),c.a.createElement("b",null,S.prenom))),c.a.createElement(o.a,{className:"mb-3"},c.a.createElement(u.a,null,c.a.createElement("label",{className:"mr-4"}," T\xe9l\xe9phone  : "),c.a.createElement("b",null,S.telephone))),c.a.createElement(o.a,{className:"mb-3"},c.a.createElement(u.a,null,c.a.createElement("label",{className:"mr-4"}," Adresse  : "),c.a.createElement("b",null,S.adresse))))),c.a.createElement(o.a,null,c.a.createElement(m.a,{responsive:!0,hover:!0},c.a.createElement("tbody",null,c.a.createElement("tr",null,c.a.createElement("td",null,"#"),c.a.createElement("td",null,"Application"),c.a.createElement("td",null,"Details")),D?c.a.createElement("tr",{className:"unread text-center"},c.a.createElement("td",{colSpan:4},c.a.createElement(p.a,{animation:"border",role:"status"}))):k.length>0?k.map((function(e){return c.a.createElement("tr",{className:"unread",key:e.code_app},c.a.createElement("td",null,c.a.createElement(b.LazyLoadImage,{onError:P,className:"rounded-circle",style:{width:"40px"},src:a+e.logo_app,alt:"activity-user"})),c.a.createElement("td",null,c.a.createElement("h6",{className:"mb-1"},e.nom_app),c.a.createElement("small",{className:"m-0"},e.nom_privilege)),c.a.createElement("td",null,c.a.createElement("h6",{className:"text-muted"},c.a.createElement("i",{className:"fa fa-circle text-c-green f-10 m-r-15"}),e.desc_app)))})):c.a.createElement("tr",{className:"unread text-center"},c.a.createElement("td",{colSpan:4},"Aucun privil\xe8ge aux applcations de DGI"))))))))))}},56:function(e,t,a){"use strict";var n=a(61),r=a.n(n),l=a(54),c=JSON.parse(localStorage.getItem("user")),s=null!==c?c.token:"",o=r.a.create({baseURL:"".concat(l.a),headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(s)}});t.a=o},60:function(e,t,a){"use strict";a.d(t,"b",(function(){return c})),a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return l}));var n=a(67),r=a.n(n),l=(a(68),function(){return r.a.mixin({toast:!0,showConfirmButton:!1,customClass:{container:"ml-popup",popup:"hover-popup"},showClass:{popup:"animate__animated animate__fadeInDown"},hideClass:{popup:"animate__animated animate__fadeOutDown"}})}),c=function(){return r.a.mixin({backdrop:!0,title:"Attention",text:"Voulez vous vraiment supprimer ?",icon:"warning",buttonsStyling:!1,customClass:{popup:"swal-sm",confirmButton:"btn btn-danger btn-sm",cancelButton:"btn btn-secondary btn-sm"},confirmButtonText:"Confirmer",cancelButtonText:"Annuler",showCancelButton:!0,allowOutsideClick:!1,allowEscapeKey:!1,showLoaderOnConfirm:!0})},s=function(e){e.response.data?l().fire({title:e.response.data.message,icon:"error"}):l().fire({title:"Erreur survenue au serveur",html:"Veuillez contacter l'administrateur",icon:"error"})}},79:function(e,t,a){"use strict";var n=a(15),r=a(14),l=a(56),c=Object(n.a)((function e(){Object(r.a)(this,e)}));c.getAll=function(){return l.a.get("".concat(s))},c.get=function(e){return l.a.get("".concat(s,"/").concat(e))},c.add=function(e){return l.a.post("".concat(s),e)},c.delete=function(e){return l.a.delete("".concat(s,"/").concat(e))},c.update=function(e,t){return l.a.put("".concat(s,"/").concat(t),e)};var s="api/user_privilege_apps";t.a=c},89:function(e,t,a){"use strict";var n=a(1),r=a(5),l=a(52),c=a.n(l),s=a(0),o=a.n(s),u=a(53),i=["bsPrefix","className","striped","bordered","borderless","hover","size","variant","responsive"],m=o.a.forwardRef((function(e,t){var a=e.bsPrefix,l=e.className,s=e.striped,m=e.bordered,p=e.borderless,d=e.hover,b=e.size,E=e.variant,f=e.responsive,v=Object(r.a)(e,i),h=Object(u.a)(a,"table"),g=c()(l,h,E&&h+"-"+E,b&&h+"-"+b,s&&h+"-striped",m&&h+"-bordered",p&&h+"-borderless",d&&h+"-hover"),O=o.a.createElement("table",Object(n.a)({},v,{className:g,ref:t}));if(f){var j=h+"-responsive";return"string"===typeof f&&(j=j+"-"+f),o.a.createElement("div",{className:j},O)}return O}));t.a=m}}]);
//# sourceMappingURL=20.12212323.chunk.js.map