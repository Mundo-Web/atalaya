import{C as h,c as b,R as t,r as a}from"./CreateReactScript-BhyNrTql.js";import{A as T}from"./Adminto-Dzn_iDrM.js";import{T as g,R as c,M as v,I as x,a as f}from"./InputFormGroup-BcHnUGlm.js";import{P as m}from"./PermissionsRest-CAz9QCRf.js";import{T as F}from"./TextareaFormGroup-DY00xL1h.js";const y=()=>{const r=a.useRef(),l=a.useRef(),s=a.useRef(),i=a.useRef(),o=a.useRef(),[u,d]=a.useState(!1),p=e=>{e!=null&&e.id?d(!0):d(!1),s.current.value=(e==null?void 0:e.id)||null,i.current.value=(e==null?void 0:e.name)||null,o.current.value=(e==null?void 0:e.description)||null,$(l.current).modal("show")},E=async e=>{e.preventDefault();const n={id:s.current.value||void 0,name:i.current.value,description:o.current.value};await m.save(n)&&($(r.current).dxDataGrid("instance").refresh(),$(l.current).modal("hide"))},R=async e=>{await m.delete(e)&&$(r.current).dxDataGrid("instance").refresh()};return t.createElement(t.Fragment,null,t.createElement(g,{gridRef:r,title:"Permisos",rest:m,toolBar:e=>{e.unshift({widget:"dxButton",location:"after",options:{icon:"refresh",hint:"REFRESCAR TABLA",onClick:()=>$(r.current).dxDataGrid("instance").refresh()}}),e.unshift({widget:"dxButton",location:"after",options:{icon:"plus",hint:"NUEVO REGISTRO",onClick:()=>p()}})},columns:[{dataField:"id",caption:"ID",dataType:"number",sortOrder:"asc"},{dataField:"name",caption:"Permiso"},{dataField:"description",caption:"Descripcion"},{dataField:"created_at",caption:"Fecha creacion",dataType:"date",cellTemplate:(e,{data:n})=>{c(e,t.createElement("span",null,moment(n.created_at).format("LL")))}},{dataField:"updated_at",caption:"Fecha actualizacion",dataType:"date",cellTemplate:(e,{data:n})=>{c(e,t.createElement("span",null,moment(n.updated_at).format("LL")))}},{caption:"Acciones",cellTemplate:(e,{data:n})=>{e.attr("style","display: flex; gap: 4px; overflow: unset"),c(e,t.createElement(f,{className:"btn btn-xs btn-soft-primary",title:"Editar",onClick:()=>p(n)},t.createElement("i",{className:"fa fa-pen"}))),c(e,t.createElement(f,{className:"btn btn-xs btn-soft-danger",title:"Eliminar",onClick:()=>R(n.id)},t.createElement("i",{className:"fa fa-trash-alt"})))},allowFiltering:!1,allowExporting:!1}]}),t.createElement(v,{modalRef:l,title:u?"Editar permiso":"Agregar permiso",onSubmit:E},t.createElement("div",{className:"row"},t.createElement("p",null,"Intenta con el formato ",t.createElement("code",null,"ventana.permiso"),". Ej: ",t.createElement("code",null,"clients.create"),", ",t.createElement("code",null,"clients.read"),", ",t.createElement("code",null,"clients.update"),", ",t.createElement("code",null,"clients.delete")),t.createElement("input",{ref:s,type:"hidden"}),t.createElement(x,{eRef:i,label:"Permiso",col:"col-12",required:!0,disabled:u}),t.createElement(F,{eRef:o,label:"Descripcion",col:"col-12"}))))};h((r,l)=>{b(r).render(t.createElement(T,{...l,title:"Permisos"},t.createElement(y,{...l})))});