import{C as T,c as g,R as t,r as l}from"./CreateReactScript-BPb0oCFQ.js";import{A as v}from"./Adminto-DvH23jnX.js";import{T as x,R as a,M as F,I as y,a as E}from"./InputFormGroup-Dqe-63Hj.js";import"./JSEncrypt-D3I3x59l.js";import{P as m}from"./PermissionsRest-DIPNL9vw.js";import{m as R}from"./index-BuvcFxz3.js";import{T as w}from"./TextareaFormGroup-Da32IrqJ.js";const A=({PUBLIC_RSA_KEY:u})=>{const r=l.useRef(),i=l.useRef(),s=l.useRef(),c=l.useRef(),o=l.useRef(),[d,p]=l.useState(!1),f=e=>{e!=null&&e.id?p(!0):p(!1),s.current.value=(e==null?void 0:e.id)||null,c.current.value=(e==null?void 0:e.name)||null,o.current.value=(e==null?void 0:e.description)||null,$(i.current).modal("show")},h=async e=>{e.preventDefault();const n={id:s.current.value||void 0,name:c.current.value,description:o.current.value};await m.save(n)&&($(r.current).dxDataGrid("instance").refresh(),$(i.current).modal("hide"))},b=async e=>{await m.delete(e)&&$(r.current).dxDataGrid("instance").refresh()};return t.createElement(t.Fragment,null,t.createElement(x,{gridRef:r,title:"Permisos",rest:m,toolBar:e=>{e.unshift({widget:"dxButton",location:"after",options:{icon:"refresh",hint:"REFRESCAR TABLA",onClick:()=>$(r.current).dxDataGrid("instance").refresh()}}),e.unshift({widget:"dxButton",location:"after",options:{icon:"plus",hint:"NUEVO REGISTRO",onClick:()=>f()}})},columns:[{dataField:"id",caption:"ID",dataType:"number",sortOrder:"asc"},{dataField:"name",caption:"Permiso"},{dataField:"description",caption:"Descripcion"},{dataField:"created_at",caption:"Fecha creacion",dataType:"date",cellTemplate:(e,{data:n})=>{a(e,t.createElement("span",null,R(n.created_at).format("LL")))}},{dataField:"updated_at",caption:"Fecha actualizacion",dataType:"date",cellTemplate:(e,{data:n})=>{a(e,t.createElement("span",null,R(n.updated_at).format("LL")))}},{caption:"Acciones",cellTemplate:(e,{data:n})=>{e.attr("style","display: flex; gap: 4px; overflow: unset"),a(e,t.createElement(E,{className:"btn btn-xs btn-soft-primary",title:"Editar",onClick:()=>f(n)},t.createElement("i",{className:"fa fa-pen"}))),a(e,t.createElement(E,{className:"btn btn-xs btn-soft-danger",title:"Eliminar",onClick:()=>b(n.id)},t.createElement("i",{className:"fa fa-trash-alt"})))},allowFiltering:!1,allowExporting:!1}]}),t.createElement(F,{modalRef:i,title:d?"Editar permiso":"Agregar permiso",onSubmit:h},t.createElement("div",{className:"row"},t.createElement("p",null,"Intenta con el formato ",t.createElement("code",null,"ventana.permiso"),". Ej: ",t.createElement("code",null,"clients.create"),", ",t.createElement("code",null,"clients.read"),", ",t.createElement("code",null,"clients.update"),", ",t.createElement("code",null,"clients.delete")),t.createElement("input",{ref:s,type:"hidden"}),t.createElement(y,{eRef:c,label:"Permiso",col:"col-12",required:!0,disabled:d}),t.createElement(w,{eRef:o,label:"Descripcion",col:"col-12"}))))};T((u,r)=>{g(u).render(t.createElement(v,{...r,title:"Permisos"},t.createElement(A,{...r})))});