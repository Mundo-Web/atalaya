var n=Object.defineProperty;var g=(a,e,t)=>e in a?n(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var i=(a,e,t)=>(g(a,typeof e!="symbol"?e+"":e,t),t);import{m as r}from"./CreateReactScript-CMiyu2aM.js";class c{}i(c,"paginate",async e=>{const{result:t}=await r.Fetch("/api/clients/paginate",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)});return t}),i(c,"save",async e=>{try{const{status:t,result:s}=await r.Fetch("/api/clients",{method:"POST",body:JSON.stringify(e)});if(!t)throw new Error((s==null?void 0:s.message)||"Ocurrio un error inesperado");return r.Notify.add({icon:"/assets/img/logo.svg",title:"Correcto",body:s.message,type:"success"}),!0}catch(t){return r.Notify.add({icon:"/assets/img/logo.svg",title:"Error",body:t.message,type:"danger"}),!1}}),i(c,"status",async({id:e,status:t})=>{try{const{status:s,result:o}=await r.Fetch("/api/clients/status",{method:"PATCH",body:JSON.stringify({id:e,status:t})});if(!s)throw new Error((o==null?void 0:o.message)??"Ocurrio un error inesperado");return r.Notify.add({icon:"/assets/img/logo.svg",title:"Correcto",body:o.message,type:"success"}),!0}catch(s){return r.Notify.add({icon:"/assets/img/logo.svg",title:"Error",body:s.message,type:"danger"}),!1}}),i(c,"clientStatus",async(e,t)=>{try{const{status:s,result:o}=await r.Fetch("/api/clients/client-status",{method:"PATCH",body:JSON.stringify({client:e,status:t})});if(!s)throw new Error((o==null?void 0:o.message)??"Ocurrio un error inesperado");return r.Notify.add({icon:"/assets/img/logo.svg",title:"Correcto",body:o.message,type:"success"}),!0}catch(s){return r.Notify.add({icon:"/assets/img/logo.svg",title:"Error",body:s.message,type:"danger"}),!1}}),i(c,"delete",async e=>{try{const{status:t,result:s}=await r.Fetch(`/api/clients/${e}`,{method:"DELETE"});if(!t)throw new Error((s==null?void 0:s.message)??"Ocurrio un error inesperado");return r.Notify.add({icon:"/assets/img/logo.svg",title:"Correcto",body:s.message,type:"success"}),!0}catch(t){return r.Notify.add({icon:"/assets/img/logo.svg",title:"Error",body:t.message,type:"danger"}),!1}});export{c as C};