var _=Object.defineProperty;var J=(i,e,t)=>e in i?_(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var c=(i,e,t)=>(J(i,typeof e!="symbol"?e+"":e,t),t);import{m as o,r as l,R as a}from"./CreateReactScript-ClVaIZLH.js";import{M as x}from"./TippyButton-8JVuESJr.js";import"./Adminto-BSg1Iqw4.js";import{S as B}from"./Dropdown-CVEN-Z_y.js";import{I}from"./InputFormGroup-CCmG0Ohr.js";import{T as j}from"./TextareaFormGroup-D05xY0Ci.js";import{S as v,a as k}from"./SetSelectValue-CwDYwahQ.js";import{D as O}from"./DropdownItem-CGQ01ebz.js";import{D as q}from"./DropdownEnd-wfgyKYxw.js";class h{}c(h,"paginate",async e=>{const{result:t}=await o.Fetch("/api/clients/paginate",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)});return t}),c(h,"save",async e=>{try{const{status:t,result:r}=await o.Fetch("/api/clients",{method:"POST",body:JSON.stringify(e)});if(!t)throw new Error((r==null?void 0:r.message)||"Ocurrio un error inesperado");return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:r.message,type:"success"}),!0}catch(t){return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:t.message,type:"danger"}),!1}}),c(h,"status",async({id:e,status:t})=>{try{const{status:r,result:n}=await o.Fetch("/api/clients/status",{method:"PATCH",body:JSON.stringify({id:e,status:t})});if(!r)throw new Error((n==null?void 0:n.message)??"Ocurrio un error inesperado");return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:n.message,type:"success"}),!0}catch(r){return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:r.message,type:"danger"}),!1}}),c(h,"clientStatus",async(e,t)=>{try{const{status:r,result:n}=await o.Fetch("/api/clients/client-status",{method:"PATCH",body:JSON.stringify({client:e,status:t})});if(!r)throw new Error((n==null?void 0:n.message)??"Ocurrio un error inesperado");return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:n.message,type:"success"}),!0}catch(r){return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:r.message,type:"danger"}),!1}}),c(h,"delete",async e=>{try{const{status:t,result:r}=await o.Fetch(`/api/clients/${e}`,{method:"DELETE"});if(!t)throw new Error((r==null?void 0:r.message)??"Ocurrio un error inesperado");return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:r.message,type:"success"}),!0}catch(t){return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:t.message,type:"danger"}),!1}});class d{}c(d,"paginate",async e=>{const{result:t}=await o.Fetch("/api/client-notes/paginate",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)});return t}),c(d,"byClient",async e=>{const{result:t}=await o.Fetch(`/api/client-notes/client/${e}`);return(t==null?void 0:t.data)??[]}),c(d,"save",async e=>{try{const{status:t,result:r}=await o.Fetch("/api/client-notes",{method:"POST",body:JSON.stringify(e)});if(!t)throw new Error((r==null?void 0:r.message)||"Ocurrio un error inesperado");return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:r.message,type:"success"}),!0}catch(t){return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:t.message,type:"danger"}),!1}}),c(d,"status",async({id:e,status:t})=>{try{const{status:r,result:n}=await o.Fetch("/api/client-notes/status",{method:"PATCH",body:JSON.stringify({id:e,status:t})});if(!r)throw new Error((n==null?void 0:n.message)??"Ocurrio un error inesperado");return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:n.message,type:"success"}),!0}catch(r){return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:r.message,type:"danger"}),!1}}),c(d,"delete",async e=>{try{const{status:t,result:r}=await o.Fetch(`/api/client-notes/${e}`,{method:"DELETE"});if(!t)throw new Error((r==null?void 0:r.message)??"Ocurrio un error inesperado");return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:r.message,type:"success"}),!0}catch(t){return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:t.message,type:"danger"}),!1}});const Z=({can:i,client:e,setClient:t,grid2refresh:r,page:n})=>{const E=l.useRef(),w=l.useRef(),m=l.useRef(),g=l.useRef(),y=l.useRef(),f=l.useRef(),[C,b]=l.useState([]),[T,N]=l.useState(!1);l.useEffect(()=>{e.id&&D(),$(E.current).on("hidden.bs.modal",()=>{t({}),b([]),N(!1),m.current.value=null,v(g.current,null,null),y.current.value=null,f.current.value=null})},[e]);const D=async()=>{const s=await d.byClient(e==null?void 0:e.id);b(s),$(E.current).modal("show")},F=async s=>{s.preventDefault();const u={id:m.current.value||void 0,type_id:g.current.value,client_id:e.id,name:y.current.value,description:f.current.value};await d.save(u)&&($(w.current).modal("hide"),m.current.value=null,v(g.current,null,null),y.current.value=null,f.current.value=null,await S(),$(r.current).dxDataGrid("instance").refresh())},S=async()=>{const s=await d.byClient(e.id);b(s)},R=async s=>{m.current.value=s.id,v(g.current,s.type.id,s.type.name),y.current.value=s.name,f.current.value=s.description,$(w.current).modal("show"),N(!0)},A=async s=>{const{isConfirmed:u}=await B.fire({title:"Estas seguro de eliminar esta nota?",text:"No podras revertir esto!",icon:"warning",showCancelButton:!0,confirmButtonText:"Continuar",cancelButtonText:"Cancelar"});!u||!await d.delete(s)||(await S(),$(r.current).dxDataGrid("instance").refresh())};return a.createElement(a.Fragment,null,a.createElement(x,{modalRef:E,title:`Notas de ${(e==null?void 0:e.tradename)||(e==null?void 0:e.name)||(e==null?void 0:e.contact_name)}`,size:"full-width",isStatic:!0,hideFooter:!0},a.createElement("div",{style:{height:"calc(100vh - 180px)",overflowY:"auto"}},a.createElement("div",{className:"text-center"},a.createElement("button",{className:"btn btn-primary",type:"button",onClick:()=>$(w.current).modal("show")},"Agregar nota")),a.createElement("hr",{className:"my-2"}),a.createElement("div",{className:"d-flex flex-wrap flex-row justify-content-center gap-2"},C.sort((s,u)=>new Date(u.created_at)-new Date(s.created_at)).map((s,u)=>{const p=moment(s.created_at),P=moment().diff(p,"hours")>12?p.format("lll"):p.fromNow();return a.createElement("div",{key:`note-${u}`,className:"card text-white bg-purple mb-0",style:{width:"100%",maxWidth:"300px",height:"max-content"}},a.createElement("div",{className:"card-body p-2"},a.createElement("div",{className:"d-flex align-items-center border-bottom border-white pb-1 mb-1"},a.createElement("div",{className:"avatar-sm me-2 mb-1"},a.createElement("img",{src:`/api/profile/thumbnail/${s.user.relative_id}?v=${new Date(s.user.updated_at).getTime()}`,className:"img-fluid rounded-circle",alt:"user"})),a.createElement("div",{className:"flex-grow-1 overflow-hidden"},a.createElement("h5",{className:"text-white m-0"},s.user.name," ",s.user.lastname),a.createElement("p",{className:"text-white-50 m-0 font-13 text-truncate"},P)),i(n,"root","all","editnotes","deletenotes")&&a.createElement(q,null,i(n,"root","all","editnotes")&&a.createElement(O,{onClick:()=>R(s)},"Editar"),i(n,"root","all","deletenotes")&&a.createElement(O,{onClick:()=>A(s.id)},"Eliminar"))),a.createElement("blockquote",{className:"card-bodyquote mb-0"},s.name&&a.createElement("b",null,s.name),a.createElement("p",{className:"mb-1"},s.description))))})))),a.createElement(x,{modalRef:w,title:T?"Editar nota":"Agregar nota",size:"sm",onSubmit:F},a.createElement("div",{id:"note-crud-container"},a.createElement("input",{ref:m,type:"hidden"}),a.createElement(k,{eRef:g,label:"Tipo de nota",col:"col-12",dropdownParent:"#note-crud-container",searchAPI:"/api/types/paginate",searchBy:"name",filter:["table_id","=",4],required:!0}),a.createElement(I,{eRef:y,label:"Titulo de la nota"}),a.createElement(j,{eRef:f,label:"Descripcion de la nota",required:!0}))))};export{h as C,Z as a};
