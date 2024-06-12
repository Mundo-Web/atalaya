var X=Object.defineProperty;var Z=(m,s,n)=>s in m?X(m,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):m[s]=n;var g=(m,s,n)=>(Z(m,typeof s!="symbol"?s+"":s,n),n);import{m as c,C as L,c as ee,R as t,r as a}from"./CreateReactScript-BhyNrTql.js";import{T as te,R as u,a as h,M as O,I as b}from"./InputFormGroup-BcHnUGlm.js";import{P as E}from"./ProjectsRest-Cb8kv-37.js";import{A as re,i as ne}from"./Adminto-Dzn_iDrM.js";import{T as se}from"./TextareaFormGroup-DY00xL1h.js";import{S as Y,a as G}from"./SetSelectValue-ByIafFDO.js";import{D as le,a as ae}from"./DropdownItem-BMHTIjyy.js";class p{}g(p,"paginate",async s=>{const{result:n}=await c.Fetch("/api/payments/paginate",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(s)});return n}),g(p,"byProject",async s=>{const{result:n}=await c.Fetch(`/api/payments/project/${s}`);return(n==null?void 0:n.data)??[]}),g(p,"save",async s=>{try{const{status:n,result:o}=await c.Fetch("/api/payments",{method:"POST",body:JSON.stringify(s)});if(!n)throw new Error((o==null?void 0:o.message)||"Ocurrio un error inesperado");return c.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:o.message,type:"success"}),!0}catch(n){return c.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:n.message,type:"danger"}),!1}}),g(p,"status",async({id:s,status:n})=>{try{const{status:o,result:f}=await c.Fetch("/api/payments/status",{method:"PATCH",body:JSON.stringify({id:s,status:n})});if(!o)throw new Error((f==null?void 0:f.message)??"Ocurrio un error inesperado");return c.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:f.message,type:"success"}),!0}catch(o){return c.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:o.message,type:"danger"}),!1}}),g(p,"delete",async s=>{try{const{status:n,result:o}=await c.Fetch(`/api/payments/${s}`,{method:"DELETE"});if(!n)throw new Error((o==null?void 0:o.message)??"Ocurrio un error inesperado");return c.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:o.message,type:"success"}),!0}catch(n){return c.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:n.message,type:"danger"}),!1}});const oe=({statuses:m,can:s})=>{const n=a.useRef(),o=a.useRef(),f=a.useRef(),v=a.useRef(),R=a.useRef(),N=a.useRef(),w=a.useRef(),x=a.useRef(),S=a.useRef(),_=a.useRef(),j=a.useRef(),F=a.useRef(),C=a.useRef(),P=a.useRef(),T=a.useRef(),[I,D]=a.useState(!1),[l,A]=a.useState({}),[q,k]=a.useState([]),M=e=>{var r,i,d,y;e!=null&&e.id?D(!0):D(!1),v.current.value=(e==null?void 0:e.id)||null,G(R.current,(r=e==null?void 0:e.client)==null?void 0:r.id,(i=e==null?void 0:e.client)==null?void 0:i.name),G(N.current,(d=e==null?void 0:e.type)==null?void 0:d.id,(y=e==null?void 0:e.type)==null?void 0:y.name),w.current.value=(e==null?void 0:e.name)||null,x.current.value=(e==null?void 0:e.description)||null,S.current.value=e==null?void 0:e.cost,_.current.value=e!=null&&e.sign_at?moment(e.sign_at).format("YYYY-MM-DD"):null,j.current.value=e!=null&&e.starts_at?moment(e.starts_at).format("YYYY-MM-DD"):null,F.current.value=e!=null&&e.ends_at?moment(e.ends_at).format("YYYY-MM-DD"):null,$(o.current).modal("show")},B=async e=>{A(e);const r=await p.byProject(e.id);k(r),C.current.value=(e==null?void 0:e.id)||null,$(f.current).modal("show")},V=async e=>{e.preventDefault();const r={id:v.current.value||void 0,client_id:R.current.value,type_id:N.current.value,name:w.current.value,description:x.current.value,cost:S.current.value??void 0,sign_at:_.current.value??void 0,starts_at:j.current.value,ends_at:F.current.value};await E.save(r)&&($(n.current).dxDataGrid("instance").refresh(),$(o.current).modal("hide"))},J=async e=>{e.preventDefault();const r={payment_id:C.current.value||void 0,project_id:l.id,payment_type:P.current.value,amount:T.current.value};if(!await p.save(r))return;P.current.value=null,T.current.value=null;const d=await p.byProject(l.id),y=d.reduce((Q,W)=>Number(Q)+Number(W.amount),0),K={...l,total_payments:y,remaining_amount:l.cost-y};A(K),k(d),$(n.current).dxDataGrid("instance").refresh()},z=async({id:e,status:r})=>{await E.status({id:e,status:r})&&$(n.current).dxDataGrid("instance").refresh()},H=async e=>{await E.delete(e)&&$(n.current).dxDataGrid("instance").refresh()},U=async(e,r)=>{await E.projectStatus(e,r)&&$(n.current).dxDataGrid("instance").refresh()};return t.createElement(t.Fragment,null,t.createElement(te,{gridRef:n,title:"Proyectos",rest:E,toolBar:e=>{e.unshift({widget:"dxButton",location:"after",options:{icon:"refresh",hint:"REFRESCAR TABLA",onClick:()=>$(n.current).dxDataGrid("instance").refresh()}}),s("projects","root","all","create")&&e.unshift({widget:"dxButton",location:"after",options:{icon:"plus",hint:"NUEVO REGISTRO",onClick:()=>M()}})},filterValue:void 0,columns:[{dataField:"id",caption:"ID",dataType:"number",sortOrder:"asc"},{dataField:"client.name",caption:"Cliente",filterValue:c.GET.client||void 0},{dataField:"type.name",caption:"Tipo"},{dataField:"name",caption:"Proyecto"},{dataField:"cost",caption:"Costo",dataType:"number",width:150,cellTemplate:(e,{data:r})=>{const i=(r.total_payments/r.cost*100).toFixed(2);u(e,t.createElement(t.Fragment,null,t.createElement("p",{className:"mb-1 d-flex justify-content-between"},t.createElement("span",null,"S/.",Number(r.total_payments).toFixed(2)),t.createElement("b",{className:"float-end"},"S/.",Number(r.cost).toFixed(2))),t.createElement("div",{className:"progress progress-bar-alt-primary progress-sm mt-0 mb-0"},t.createElement("div",{className:"progress-bar bg-primary progress-animated wow animated animated",role:"progressbar","aria-valuenow":r.total_payments,"aria-valuemin":"0","aria-valuemax":r.cost,style:{width:`${i}%`,visibility:"visible",animationName:"animationProgress"}}))))}},s("projects","root","all","changestatus")&&{dataField:"project_status.name",caption:"Estado del proyecto",dataType:"string",cellTemplate:(e,{data:r})=>{e.attr("style","display: flex; gap: 4px; overflow: unset"),u(e,t.createElement(le,{className:"btn btn-xs btn-white rounded-pill",title:r.project_status.name,tippy:"Actualizar estado",icon:{icon:"fa fa-circle",color:r.project_status.color}},m.map(({id:i,name:d,color:y})=>t.createElement(ae,{key:i,onClick:()=>U(r.id,i)},t.createElement("i",{className:"fa fa-circle",style:{color:y}})," ",d))))}},{dataField:"status",caption:"Estado",dataType:"boolean",cellTemplate:(e,{data:r})=>{switch(r.status){case 1:u(e,t.createElement("span",{className:"badge bg-success rounded-pill"},"Activo"));break;case 0:u(e,t.createElement("span",{className:"badge bg-danger rounded-pill"},"Inactivo"));break;default:u(e,t.createElement("span",{className:"badge bg-dark rounded-pill"},"Eliminado"));break}}},{caption:"Acciones",cellTemplate:(e,{data:r})=>{e.attr("style","display: flex; gap: 4px; overflow: unset"),s("projects","root","all","update")&&u(e,t.createElement(h,{className:"btn btn-xs btn-soft-primary",title:"Editar",onClick:()=>M(r)},t.createElement("i",{className:"fa fa-pen"}))),s("projects","root","all","addpayments")&&u(e,t.createElement(h,{className:"btn btn-xs btn-soft-success",title:"Ver/Agregar pagos",onClick:()=>B(r)},t.createElement("i",{className:"fas fa-money-check-alt"}))),s("projects","root","all","update")&&u(e,t.createElement(h,{className:"btn btn-xs btn-light",title:r.status===null?"Restaurar":"Cambiar estado",onClick:()=>z(r)},r.status===1?t.createElement("i",{className:"fa fa-toggle-on text-success"}):r.status===0?t.createElement("i",{className:"fa fa-toggle-off text-danger"}):t.createElement("i",{className:"fas fa-trash-restore"}))),s("projects","root","all","delete")&&u(e,t.createElement(h,{className:"btn btn-xs btn-soft-danger",title:"Eliminar",onClick:()=>H(r.id)},t.createElement("i",{className:"fa fa-trash-alt"})))},allowFiltering:!1,allowExporting:!1}]}),t.createElement(O,{modalRef:o,title:I?"Editar proyecto":"Agregar proyecto",onSubmit:V},t.createElement("div",{className:"row",id:"project-crud-container"},t.createElement("input",{ref:v,type:"hidden"}),t.createElement(Y,{eRef:R,label:"Cliente",col:"col-12",dropdownParent:"#project-crud-container",searchAPI:"/api/clients/paginate",searchBy:"name",required:!0}),t.createElement(Y,{eRef:N,label:"Tipo del proyecto",col:"col-md-4",dropdownParent:"#project-crud-container",searchAPI:"/api/types/paginate",searchBy:"name",required:!0}),t.createElement(b,{eRef:w,label:"Nombre del proyecto",col:"col-md-8",required:!0}),t.createElement(se,{eRef:x,label:"Descripcion del proyecto",col:"col-12"}),t.createElement(b,{eRef:S,label:"Costo",col:"col-md-6",type:"number",required:!0}),t.createElement(b,{eRef:_,label:"Fecha firma",col:"col-md-6",type:"date"}),t.createElement(b,{eRef:j,label:"Fecha inicio",col:"col-md-6",type:"date",required:!0}),t.createElement(b,{eRef:F,label:"Fecha fin",col:"col-md-6",type:"date",required:!0}))),t.createElement(O,{modalRef:f,title:`Pagos de ${l==null?void 0:l.name} - S/.${l==null?void 0:l.cost}`,onSubmit:J},t.createElement("div",{className:"row"},t.createElement("input",{ref:C,type:"hidden"}),t.createElement(b,{eRef:P,label:"Concepto",col:"col-md-7",required:!0}),t.createElement("div",{className:"form-group col-md-5"},t.createElement("label",null,"Monto ",t.createElement("b",{className:"text-danger"},"*")),t.createElement("div",{className:"input-group"},t.createElement("input",{ref:T,type:"number",className:"form-control",placeholder:`Max: ${l==null?void 0:l.remaining_amount}`,min:0,max:l==null?void 0:l.remaining_amount}),t.createElement(ne,{content:"Agregar pago"},t.createElement("button",{className:"btn input-group-text btn-dark waves-effect waves-light",type:"submit"},t.createElement("i",{className:"fa fa-plus"})))))),t.createElement("table",{className:"table table-bordered table-sm table-responsive table-striped mb-2"},t.createElement("thead",null,t.createElement("tr",null,t.createElement("th",null),t.createElement("th",null,"Fecha"),t.createElement("th",null,"Concepto"),t.createElement("th",null,"Monto"))),t.createElement("tbody",null,q.map(e=>t.createElement("tr",null,t.createElement("td",null),t.createElement("td",null,moment(e.created_at).format("LL")),t.createElement("td",null,e.payment_type),t.createElement("td",null,"S/.",e.amount))))),t.createElement("table",{className:"table table-bordered table-sm table-responsive table-striped mb-0",style:{width:"max-content",float:"right"}},t.createElement("tbody",null,t.createElement("tr",null,t.createElement("th",{colSpan:3,className:"text-end"},"Pagado"),t.createElement("td",null,"S/.",l==null?void 0:l.total_payments)),t.createElement("tr",null,t.createElement("th",{colSpan:3,className:"text-end"},"Por pagar"),t.createElement("td",null,"S/.",l==null?void 0:l.remaining_amount))))))};L((m,s)=>{if(!s.can("projects","root","all","list"))return location.href="/";ee(m).render(t.createElement(re,{...s,title:"Proyectos"},t.createElement(oe,{...s})))});
