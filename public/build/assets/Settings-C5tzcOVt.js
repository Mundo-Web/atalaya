var v=Object.defineProperty;var R=(n,e,t)=>e in n?v(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var g=(n,e,t)=>(R(n,typeof e!="symbol"?e+"":e,t),t);import{m as a,r as l,R as o,C as w,c as N}from"./CreateReactScript-BZNFBiYC.js";import{A as T}from"./Adminto-Cg1dR7X7.js";import{T as F,R as E,M as S,a as x}from"./TippyButton-CV3xjtk8.js";import{I as h}from"./InputFormGroup-BUOjBXeO.js";class m{}g(m,"paginate",async e=>{const{result:t}=await a.Fetch("/api/settings/paginate",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)});return t}),g(m,"save",async e=>{try{const{status:t,result:s}=await a.Fetch("/api/settings",{method:"POST",body:JSON.stringify(e)});if(!t)throw new Error((s==null?void 0:s.message)||"Ocurrio un error inesperado");return a.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:s.message,type:"success"}),!0}catch(t){return a.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:t.message,type:"danger"}),!1}}),g(m,"status",async({id:e,status:t})=>{try{const{status:s,result:i}=await a.Fetch("/api/settings/status",{method:"PATCH",body:JSON.stringify({id:e,status:t})});if(!s)throw new Error((i==null?void 0:i.message)??"Ocurrio un error inesperado");return a.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:i.message,type:"success"}),!0}catch(s){return a.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:s.message,type:"danger"}),!1}}),g(m,"delete",async e=>{try{const{status:t,result:s}=await a.Fetch(`/api/settings/${e}`,{method:"DELETE"});if(!t)throw new Error((s==null?void 0:s.message)??"Ocurrio un error inesperado");return a.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:s.message,type:"success"}),!0}catch(t){return a.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:t.message,type:"danger"}),!1}});const O=({col:n,label:e,eRef:t,value:s,required:i=!1,rows:d=3,theme:f="snow"})=>{const p=l.useRef();return l.useEffect(()=>{const c=new Quill(p.current,{theme:f,modules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}]]}});c.on("text-change",()=>{t.current.value=c.root.innerHTML}),t.editor=c},[null]),o.createElement("div",{className:`form-group ${n} mb-2`,style:{height:"max-content"}},o.createElement("label",{htmlFor:""},e," ",i&&o.createElement("b",{className:"text-danger"},"*")),o.createElement("div",{ref:p,style:{height:"100px"}},s),o.createElement("input",{ref:t,type:"hidden",required:i,rows:d}))},A=(n,e)=>{n.root.innerHTML=e},C=({can:n})=>{const e=l.useRef(),t=l.useRef(),s=l.useRef(),i=l.useRef(),d=l.useRef(),f=l.useRef(),[p,c]=l.useState(!1),y=r=>{r!=null&&r.id?c(!0):c(!1),s.current.value=(r==null?void 0:r.id)||null,i.current.value=(r==null?void 0:r.name)||null,A(d.editor,(r==null?void 0:r.value)||null),f.current.value=(r==null?void 0:r.description)||null,$(t.current).modal("show")},b=async r=>{r.preventDefault();const u={id:s.current.value||void 0,name:i.current.value,value:d.current.value,description:f.current.value};await m.save(u)&&($(e.current).dxDataGrid("instance").refresh(),$(t.current).modal("hide"))};return o.createElement(o.Fragment,null,o.createElement(F,{gridRef:e,title:"Estados",rest:m,toolBar:r=>{r.unshift({widget:"dxButton",location:"after",options:{icon:"refresh",hint:"REFRESCAR TABLA",onClick:()=>$(e.current).dxDataGrid("instance").refresh()}}),r.unshift({widget:"dxButton",location:"after",options:{icon:"plus",hint:"NUEVO REGISTRO",onClick:()=>y()}})},columns:[{dataField:"id",caption:"ID",dataType:"number",sortOrder:"asc"},{dataField:"name",caption:"Estado de tabla"},{dataField:"description",caption:"Descripcion",cellTemplate:(r,{value:u})=>{u?E(r,u):E(r,o.createElement("i",{className:"text-muted"},"- Sin descripcion -"))}},{caption:"Acciones",cellTemplate:(r,{data:u})=>{n("settings","root","all","update")&&E(r,o.createElement(x,{className:"btn btn-xs btn-soft-primary",title:"Editar",onClick:()=>y(u)},o.createElement("i",{className:"fa fa-pen"})))},allowFiltering:!1,allowExporting:!1}]}),o.createElement(S,{modalRef:t,title:p?"Editar configuracion":"Agregar configuracion",onSubmit:b,size:"md"},o.createElement("div",{className:"row",id:"settings-crud-container"},o.createElement("input",{ref:s,type:"hidden"}),o.createElement(h,{eRef:i,label:"Alias",col:"col-12",required:!0}),o.createElement(h,{eRef:f,label:"Descripcion",col:"col-12"}),o.createElement(O,{eRef:d,label:"Valor",col:"col-12",theme:"bubble",required:!0}))))};w((n,e)=>{if(!e.can("settings","root","all","list"))return location.href="/";N(n).render(o.createElement(T,{...e,title:"Estados"},o.createElement(C,{...e})))});
