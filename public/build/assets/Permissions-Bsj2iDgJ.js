import{C as b,c as T,R as t,r as a}from"./CreateReactScript-BhyNrTql.js";import{A as g}from"./Adminto-CZYR29n7.js";import{T as v,R as s,M as x,a as E}from"./TippyButton-BgjyXFhh.js";import{I as F}from"./InputFormGroup-CvKM2mq1.js";import{P as u}from"./PermissionsRest-CAz9QCRf.js";import{T as y}from"./TextareaFormGroup-DY00xL1h.js";const w=({can:l})=>{const n=a.useRef(),o=a.useRef(),i=a.useRef(),c=a.useRef(),m=a.useRef(),[d,p]=a.useState(!1),f=e=>{e!=null&&e.id?p(!0):p(!1),i.current.value=(e==null?void 0:e.id)||null,c.current.value=(e==null?void 0:e.name)||null,m.current.value=(e==null?void 0:e.description)||null,$(o.current).modal("show")},R=async e=>{e.preventDefault();const r={id:i.current.value||void 0,name:c.current.value,description:m.current.value};await u.save(r)&&($(n.current).dxDataGrid("instance").refresh(),$(o.current).modal("hide"))},h=async e=>{await u.delete(e)&&$(n.current).dxDataGrid("instance").refresh()};return t.createElement(t.Fragment,null,t.createElement(v,{gridRef:n,title:"Permisos",rest:u,toolBar:e=>{e.unshift({widget:"dxButton",location:"after",options:{icon:"refresh",hint:"REFRESCAR TABLA",onClick:()=>$(n.current).dxDataGrid("instance").refresh()}}),l("permissions","root","all","create")&&e.unshift({widget:"dxButton",location:"after",options:{icon:"plus",hint:"NUEVO REGISTRO",onClick:()=>f()}})},columns:[{dataField:"id",caption:"ID",dataType:"number",sortOrder:"asc"},{dataField:"name",caption:"Permiso"},{dataField:"description",caption:"Descripcion"},{dataField:"created_at",caption:"Fecha creacion",dataType:"date",cellTemplate:(e,{data:r})=>{s(e,t.createElement("span",null,moment(r.created_at).format("LL")))}},{dataField:"updated_at",caption:"Fecha actualizacion",dataType:"date",cellTemplate:(e,{data:r})=>{s(e,t.createElement("span",null,moment(r.updated_at).format("LL")))}},l("permissions","root","all","update","delete")?{caption:"Acciones",cellTemplate:(e,{data:r})=>{e.attr("style","display: flex; gap: 4px; overflow: unset"),l("permissions","root","all","update")&&s(e,t.createElement(E,{className:"btn btn-xs btn-soft-primary",title:"Editar",onClick:()=>f(r)},t.createElement("i",{className:"fa fa-pen"}))),l("permissions","root","all","delete")&&s(e,t.createElement(E,{className:"btn btn-xs btn-soft-danger",title:"Eliminar",onClick:()=>h(r.id)},t.createElement("i",{className:"fa fa-trash-alt"})))},allowFiltering:!1,allowExporting:!1}:null]}),t.createElement(x,{modalRef:o,title:d?"Editar permiso":"Agregar permiso",onSubmit:R},t.createElement("div",{className:"row"},t.createElement("p",null,"Intenta con el formato ",t.createElement("code",null,"ventana.permiso"),". Ej: ",t.createElement("code",null,"clients.create"),", ",t.createElement("code",null,"clients.read"),", ",t.createElement("code",null,"clients.update"),", ",t.createElement("code",null,"clients.delete")),t.createElement("input",{ref:i,type:"hidden"}),t.createElement(F,{eRef:c,label:"Permiso",col:"col-12",required:!0,disabled:d}),t.createElement(y,{eRef:m,label:"Descripcion",col:"col-12"}))))};b((l,n)=>{if(!n.can("permissions","root","all","list"))return location.href="/";T(l).render(t.createElement(g,{...n,title:"Permisos"},t.createElement(w,{...n})))});