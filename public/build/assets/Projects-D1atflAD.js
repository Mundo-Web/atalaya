import{C as k,c as Y,R as t,r as l,m as G}from"./CreateReactScript-ClVaIZLH.js";import{T as M,R as n,a as i,M as I}from"./TippyButton-DUEDQthR.js";import{a as T,S as C}from"./SetSelectValue-CwDYwahQ.js";import{P as m,a as q,b as B}from"./ProjectStatusDropdown-CFwKjphx.js";import{A as V}from"./Adminto-C8NDZ_Au.js";import{I as c}from"./InputFormGroup-CCmG0Ohr.js";import{T as O}from"./TextareaFormGroup-D05xY0Ci.js";import"./Dropdown-PXhDuHvv.js";import"./DropdownItem-CGQ01ebz.js";const L=({statuses:u,can:s})=>{const o=l.useRef(),p=l.useRef(),f=l.useRef(),d=l.useRef(),b=l.useRef(),E=l.useRef(),g=l.useRef(),y=l.useRef(),R=l.useRef(),v=l.useRef(),h=l.useRef(),[_,x]=l.useState(!1),[A,N]=l.useState({}),w=e=>{var r,a,F,D;e!=null&&e.id?x(!0):x(!1),f.current.value=(e==null?void 0:e.id)||null,C(d.current,(r=e==null?void 0:e.client)==null?void 0:r.id,(a=e==null?void 0:e.client)==null?void 0:a.name),C(b.current,(F=e==null?void 0:e.type)==null?void 0:F.id,(D=e==null?void 0:e.type)==null?void 0:D.name),E.current.value=(e==null?void 0:e.name)||null,g.current.value=(e==null?void 0:e.description)||null,y.current.value=e==null?void 0:e.cost,R.current.value=e!=null&&e.sign_at?moment(e.sign_at).format("YYYY-MM-DD"):null,v.current.value=e!=null&&e.starts_at?moment(e.starts_at).format("YYYY-MM-DD"):null,h.current.value=e!=null&&e.ends_at?moment(e.ends_at).format("YYYY-MM-DD"):null,$(p.current).modal("show")},j=async e=>{e.preventDefault();const r={id:f.current.value||void 0,client_id:d.current.value,type_id:b.current.value,name:E.current.value,description:g.current.value,cost:y.current.value??void 0,sign_at:R.current.value??void 0,starts_at:v.current.value,ends_at:h.current.value};await m.save(r)&&($(o.current).dxDataGrid("instance").refresh(),$(p.current).modal("hide"))},S=async({id:e,status:r})=>{await m.status({id:e,status:r})&&$(o.current).dxDataGrid("instance").refresh()},P=async e=>{await m.delete(e)&&$(o.current).dxDataGrid("instance").refresh()};return t.createElement(t.Fragment,null,t.createElement(M,{gridRef:o,title:"Proyectos",rest:m,toolBar:e=>{e.unshift({widget:"dxButton",location:"after",options:{icon:"refresh",hint:"REFRESCAR TABLA",onClick:()=>$(o.current).dxDataGrid("instance").refresh()}}),s("projects","root","all","create")&&e.unshift({widget:"dxButton",location:"after",options:{icon:"plus",hint:"NUEVO REGISTRO",onClick:()=>w()}})},filterValue:void 0,columns:[{dataField:"id",caption:"ID",dataType:"number",sortOrder:"asc"},{dataField:"client.name",caption:"Cliente",filterValue:G.GET.client||void 0},{dataField:"type.name",caption:"Tipo"},{dataField:"name",caption:"Proyecto"},{dataField:"cost",caption:"Costo",dataType:"number",width:150,cellTemplate:(e,{data:r})=>{const a=(r.total_payments/r.cost*100).toFixed(2);n(e,t.createElement(t.Fragment,null,t.createElement("p",{className:"mb-1 d-flex justify-content-between"},t.createElement("span",null,"S/.",Number(r.total_payments).toFixed(2)),t.createElement("b",{className:"float-end"},"S/.",Number(r.cost).toFixed(2))),t.createElement("div",{className:"progress progress-bar-alt-primary progress-sm mt-0 mb-0"},t.createElement("div",{className:"progress-bar bg-primary progress-animated wow animated animated",role:"progressbar","aria-valuenow":r.total_payments,"aria-valuemin":"0","aria-valuemax":r.cost,style:{width:`${a}%`,visibility:"visible",animationName:"animationProgress"}}))))}},{dataField:"status_id",caption:"ID estado proyecto"},s("projects","root","all","changestatus")&&{dataField:"project_status.name",caption:"Estado del proyecto",dataType:"string",cellTemplate:(e,{data:r})=>{e.attr("style","overflow: visible"),n(e,t.createElement(B,{can:s,statuses:u,data:r,onChange:()=>{$(o.current).dxDataGrid("instance").refresh()}}))}},{dataField:"status",caption:"Estado",dataType:"boolean",cellTemplate:(e,{data:r})=>{switch(r.status){case 1:n(e,t.createElement("span",{className:"badge bg-success rounded-pill"},"Activo"));break;case 0:n(e,t.createElement("span",{className:"badge bg-danger rounded-pill"},"Inactivo"));break;default:n(e,t.createElement("span",{className:"badge bg-dark rounded-pill"},"Eliminado"));break}}},{caption:"Acciones",width:"max-content",cellTemplate:(e,{data:r})=>{e.attr("style","display: flex; gap: 4px; overflow: visible"),s("projects","root","all","update")&&n(e,t.createElement(i,{className:"btn btn-xs btn-soft-primary",title:"Editar",onClick:()=>w(r)},t.createElement("i",{className:"fa fa-pen"}))),s("projects","root","all","addpayments")&&n(e,t.createElement(i,{className:"btn btn-xs btn-soft-success",title:"Ver/Agregar pagos",onClick:()=>N(r)},t.createElement("i",{className:"fas fa-money-check-alt"}))),s("projects","root","all","update")&&n(e,t.createElement(i,{className:"btn btn-xs btn-light",title:r.status===null?"Restaurar":"Cambiar estado",onClick:()=>S(r)},r.status===1?t.createElement("i",{className:"fa fa-toggle-on text-success"}):r.status===0?t.createElement("i",{className:"fa fa-toggle-off text-danger"}):t.createElement("i",{className:"fas fa-trash-restore"}))),s("projects","root","all","delete")&&n(e,t.createElement(i,{className:"btn btn-xs btn-soft-danger",title:"Eliminar",onClick:()=>P(r.id)},t.createElement("i",{className:"fa fa-trash-alt"})))},allowFiltering:!1,allowExporting:!1}]}),t.createElement(I,{modalRef:p,title:_?"Editar proyecto":"Agregar proyecto",onSubmit:j},t.createElement("div",{className:"row",id:"project-crud-container"},t.createElement("input",{ref:f,type:"hidden"}),t.createElement(T,{eRef:d,label:"Cliente",col:"col-12",dropdownParent:"#project-crud-container",searchAPI:"/api/clients/paginate",searchBy:"name",required:!0}),t.createElement(T,{eRef:b,label:"Tipo del proyecto",col:"col-md-4",dropdownParent:"#project-crud-container",searchAPI:"/api/types/paginate",searchBy:"name",filter:["table_id","=",1],required:!0}),t.createElement(c,{eRef:E,label:"Nombre del proyecto",col:"col-md-8",required:!0}),t.createElement(O,{eRef:g,label:"Descripcion del proyecto",col:"col-12"}),t.createElement(c,{eRef:y,label:"Costo",col:"col-md-6",type:"number",required:!0}),t.createElement(c,{eRef:R,label:"Fecha firma",col:"col-md-6",type:"date"}),t.createElement(c,{eRef:v,label:"Fecha inicio",col:"col-md-6",type:"date",required:!0}),t.createElement(c,{eRef:h,label:"Fecha fin",col:"col-md-6",type:"date",required:!0}))),t.createElement(q,{can:s,dataLoaded:A,setDataLoaded:N,grid2refresh:$(o.current).dxDataGrid("instance")}))};k((u,s)=>{if(!s.can("projects","root","all","list"))return location.href="/";Y(u).render(t.createElement(V,{...s,title:"Proyectos"},t.createElement(L,{...s})))});
