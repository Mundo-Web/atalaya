import{C as P,c as D,R as t,r as s}from"./CreateReactScript-BPb0oCFQ.js";import{A as C}from"./Adminto-DvH23jnX.js";import{T as G,R as i,M as v,I as N,a as f}from"./InputFormGroup-Dqe-63Hj.js";import{R as p}from"./RolesRest-DS1IxLG3.js";import{m as x}from"./index-BuvcFxz3.js";import{T as k}from"./TextareaFormGroup-Da32IrqJ.js";import{S as B,a as I}from"./SetSelectValue-CYfQh8-c.js";import{P as y}from"./PermissionsRest-DIPNL9vw.js";const M=()=>{const n=s.useRef(),a=s.useRef(),o=s.useRef(),l=s.useRef(),c=s.useRef(),m=s.useRef(),u=s.useRef(),d=s.useRef(),[g,R]=s.useState(!1),[E,w]=s.useState({}),b=e=>{e!=null&&e.id?R(!0):R(!1),m.current.value=(e==null?void 0:e.id)||null,u.current.value=(e==null?void 0:e.name)||null,d.current.value=(e==null?void 0:e.description)||null,$(a.current).modal("show")},S=async e=>{c.current.disabled=!0,w(e);const r=await y.byRole(e.id);c.current.disabled=!1,I(l.current,r,"id","name"),$(o.current).modal("show")},T=async e=>{e.preventDefault();const r={id:m.current.value||void 0,name:u.current.value,description:d.current.value};await p.save(r)&&($(n.current).dxDataGrid("instance").refresh(),$(a.current).modal("hide"))},F=async e=>{e.preventDefault();const r=$(l.current).val(),h={role_id:E.id,permissions:r};await y.massiveByRole(h)&&($(o.current).modal("hide"),$(n.current).dxDataGrid("instance").refresh())},A=async e=>{await p.delete(e)&&$(n.current).dxDataGrid("instance").refresh()};return t.createElement(t.Fragment,null,t.createElement(G,{gridRef:n,title:"Roles",rest:p,toolBar:e=>{e.unshift({widget:"dxButton",location:"after",options:{icon:"refresh",hint:"REFRESCAR TABLA",onClick:()=>$(n.current).dxDataGrid("instance").refresh()}}),e.unshift({widget:"dxButton",location:"after",options:{icon:"plus",hint:"NUEVO REGISTRO",onClick:()=>b()}})},columns:[{dataField:"id",caption:"ID",dataType:"number",sortOrder:"asc"},{dataField:"name",caption:"Rol"},{dataField:"description",caption:"Descripcion"},{dataField:"created_at",caption:"Fecha creacion",dataType:"date",cellTemplate:(e,{data:r})=>{i(e,t.createElement("span",null,x(r.created_at).format("LL")))}},{dataField:"updated_at",caption:"Fecha actualizacion",dataType:"date",cellTemplate:(e,{data:r})=>{i(e,t.createElement("span",null,x(r.updated_at).format("LL")))}},{caption:"Acciones",cellTemplate:(e,{data:r})=>{e.attr("style","display: flex; gap: 4px; overflow: unset"),i(e,t.createElement(f,{className:"btn btn-xs btn-soft-primary",title:"Editar",onClick:()=>b(r)},t.createElement("i",{className:"fa fa-pen"}))),i(e,t.createElement(f,{eRef:c,className:"btn btn-xs btn-soft-dark",title:"Modificar permisos",onClick:()=>S(r),"data-loading-text":'<i class="fa fa-spinner fa-spin"></i>'},t.createElement("i",{className:"fas fa-th-list"}))),i(e,t.createElement(f,{className:"btn btn-xs btn-soft-danger",title:"Eliminar",onClick:()=>A(r.id)},t.createElement("i",{className:"fa fa-trash-alt"})))},allowFiltering:!1,allowExporting:!1}]}),t.createElement(v,{modalRef:a,title:g?"Editar rol":"Agregar rol",onSubmit:T},t.createElement("div",{className:"row"},t.createElement("input",{ref:m,type:"hidden"}),t.createElement(N,{eRef:u,label:"Rol",col:"col-12",required:!0}),t.createElement(k,{eRef:d,label:"Descripcion",col:"col-12"}))),t.createElement(v,{modalRef:o,title:`Permisos para ${E.name}`,btnSubmitText:"Guardar",onSubmit:F},t.createElement("div",{id:"permissions-container",className:"row"},t.createElement(B,{eRef:l,label:"Permisos",col:"col-12",dropdownParent:"#permissions-container",searchAPI:"/api/permissions/paginate",searchBy:"name",required:!0,multiple:!0}))))};P((n,a)=>{D(n).render(t.createElement(C,{...a,title:"Roles"},t.createElement(M,{...a})))});