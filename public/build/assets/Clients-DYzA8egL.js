import{C as B,c as P,R as t,r as a}from"./CreateReactScript-BhyNrTql.js";import{A as q}from"./Adminto-CZYR29n7.js";import{T as z,R as r,a as i,M as O}from"./TippyButton-BgjyXFhh.js";import{I as u}from"./InputFormGroup-CvKM2mq1.js";import{C as p}from"./ClientsRest-Dz_iv-eE.js";import{T as C}from"./TextareaFormGroup-DY00xL1h.js";import{P as U,a as V}from"./PaymentModal-D32Jnul1.js";const W=({can:c})=>{const o=a.useRef(),f=a.useRef(),b=a.useRef(),g=a.useRef(),E=a.useRef(),R=a.useRef(),v=a.useRef(),y=a.useRef(),h=a.useRef(),x=a.useRef(),N=a.useRef(),w=a.useRef(),[_,T]=a.useState(!1),[j,F]=a.useState({}),[k,D]=a.useState({}),G=e=>{e!=null&&e.id?T(!0):T(!1),b.current.value=(e==null?void 0:e.id)||null,g.current.value=(e==null?void 0:e.ruc)||null,E.current.value=(e==null?void 0:e.name)||null,R.current.value=(e==null?void 0:e.weburl)||null,v.current.value=(e==null?void 0:e.message)||"Cliente creado desde Atalaya",y.current.value=(e==null?void 0:e.description)||null,h.current.value=(e==null?void 0:e.contact_name)||null,x.current.value=(e==null?void 0:e.contact_phone)||null,N.current.value=(e==null?void 0:e.contact_email)||null,w.current.value=(e==null?void 0:e.contact_address)||null,$(f.current).modal("show")},S=async e=>{e.preventDefault();const l={id:b.current.value||void 0,ruc:g.current.value,name:E.current.value,web_url:R.current.value,message:v.current.value??"Cliente creado desde Atalaya",description:y.current.value??"",contact_name:h.current.value??"",contact_phone:x.current.value??"",contact_email:N.current.value??"",contact_address:w.current.value??""};await p.save(l)&&($(o.current).dxDataGrid("instance").refresh(),$(f.current).modal("hide"))},I=async({id:e,status:l})=>{await p.status({id:e,status:l})&&$(o.current).dxDataGrid("instance").refresh()},L=async e=>{await p.delete(e)&&$(o.current).dxDataGrid("instance").refresh()};return t.createElement(t.Fragment,null,t.createElement(z,{gridRef:o,title:"Clientes",rest:p,toolBar:e=>{e.unshift({widget:"dxButton",location:"after",options:{icon:"refresh",hint:"REFRESCAR TABLA",onClick:()=>$(o.current).dxDataGrid("instance").refresh()}})},filterValue:["status_id","=",12],columns:[c("projects","root","all","list")?{dataField:"id",caption:"ID",dataType:"number",cellTemplate:(e,{data:l,value:d,...m})=>{r(e,t.createElement(i,{className:"btn btn-xs btn-white",title:`Ver ${l.projects} proyectos`,onClick:()=>{m.component.collapseAll(-1),m.component.expandRow(m.row.data)}},t.createElement("i",{className:"fas fa-shapes"})," ",l.projects))},sortOrder:"desc"}:null,{dataField:"ruc",caption:"RUC"},{dataField:"name",caption:"Razon social"},{dataField:"contact_phone",caption:"Telefono"},{dataField:"contact_email",caption:"Correo"},{dataField:"status_id",caption:"ID estado cliente",dataType:"boolean",visible:!1},{dataField:"status",caption:"Estado",dataType:"boolean",cellTemplate:(e,{data:l})=>{switch(l.status){case 1:r(e,t.createElement("span",{className:"badge bg-success rounded-pill"},"Activo"));break;case 0:r(e,t.createElement("span",{className:"badge bg-danger rounded-pill"},"Inactivo"));break;default:r(e,t.createElement("span",{className:"badge bg-dark rounded-pill"},"Eliminado"));break}}},c("projects","root","all","list","update","changestatus","delete")?{caption:"Acciones",cellTemplate:(e,{data:l})=>{e.attr("style","display: flex; gap: 4px; overflow: unset"),c("projects","root","all","list")&&r(e,t.createElement(i,{className:"btn btn-xs btn-soft-dark",title:`Ver ${l.projects} proyectos en una nueva ventana`,onClick:()=>location.href=`/projects/?client=${l.name}`},t.createElement("i",{className:"mdi mdi-page-next"}))),c("clients","root","all","update")&&r(e,t.createElement(i,{className:"btn btn-xs btn-soft-primary",title:"Editar",onClick:()=>G(l)},t.createElement("i",{className:"fa fa-pen"}))),c("clients","root","all","changestatus")&&r(e,t.createElement(i,{className:"btn btn-xs btn-light",title:l.status===null?"Restaurar":"Cambiar estado",onClick:()=>I(l)},l.status===1?t.createElement("i",{className:"fa fa-toggle-on text-success"}):l.status===0?t.createElement("i",{className:"fa fa-toggle-off text-danger"}):t.createElement("i",{className:"fas fa-trash-restore"}))),c("clients","root","all","delete")&&r(e,t.createElement(i,{className:"btn btn-xs btn-soft-danger",title:"Eliminar",onClick:()=>L(l.id)},t.createElement("i",{className:"fa fa-trash-alt"})))},allowFiltering:!1,allowExporting:!1}:null],masterDetail:{enabled:!1,template:async(e,{data:l,component:d})=>{e.css("padding","10px");let{data:m}=await U.paginate({filter:["client_id","=",l.id],isLoadingAll:!0});const M=$("<div>").appendTo(e).dxDataGrid({dataSource:m,onToolbarPreparing:n=>{n.toolbarOptions.items.unshift({widget:"dxButton",location:"after",options:{icon:"fa fa-times",hint:"CERRAR TABLA",onClick:A=>{d.collapseAll(-1)}}})},columns:[{dataField:"id",caption:"ID",dataType:"number",sortOrder:"asc"},{dataField:"type.name",caption:"Tipo"},{dataField:"name",caption:"Proyecto"},{dataField:"cost",caption:"Costo",dataType:"number",width:150,cellTemplate:(n,{data:s})=>{const A=(s.total_payments/s.cost*100).toFixed(2);r(n,t.createElement(t.Fragment,null,t.createElement("p",{className:"mb-1 d-flex justify-content-between"},t.createElement("span",null,"S/.",Number(s.total_payments).toFixed(2)),t.createElement("b",{className:"float-end"},"S/.",Number(s.cost).toFixed(2))),t.createElement("div",{className:"progress progress-bar-alt-primary progress-sm mt-0 mb-0"},t.createElement("div",{className:"progress-bar bg-primary progress-animated wow animated animated",role:"progressbar","aria-valuenow":s.total_payments,"aria-valuemin":"0","aria-valuemax":s.cost,style:{width:`${A}%`,visibility:"visible",animationName:"animationProgress"}}))))}},c("projects","root","all","changestatus")&&{dataField:"project_status.name",caption:"Estado del proyecto",dataType:"string",cellTemplate:(n,{data:s})=>{n.attr("style","display: flex; gap: 4px; overflow: unset"),r(n,t.createElement(t.Fragment,null,t.createElement("i",{className:"fa fa-circle",style:{color:s.project_status.color}})," ",s.project_status.name))}},{dataField:"status",caption:"Estado",dataType:"boolean",cellTemplate:(n,{data:s})=>{switch(s.status){case 1:r(n,t.createElement("span",{className:"badge bg-success rounded-pill"},"Activo"));break;case 0:r(n,t.createElement("span",{className:"badge bg-danger rounded-pill"},"Inactivo"));break;default:r(n,t.createElement("span",{className:"badge bg-dark rounded-pill"},"Eliminado"));break}}},{caption:"Acciones",cellTemplate:(n,{data:s})=>{n.attr("style","display: flex; gap: 4px; overflow: unset"),c("projects","root","all","addpayments")&&r(n,t.createElement(i,{className:"btn btn-xs btn-soft-success",title:"Ver/Agregar pagos",onClick:()=>F(s)},t.createElement("i",{className:"fas fa-money-check-alt"})))},allowFiltering:!1,allowExporting:!1}],allowColumnResizing:!0,columnResizingMode:"widget",columnAutoWidth:!0,showBorders:!0,columnChooser:{title:"Mostrar/Ocultar columnas",enabled:!0,mode:"select",search:{enabled:!0}}});D(M.dxDataGrid("instance"))}}}),t.createElement(O,{modalRef:f,title:_?"Editar cliente":"Agregar cliente",onSubmit:S,size:"md"},t.createElement("div",{className:"row"},t.createElement("input",{ref:b,type:"hidden"}),t.createElement(u,{eRef:g,label:"RUC",col:"col-4",required:!0}),t.createElement(u,{eRef:E,label:"Razon social",col:"col-8",required:!0}),t.createElement(u,{eRef:R,label:"URL Web",col:"col-12",required:!0}),t.createElement(C,{eRef:v,label:"Mensaje",col:"col-12",required:!0}),t.createElement(C,{eRef:y,label:"Descripcion",col:"col-12"}),t.createElement("div",{className:"col-12"},t.createElement("hr",{className:"my-1"})),t.createElement(u,{eRef:h,label:"Nombre de contacto",col:"col-6"}),t.createElement(u,{eRef:x,label:"Celular de contacto",col:"col-6"}),t.createElement(u,{eRef:N,label:"Email de contacto",col:"col-12",type:"email"}),t.createElement(C,{eRef:w,label:"Direccion de contacto",col:"col-12"}))),t.createElement(V,{dataLoaded:j,setDataLoaded:F,grid2refresh:k}))};B((c,o)=>{if(!o.can("clients","root","all","list"))return location.href="/";P(c).render(t.createElement(q,{...o,title:"Clientes"},t.createElement(W,{...o})))});
