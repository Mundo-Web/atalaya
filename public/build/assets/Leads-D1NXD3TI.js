import{C as D,c as k,R as e,r as l}from"./CreateReactScript-ARlnfnD-.js";import{T as A,R as b,M as g,I as r,a as _}from"./InputFormGroup-CJk32z4Y.js";import{C as h}from"./ClientsRest-BBkFMFe4.js";import{A as M}from"./Adminto-DTd8ZJOr.js";import{T as G}from"./TextareaFormGroup-BA4AM152.js";import{D as I,a as B}from"./DropdownItem-1fLqL8zT.js";const q=({statuses:c,can:o})=>{const s=l.useRef(),v=l.useRef(),i=l.useRef(),u=l.useRef(),d=l.useRef(),f=l.useRef(),p=l.useRef(),E=l.useRef(),R=l.useRef(),[x,C]=l.useState(!1),[a,T]=l.useState({}),y=t=>{C(!1),u.current.value="",d.current.value="",f.current.value="",p.current.value="",E.current.value="",R.current.value="",$(i.current).modal("show")},F=async t=>{t.preventDefault();const n={contact_name:u.current.value,contact_email:d.current.value,contact_phone:f.current.value,name:p.current.value,web_url:E.current.value,message:R.current.value,client_width:window.screen.width,client_height:window.screen.height,client_system:navigator.platform??"Linux"};await h.save(n)&&($(s.current).dxDataGrid("instance").refresh(),$(i.current).modal("hide"))},N=t=>{T(t),$(v.current).modal("show")},w=async(t,n)=>{await h.clientStatus(t,n)&&$(s.current).dxDataGrid("instance").refresh()};return console.log(c),e.createElement(e.Fragment,null,e.createElement(A,{gridRef:s,title:"Leads",rest:h,toolBar:t=>{t.unshift({widget:"dxButton",location:"after",options:{icon:"refresh",hint:"REFRESCAR TABLA",onClick:()=>$(s.current).dxDataGrid("instance").refresh()}}),t.unshift({widget:"dxButton",location:"after",options:{icon:"plus",hint:"NUEVO REGISTRO",onClick:()=>y()}})},filterValue:["client_status.id","<>",12],columns:[{dataField:"contact_name",caption:"Cliente"},{dataField:"contact_email",caption:"Correo"},{dataField:"contact_phone",caption:"Telefono"},{dataField:"client_status.id",caption:"ID estado cliente",visible:!1},{dataField:"client_status.name",caption:"Estado del cliente",dataType:"string",cellTemplate:(t,{data:n})=>{t.attr("style","display: flex; gap: 4px; overflow: unset"),b(t,e.createElement(I,{className:"btn btn-xs btn-white rounded-pill",title:n.client_status.name,icon:{icon:"fa fa-circle",color:n.client_status.color},tippy:"Actualizar estado"},c.map(({id:m,name:L,color:S})=>e.createElement(B,{key:m,onClick:()=>w(n.id,m)},e.createElement("i",{className:"fa fa-circle",style:{color:S}})," ",L))))}},{dataField:"source",caption:"Fuente",dataType:"string"},{dataField:"created_at",caption:"Fecha creacion",dataType:"datetime",cellTemplate:(t,{data:n})=>{t.text(moment(n.created_at).format("LL"))},sortOrder:"desc"},{caption:"Acciones",cellTemplate:(t,{data:n})=>{t.attr("style","display: flex; gap: 4px; overflow: unset"),b(t,e.createElement(_,{className:"btn btn-xs btn-soft-success",title:"Convertir en cliente",onClick:()=>w(n.id,12)},e.createElement("i",{className:"fa fa-user-plus"}))),b(t,e.createElement(_,{className:"btn btn-xs btn-soft-primary",title:"Ver lead",onClick:()=>N(n)},e.createElement("i",{className:"fa fa-comment"})))},allowFiltering:!1,allowExporting:!1}]}),e.createElement(g,{modalRef:v,title:`Lead de ${a==null?void 0:a.contact_name}`,onSubmit:t=>{t.preventDefault(),$(i.current).modal("hide")}},e.createElement("div",null,e.createElement("p",null,e.createElement("b",null,"Telefono"),": ",a==null?void 0:a.contact_phone),e.createElement("p",{className:"my-2"},e.createElement("b",null,"Correo"),": ",a==null?void 0:a.contact_email),e.createElement("b",null,"Mensaje"),":",e.createElement("p",{className:"mb-0"},a==null?void 0:a.message))),e.createElement(g,{modalRef:i,title:x?"Editar lead":"Nuevo lead",btnSubmitText:"Guardar",onSubmit:F},e.createElement("div",{className:"row mb-0"},e.createElement(r,{eRef:u,label:"Nombre completo",required:!0}),e.createElement(r,{eRef:d,label:"Correo electronico",col:"col-md-6",required:!0}),e.createElement(r,{eRef:f,label:"Telefono",col:"col-md-6",required:!0}),e.createElement(r,{eRef:p,label:"Empresa / Marca",col:"col-md-6"}),e.createElement(r,{eRef:E,label:"Link de WEB",col:"col-md-6"}),e.createElement(G,{eRef:R,label:"Mensaje",placeholder:"Ingresa tu mensaje",rows:4,required:!0}))))};D((c,o)=>{if(!o.can("leads","root","all","list"))return location.href="/";k(c).render(e.createElement(M,{...o,title:"Leads"},e.createElement(q,{...o})))});
