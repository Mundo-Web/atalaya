var w=Object.defineProperty;var T=(n,s,r)=>s in n?w(n,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[s]=r;var d=(n,s,r)=>(T(n,typeof s!="symbol"?s+"":s,r),r);import{m as i,C as v,c as x,R as t,r as m}from"./CreateReactScript-CMiyu2aM.js";import{A as S}from"./Adminto-xE7bgJCa.js";import{T as C}from"./tippy-D-rnBwmO.js";import{R as l,T as g,M as F,I as A}from"./InputFormGroup-DgxbkxK5.js";import{T as O}from"./TextareaFormGroup-CkLVDc6p.js";import{S as k,a as D}from"./SetSelectValue-CLjGB2wR.js";class u{}d(u,"paginate",async s=>{const{result:r}=await i.Fetch("/api/statuses/paginate",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(s)});return r}),d(u,"save",async s=>{try{const{status:r,result:o}=await i.Fetch("/api/statuses",{method:"POST",body:JSON.stringify(s)});if(!r)throw new Error((o==null?void 0:o.message)||"Ocurrio un error inesperado");return i.Notify.add({icon:"/assets/img/logo.svg",title:"Correcto",body:o.message,type:"success"}),!0}catch(r){return i.Notify.add({icon:"/assets/img/logo.svg",title:"Error",body:r.message,type:"danger"}),!1}}),d(u,"status",async({id:s,status:r})=>{try{const{status:o,result:c}=await i.Fetch("/api/statuses/status",{method:"PATCH",body:JSON.stringify({id:s,status:r})});if(!o)throw new Error((c==null?void 0:c.message)??"Ocurrio un error inesperado");return i.Notify.add({icon:"/assets/img/logo.svg",title:"Correcto",body:c.message,type:"success"}),!0}catch(o){return i.Notify.add({icon:"/assets/img/logo.svg",title:"Error",body:o.message,type:"danger"}),!1}}),d(u,"delete",async s=>{try{const{status:r,result:o}=await i.Fetch(`/api/statuses/${s}`,{method:"DELETE"});if(!r)throw new Error((o==null?void 0:o.message)??"Ocurrio un error inesperado");return i.Notify.add({icon:"/assets/img/logo.svg",title:"Correcto",body:o.message,type:"success"}),!0}catch(r){return i.Notify.add({icon:"/assets/img/logo.svg",title:"Error",body:r.message,type:"danger"}),!1}});const G=()=>{const n=m.useRef(),s=m.useRef(),r=m.useRef(),o=m.useRef(),c=m.useRef(),f=m.useRef(),[b,y]=m.useState(!1),E=e=>{var a,p;e!=null&&e.id?y(!0):y(!1),r.current.value=(e==null?void 0:e.id)||null,D(o.current,(a=e==null?void 0:e.table)==null?void 0:a.id,(p=e==null?void 0:e.table)==null?void 0:p.name),c.current.value=(e==null?void 0:e.name)||null,f.current.value=(e==null?void 0:e.description)||null,$(s.current).modal("show")},h=async e=>{e.preventDefault();const a={id:r.current.value||void 0,table_id:o.current.value,name:c.current.value,description:f.current.value};await u.save(a)&&($(n.current).dxDataGrid("instance").refresh(),$(s.current).modal("hide"))},R=async({id:e,status:a})=>{await u.status({id:e,status:a})&&$(n.current).dxDataGrid("instance").refresh()},N=async e=>{await u.delete(e)&&$(n.current).dxDataGrid("instance").refresh()};return t.createElement(t.Fragment,null,t.createElement(C,{gridRef:n,title:"Estados",rest:u,toolBar:e=>{e.unshift({widget:"dxButton",location:"after",options:{icon:"refresh",hint:"REFRESCAR TABLA",onClick:()=>$(n.current).dxDataGrid("instance").refresh()}}),e.unshift({widget:"dxButton",location:"after",options:{icon:"plus",hint:"NUEVO REGISTRO",onClick:()=>E()}})},columns:[{dataField:"id",caption:"ID",dataType:"number",sortOrder:"asc"},{dataField:"table.name",caption:"Tabla",dataType:"string"},{dataField:"name",caption:"Estado de proyecto"},{dataField:"description",caption:"Descripcion",cellTemplate:(e,{value:a})=>{a?l(e,a):l(e,t.createElement("i",{className:"text-muted"},"- Sin descripcion -"))}},{dataField:"status",caption:"Estado",dataType:"boolean",cellTemplate:(e,{data:a})=>{switch(a.status){case 1:l(e,t.createElement("span",{className:"badge bg-success rounded-pill"},"Activo"));break;case 0:l(e,t.createElement("span",{className:"badge bg-danger rounded-pill"},"Inactivo"));break;default:l(e,t.createElement("span",{className:"badge bg-dark rounded-pill"},"Eliminado"));break}}},{caption:"Acciones",cellTemplate:(e,{data:a})=>{e.attr("style","display: flex; gap: 4px; overflow: unset"),l(e,t.createElement(g,{className:"btn btn-xs btn-soft-primary",title:"Editar",onClick:()=>E(a)},t.createElement("i",{className:"fa fa-pen"}))),l(e,t.createElement(g,{className:"btn btn-xs btn-light",title:a.status===null?"Restaurar":"Cambiar estado",onClick:()=>R(a)},a.status===1?t.createElement("i",{className:"fa fa-toggle-on text-success"}):a.status===0?t.createElement("i",{className:"fa fa-toggle-off text-danger"}):t.createElement("i",{className:"fas fa-trash-restore"}))),l(e,t.createElement(g,{className:"btn btn-xs btn-soft-danger",title:"Eliminar",onClick:()=>N(a.id)},t.createElement("i",{className:"fa fa-trash-alt"})))},allowFiltering:!1,allowExporting:!1}]}),t.createElement(F,{modalRef:s,title:b?"Editar estado de proyecto":"Agregar estado de proyecto",onSubmit:h,size:"sm"},t.createElement("div",{className:"row",id:"status-crud-container"},t.createElement("input",{ref:r,type:"hidden"}),t.createElement(A,{eRef:c,label:"Estado de proyecto",col:"col-12",required:!0}),t.createElement(k,{eRef:o,label:"Tabla",col:"col-12",dropdownParent:"#status-crud-container",searchAPI:"/api/tables/paginate",searchBy:"name",required:!0}),t.createElement(O,{eRef:f,label:"Descripcion",col:"col-12"}))))};v((n,s)=>{x(n).render(t.createElement(S,{session:s.session,title:"Estados"},t.createElement(G,{...s})))});
