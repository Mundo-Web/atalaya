import{C as j,c as Y,R as t,r as n,m as k}from"./CreateReactScript-BZNFBiYC.js";import{T as M,R as l,M as B,a as x}from"./TippyButton-BXoofhyJ.js";import{a as _,S as D}from"./SetSelectValue-TcZeamg_.js";import{P as w}from"./ProjectsRest-Ct6mlSHF.js";import{A as G,S as I}from"./Adminto-ePd2h6in.js";import{I as c}from"./InputFormGroup-BUOjBXeO.js";import{T as L}from"./TextareaFormGroup-Ch_FAxDs.js";import{P as q,a as V}from"./ProjectStatusDropdown-DiIbkYQq.js";import{N as O}from"./Number2Currency-e57Tgsuk.js";import"./Dropdown-NV6AOgpq.js";import"./DropdownItem-mg3Fv28F.js";const U=({statuses:u,can:a})=>{const o=n.useRef(),p=n.useRef(),f=n.useRef(),d=n.useRef(),b=n.useRef(),g=n.useRef(),E=n.useRef(),y=n.useRef(),R=n.useRef(),v=n.useRef(),h=n.useRef(),[S,F]=n.useState(!1),[C,T]=n.useState({}),N=e=>{var r,s,i,m;e!=null&&e.id?F(!0):F(!1),f.current.value=(e==null?void 0:e.id)||null,D(d.current,(r=e==null?void 0:e.client)==null?void 0:r.id,(s=e==null?void 0:e.client)==null?void 0:s.name),D(b.current,(i=e==null?void 0:e.type)==null?void 0:i.id,(m=e==null?void 0:e.type)==null?void 0:m.name),g.current.value=(e==null?void 0:e.name)||null,E.current.value=(e==null?void 0:e.description)||null,y.current.value=e==null?void 0:e.cost,R.current.value=e!=null&&e.sign_at?moment(e.sign_at).format("YYYY-MM-DD"):null,v.current.value=e!=null&&e.starts_at?moment(e.starts_at).format("YYYY-MM-DD"):null,h.current.value=e!=null&&e.ends_at?moment(e.ends_at).format("YYYY-MM-DD"):null,$(p.current).modal("show")},A=async e=>{e.preventDefault();const r={id:f.current.value||void 0,client_id:d.current.value,type_id:b.current.value,name:g.current.value,description:E.current.value,cost:y.current.value??void 0,sign_at:R.current.value??void 0,starts_at:v.current.value,ends_at:h.current.value};await w.save(r)&&($(o.current).dxDataGrid("instance").refresh(),$(p.current).modal("hide"))},P=async e=>{const{isConfirmed:r}=await I.fire({title:"Estas seguro?",text:"Esta acción no se puede deshacer",icon:"warning",showCancelButton:!0,confirmButtonText:"Continuar",cancelButtonText:"Cancelar"});!r||!await w.delete(e)||$(o.current).dxDataGrid("instance").refresh()};return t.createElement(t.Fragment,null,t.createElement(M,{gridRef:o,title:"Proyectos",rest:w,toolBar:e=>{e.unshift({widget:"dxButton",location:"after",options:{icon:"refresh",hint:"REFRESCAR TABLA",onClick:()=>$(o.current).dxDataGrid("instance").refresh()}}),a("projects","root","all","create")&&e.unshift({widget:"dxButton",location:"after",options:{icon:"plus",hint:"NUEVO REGISTRO",onClick:()=>N()}})},filterValue:void 0,columns:[{dataField:"id",caption:"ID",dataType:"number",sortOrder:"asc"},{dataField:"client.tradename",caption:"Nombre comercial",filterValue:k.GET.client||void 0},{dataField:"type.name",caption:"Tipo"},{dataField:"name",caption:"Proyecto",visible:!1},{dataField:"cost",caption:"Costo",dataType:"number",cellTemplate:(e,{data:r})=>{e.text(`S/. ${O(r.cost)}`)}},{dataField:"remaining_amount",caption:"Pagos",dataType:"number",width:225,cellTemplate:(e,{data:r})=>{const s=(r.total_payments/r.cost*100).toFixed(2),i=Number(r.total_payments).toLocaleString("en-US",{maximumFractionDigits:2,minimumFractionDigits:2}),m=Number(r.cost-r.total_payments).toLocaleString("en-US",{maximumFractionDigits:2,minimumFractionDigits:2});l(e,t.createElement(t.Fragment,null,t.createElement("p",{className:"mb-0 d-flex justify-content-between"},t.createElement("b",{className:"text-success"},t.createElement("i",{className:"fa fa-arrow-circle-up"})," S/. ",i),t.createElement("b",{className:"float-end text-danger"},t.createElement("i",{className:"fa fa-arrow-circle-down"})," S/. ",m)),t.createElement("div",{className:"progress progress-bar-alt-primary progress-sm mt-0 mb-0"},t.createElement("div",{className:"progress-bar bg-primary progress-animated wow animated animated",role:"progressbar","aria-valuenow":r.total_payments,"aria-valuemin":"0","aria-valuemax":r.cost,style:{width:`${s}%`,visibility:"visible",animationName:"animationProgress"}}))))}},{dataField:"starts_at",caption:"Fecha de inicio",dataType:"date",cellTemplate:(e,{data:r})=>{e.text(moment(r.starts_at).format("LL"))}},{dataField:"ends_at",caption:"Fecha de finalización",dataType:"date",cellTemplate:(e,{data:r})=>{e.text(moment(r.ends_at).format("LL"))}},a("projects","root","all","changestatus")?{dataField:"project_status.name",caption:"Estado del proyecto",dataType:"string",cellTemplate:(e,{data:r})=>{e.attr("style","overflow: visible"),l(e,t.createElement(V,{can:a,statuses:u,data:r,onChange:()=>{$(o.current).dxDataGrid("instance").refresh()}}))}}:null,{dataField:"status",caption:"Estado",dataType:"boolean",visible:!1,cellTemplate:(e,{data:r})=>{switch(r.status){case 1:l(e,t.createElement("span",{className:"badge bg-success rounded-pill"},"Activo"));break;case 0:l(e,t.createElement("span",{className:"badge bg-danger rounded-pill"},"Inactivo"));break;default:l(e,t.createElement("span",{className:"badge bg-dark rounded-pill"},"Eliminado"));break}}},{caption:"Acciones",width:175,cellTemplate:(e,{data:r})=>{e.attr("style","display: flex; gap: 4px;"),a("projects","root","all","update")&&l(e,t.createElement(x,{className:"btn btn-xs btn-soft-primary",title:"Editar",onClick:()=>N(r)},t.createElement("i",{className:"fa fa-pen"}))),a("projects","root","all","addpayment")&&l(e,t.createElement(x,{className:"btn btn-xs btn-soft-success",title:"Ver/Agregar pagos",onClick:()=>T(r)},t.createElement("i",{className:"fas fa-money-check-alt"}))),a("projects","root","all","delete")&&l(e,t.createElement(x,{className:"btn btn-xs btn-soft-danger",title:"Eliminar",onClick:()=>P(r.id)},t.createElement("i",{className:"fa fa-trash-alt"})))},allowFiltering:!1,allowExporting:!1}]}),t.createElement(B,{modalRef:p,title:S?"Editar proyecto":"Agregar proyecto",onSubmit:A},t.createElement("div",{className:"row",id:"project-crud-container"},t.createElement("input",{ref:f,type:"hidden"}),t.createElement(_,{eRef:d,label:"Cliente",col:"col-12",dropdownParent:"#project-crud-container",searchAPI:"/api/clients/paginate",searchBy:"name",required:!0}),t.createElement(_,{eRef:b,label:"Tipo del proyecto",col:"col-md-4",dropdownParent:"#project-crud-container",searchAPI:"/api/types/paginate",searchBy:"name",filter:["table_id","=",1],required:!0}),t.createElement(c,{eRef:g,label:"Nombre del proyecto",col:"col-md-8",required:!0}),t.createElement(L,{eRef:E,label:"Descripcion del proyecto",col:"col-12"}),t.createElement(c,{eRef:y,label:"Costo",col:"col-md-6",type:"number",step:.01,required:!0}),t.createElement(c,{eRef:R,label:"Fecha firma",col:"col-md-6",type:"date"}),t.createElement(c,{eRef:v,label:"Fecha inicio",col:"col-md-6",type:"date",required:!0}),t.createElement(c,{eRef:h,label:"Fecha fin",col:"col-md-6",type:"date",required:!0}))),t.createElement(q,{can:a,dataLoaded:C,setDataLoaded:T,grid2refresh:$(o.current).dxDataGrid("instance")}))};j((u,a)=>{if(!a.can("projects","root","all","list"))return location.href="/";Y(u).render(t.createElement(G,{...a,title:"Proyectos"},t.createElement(U,{...a})))});