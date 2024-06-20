import{C as I,c as O,R as t,r as l}from"./CreateReactScript-BZNFBiYC.js";import{T as j,R as r,a as o,M as k}from"./TippyButton-CXoeVxny.js";import{C as u,a as q}from"./ClientNotesModal-CgMVCZ3y.js";import{A as V,i as U,S}from"./Adminto-98sYPb9M.js";import{I as d}from"./InputFormGroup-BUOjBXeO.js";import{T as z}from"./TextareaFormGroup-Ch_FAxDs.js";import{D as P}from"./Dropdown-iYxaCZOA.js";import{D as W}from"./DropdownItem-mg3Fv28F.js";import"./SetSelectValue-TcZeamg_.js";import"./DropdownEnd-BGPgPEIS.js";const H=({statuses:p,session:m,can:c})=>{const i=l.useRef(),C=l.useRef(),f=l.useRef(),E=l.useRef(),b=l.useRef(),g=l.useRef(),h=l.useRef(),R=l.useRef(),w=l.useRef(),v=l.useRef(),[F,_]=l.useState(!1),[a,B]=l.useState({}),[D,x]=l.useState({}),N=e=>{e!=null&&e.id?_(!0):_(!1),E.current.value=(e==null?void 0:e.id)??"",b.current.value=(e==null?void 0:e.contact_name)??"",g.current.value=(e==null?void 0:e.contact_email)??"",h.current.value=(e==null?void 0:e.contact_phone)??"",R.current.value=(e==null?void 0:e.name)??"",w.current.value=(e==null?void 0:e.web_url)??"",v.current.value=(e==null?void 0:e.message)??"",$(f.current).modal("show")},L=async e=>{e.preventDefault();const n={id:E.current.value,contact_name:b.current.value,contact_email:g.current.value,contact_phone:h.current.value,name:R.current.value,web_url:w.current.value,message:v.current.value,client_width:window.screen.width,client_height:window.screen.height,client_system:navigator.platform??"Linux"};await u.save(n)&&($(i.current).dxDataGrid("instance").refresh(),$(f.current).modal("hide"))},A=e=>{B(e),$(C.current).modal("show")},y=async(e,n)=>{await u.clientStatus(e,n)&&$(i.current).dxDataGrid("instance").refresh()},T=async(e,n)=>{await u.assign(e,n)&&$(i.current).dxDataGrid("instance").refresh()};return t.createElement(t.Fragment,null,t.createElement(j,{gridRef:i,title:"Leads",rest:u,toolBar:e=>{e.unshift({widget:"dxButton",location:"after",options:{icon:"refresh",hint:"REFRESCAR TABLA",onClick:()=>$(i.current).dxDataGrid("instance").refresh()}}),c("leads","root","all","create")&&e.unshift({widget:"dxButton",location:"after",options:{icon:"plus",hint:"NUEVO REGISTRO",onClick:()=>N()}})},filterValue:["client_status.id","<>",12],columns:[{dataField:"contact_name",caption:"Cliente",width:250,cellTemplate:(e,{data:n})=>{r(e,t.createElement("div",{className:"d-flex align-items-center"},t.createElement("div",null,n.contact_name),n.user_assigned.id&&t.createElement(U,{content:`Atendido por ${n.user_assigned.name} ${n.user_assigned.lastname}`},t.createElement("img",{className:"avatar-xs rounded-circle ms-1",src:`/api/profile/thumbnail/${n.user_assigned.relative_id}`,alt:n.user_assigned.name}))))}},{dataField:"contact_email",caption:"Correo"},{dataField:"contact_phone",caption:"Telefono"},{dataField:"client_status.id",caption:"ID estado cliente",visible:!1},c("leads","root","all","changestatus")?{dataField:"client_status.name",caption:"Estado del cliente",dataType:"string",cellTemplate:(e,{data:n})=>{e.attr("style","overflow: visible"),r(e,t.createElement(P,{className:"btn btn-xs btn-white rounded-pill",title:n.client_status.name,icon:{icon:"fa fa-circle",color:n.client_status.color},tippy:"Actualizar estado"},p.map(({id:s,name:G,color:M})=>t.createElement(W,{key:s,onClick:()=>y(n.id,s)},t.createElement("i",{className:"fa fa-circle",style:{color:M}})," ",G))))}}:null,{dataField:"source",caption:"Fuente",dataType:"string"},{dataField:"created_at",caption:"Fecha creacion",dataType:"datetime",cellTemplate:(e,{data:n})=>{e.text(moment(n.created_at).format("lll"))},sortOrder:"desc"},{caption:"Acciones",width:240,cellTemplate:(e,{data:n})=>{e.attr("style","display: flex; gap: 4px; overflow: visible"),c("leads","root","all","update")&&r(e,t.createElement(o,{className:"btn btn-xs btn-soft-primary",title:"Editar lead",onClick:()=>N(n)},t.createElement("i",{className:"fa fa-pen"}))),n.user_assigned.id?n.user_assigned.id==m.id&&r(e,t.createElement(o,{className:"btn btn-xs btn-soft-danger",title:"Dejar de atender",onClick:()=>T(n.id,!1)},t.createElement("i",{className:"fas fa-hands-wash"}))):r(e,t.createElement(o,{className:"btn btn-xs btn-soft-dark",title:"Atender lead",onClick:()=>T(n.id,!0)},t.createElement("i",{className:"fas fa-hands-helping"}))),c("leads","root","all","movetoclient")&&r(e,t.createElement(o,{className:"btn btn-xs btn-soft-success",title:"Convertir en cliente",onClick:async()=>{const{isConfirmed:s}=await S.fire({title:"Estas seguro?",text:`${n.contact_name} pasara a ser un cliente!`,icon:"warning",showCancelButton:!0,confirmButtonText:"Continuar",cancelButtonText:"Cancelar"});s&&y(n.id,12)}},t.createElement("i",{className:"fa fa-user-plus"}))),c("leads","root","all","addnotes")&&r(e,t.createElement(o,{className:"btn btn-xs btn-soft-primary position-relative",title:"Ver/Agregar notas",onClick:()=>x(n)},t.createElement("i",{className:"fas fa-sticky-note"}),n.notes>0&&t.createElement("span",{className:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"},n.notes,t.createElement("span",{className:"visually-hidden"},"Notas de ",n.name)))),r(e,t.createElement(o,{className:"btn btn-xs btn-soft-info",title:"Ver lead",onClick:()=>A(n)},t.createElement("i",{className:"fa fa-comment"}))),c("leads","root","all","delete")&&r(e,t.createElement(o,{className:"btn btn-xs btn-soft-danger",title:"Eliminar lead",onClick:async()=>{const{isConfirmed:s}=await S.fire({title:"Estas seguro de eliminar este lead?",text:"No podras revertir esta accion!",icon:"warning",showCancelButton:!0,confirmButtonText:"Continuar",cancelButtonText:"Cancelar"});s&&(await u.delete(n.id),$(i.current).dxDataGrid("instance").refresh())}},t.createElement("i",{className:"fa fa-trash"})))},allowFiltering:!1,allowExporting:!1}]}),t.createElement(k,{modalRef:C,title:`Lead de ${a==null?void 0:a.contact_name}`,onSubmit:e=>{e.preventDefault(),$(f.current).modal("hide")},hideButtonSubmit:!0},t.createElement("div",null,t.createElement("p",null,t.createElement("b",null,"Telefono"),": ",a==null?void 0:a.contact_phone),t.createElement("p",{className:"my-2"},t.createElement("b",null,"Correo"),": ",a==null?void 0:a.contact_email),t.createElement("b",null,"Mensaje"),":",t.createElement("p",{className:"mb-0"},a==null?void 0:a.message))),t.createElement(k,{modalRef:f,title:F?"Editar lead":"Nuevo lead",btnSubmitText:"Guardar",onSubmit:L},t.createElement("div",{className:"row mb-0"},t.createElement("input",{ref:E,type:"hidden"}),t.createElement(d,{eRef:b,label:"Nombre completo",required:!0}),t.createElement(d,{eRef:g,label:"Correo electronico",type:"email",col:"col-md-6"}),t.createElement(d,{eRef:h,label:"Telefono",type:"tel",col:"col-md-6",required:!0}),t.createElement(d,{eRef:R,label:"Empresa / Marca",col:"col-md-6"}),t.createElement(d,{eRef:w,label:"Link de WEB",col:"col-md-6"}),t.createElement(z,{eRef:v,label:"Mensaje",placeholder:"Ingresa tu mensaje",rows:4,required:!0}))),t.createElement(q,{can:c,client:D,setClient:x,grid2refresh:i,page:"leads"}))};I((p,m)=>{if(!m.can("leads","root","all","list"))return location.href="/";O(p).render(t.createElement(V,{...m,title:"Leads"},t.createElement(H,{...m})))});
