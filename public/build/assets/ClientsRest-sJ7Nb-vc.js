var n=Object.defineProperty;var g=(o,e,t)=>e in o?n(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var a=(o,e,t)=>(g(o,typeof e!="symbol"?e+"":e,t),t);import{m as r}from"./CreateReactScript-CMiyu2aM.js";class c{}a(c,"paginate",async e=>{const{result:t}=await r.Fetch("/api/clients/paginate",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)});return t}),a(c,"save",async e=>{try{const{status:t,result:s}=await r.Fetch("/api/clients",{method:"POST",body:JSON.stringify(e)});if(!t)throw new Error((s==null?void 0:s.message)||"Ocurrio un error inesperado");return r.Notify.add({icon:"/assets/img/logo.svg",title:"Correcto",body:s.message,type:"success"}),!0}catch(t){return r.Notify.add({icon:"/assets/img/logo.svg",title:"Error",body:t.message,type:"danger"}),!1}}),a(c,"status",async({id:e,status:t})=>{try{const{status:s,result:i}=await r.Fetch("/api/clients/status",{method:"PATCH",body:JSON.stringify({id:e,status:t})});if(!s)throw new Error((i==null?void 0:i.message)??"Ocurrio un error inesperado");return r.Notify.add({icon:"/assets/img/logo.svg",title:"Correcto",body:i.message,type:"success"}),!0}catch(s){return r.Notify.add({icon:"/assets/img/logo.svg",title:"Error",body:s.message,type:"danger"}),!1}}),a(c,"delete",async e=>{try{const{status:t,result:s}=await r.Fetch(`/api/clients/${e}`,{method:"DELETE"});if(!t)throw new Error((s==null?void 0:s.message)??"Ocurrio un error inesperado");return r.Notify.add({icon:"/assets/img/logo.svg",title:"Correcto",body:s.message,type:"success"}),!0}catch(t){return r.Notify.add({icon:"/assets/img/logo.svg",title:"Error",body:t.message,type:"danger"}),!1}});export{c as C};