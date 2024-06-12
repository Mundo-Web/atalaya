var W=Object.defineProperty;var X=(m,n,s)=>n in m?W(m,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):m[n]=s;var g=(m,n,s)=>(X(m,typeof n!="symbol"?n+"":n,s),s);import{m as o,C as Z,c as L,R as t,r as a}from"./CreateReactScript-BhyNrTql.js";import{T as ee,R as u,a as h,M,I as b}from"./InputFormGroup-BcHnUGlm.js";import{P as E}from"./ProjectsRest-Cb8kv-37.js";import{A as te,i as re}from"./Adminto-Dzn_iDrM.js";import{T as ne}from"./TextareaFormGroup-DY00xL1h.js";import{S as O,a as Y}from"./SetSelectValue-ByIafFDO.js";import{D as se,a as le}from"./DropdownItem-BMHTIjyy.js";class f{}g(f,"paginate",async n=>{const{result:s}=await o.Fetch("/api/payments/paginate",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(n)});return s}),g(f,"byProject",async n=>{const{result:s}=await o.Fetch(`/api/payments/project/${n}`);return(s==null?void 0:s.data)??[]}),g(f,"save",async n=>{try{const{status:s,result:c}=await o.Fetch("/api/payments",{method:"POST",body:JSON.stringify(n)});if(!s)throw new Error((c==null?void 0:c.message)||"Ocurrio un error inesperado");return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:c.message,type:"success"}),!0}catch(s){return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:s.message,type:"danger"}),!1}}),g(f,"status",async({id:n,status:s})=>{try{const{status:c,result:p}=await o.Fetch("/api/payments/status",{method:"PATCH",body:JSON.stringify({id:n,status:s})});if(!c)throw new Error((p==null?void 0:p.message)??"Ocurrio un error inesperado");return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:p.message,type:"success"}),!0}catch(c){return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:c.message,type:"danger"}),!1}}),g(f,"delete",async n=>{try{const{status:s,result:c}=await o.Fetch(`/api/payments/${n}`,{method:"DELETE"});if(!s)throw new Error((c==null?void 0:c.message)??"Ocurrio un error inesperado");return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:c.message,type:"success"}),!0}catch(s){return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:s.message,type:"danger"}),!1}});const ae=({statuses:m})=>{const n=a.useRef(),s=a.useRef(),c=a.useRef(),p=a.useRef(),v=a.useRef(),R=a.useRef(),N=a.useRef(),w=a.useRef(),x=a.useRef(),S=a.useRef(),_=a.useRef(),F=a.useRef(),C=a.useRef(),P=a.useRef(),T=a.useRef(),[G,D]=a.useState(!1),[l,A]=a.useState({}),[I,j]=a.useState([]),k=e=>{var r,i,d,y;e!=null&&e.id?D(!0):D(!1),p.current.value=(e==null?void 0:e.id)||null,Y(v.current,(r=e==null?void 0:e.client)==null?void 0:r.id,(i=e==null?void 0:e.client)==null?void 0:i.name),Y(R.current,(d=e==null?void 0:e.type)==null?void 0:d.id,(y=e==null?void 0:e.type)==null?void 0:y.name),N.current.value=(e==null?void 0:e.name)||null,w.current.value=(e==null?void 0:e.description)||null,x.current.value=e==null?void 0:e.cost,S.current.value=e!=null&&e.sign_at?moment(e.sign_at).format("YYYY-MM-DD"):null,_.current.value=e!=null&&e.starts_at?moment(e.starts_at).format("YYYY-MM-DD"):null,F.current.value=e!=null&&e.ends_at?moment(e.ends_at).format("YYYY-MM-DD"):null,$(s.current).modal("show")},q=async e=>{A(e);const r=await f.byProject(e.id);j(r),C.current.value=(e==null?void 0:e.id)||null,$(c.current).modal("show")},B=async e=>{e.preventDefault();const r={id:p.current.value||void 0,client_id:v.current.value,type_id:R.current.value,name:N.current.value,description:w.current.value,cost:x.current.value??void 0,sign_at:S.current.value??void 0,starts_at:_.current.value,ends_at:F.current.value};await E.save(r)&&($(n.current).dxDataGrid("instance").refresh(),$(s.current).modal("hide"))},V=async e=>{e.preventDefault();const r={payment_id:C.current.value||void 0,project_id:l.id,payment_type:P.current.value,amount:T.current.value};if(!await f.save(r))return;P.current.value=null,T.current.value=null;const d=await f.byProject(l.id),y=d.reduce((K,Q)=>Number(K)+Number(Q.amount),0),U={...l,total_payments:y,remaining_amount:l.cost-y};A(U),j(d),$(n.current).dxDataGrid("instance").refresh()},J=async({id:e,status:r})=>{await E.status({id:e,status:r})&&$(n.current).dxDataGrid("instance").refresh()},z=async e=>{await E.delete(e)&&$(n.current).dxDataGrid("instance").refresh()},H=async(e,r)=>{await E.projectStatus(e,r)&&$(n.current).dxDataGrid("instance").refresh()};return t.createElement(t.Fragment,null,t.createElement(ee,{gridRef:n,title:"Proyectos",rest:E,toolBar:e=>{e.unshift({widget:"dxButton",location:"after",options:{icon:"refresh",hint:"REFRESCAR TABLA",onClick:()=>$(n.current).dxDataGrid("instance").refresh()}}),e.unshift({widget:"dxButton",location:"after",options:{icon:"plus",hint:"NUEVO REGISTRO",onClick:()=>k()}})},filterValue:void 0,columns:[{dataField:"id",caption:"ID",dataType:"number",sortOrder:"asc"},{dataField:"client.name",caption:"Cliente",filterValue:o.GET.client||void 0},{dataField:"type.name",caption:"Tipo"},{dataField:"name",caption:"Proyecto"},{dataField:"cost",caption:"Costo",dataType:"number",width:150,cellTemplate:(e,{data:r})=>{const i=(r.total_payments/r.cost*100).toFixed(2);u(e,t.createElement(t.Fragment,null,t.createElement("p",{className:"mb-1 d-flex justify-content-between"},t.createElement("span",null,"S/.",Number(r.total_payments).toFixed(2)),t.createElement("b",{className:"float-end"},"S/.",Number(r.cost).toFixed(2))),t.createElement("div",{className:"progress progress-bar-alt-primary progress-sm mt-0 mb-0"},t.createElement("div",{className:"progress-bar bg-primary progress-animated wow animated animated",role:"progressbar","aria-valuenow":r.total_payments,"aria-valuemin":"0","aria-valuemax":r.cost,style:{width:`${i}%`,visibility:"visible",animationName:"animationProgress"}}))))}},{dataField:"project_status.name",caption:"Estado del proyecto",dataType:"string",cellTemplate:(e,{data:r})=>{e.attr("style","display: flex; gap: 4px; overflow: unset"),u(e,t.createElement(se,{className:"btn btn-xs btn-white rounded-pill",title:r.project_status.name,tippy:"Actualizar estado",icon:{icon:"fa fa-circle",color:r.project_status.color}},m.map(({id:i,name:d,color:y})=>t.createElement(le,{key:i,onClick:()=>H(r.id,i)},t.createElement("i",{className:"fa fa-circle",style:{color:y}})," ",d))))}},{dataField:"status",caption:"Estado",dataType:"boolean",cellTemplate:(e,{data:r})=>{switch(r.status){case 1:u(e,t.createElement("span",{className:"badge bg-success rounded-pill"},"Activo"));break;case 0:u(e,t.createElement("span",{className:"badge bg-danger rounded-pill"},"Inactivo"));break;default:u(e,t.createElement("span",{className:"badge bg-dark rounded-pill"},"Eliminado"));break}}},{caption:"Acciones",cellTemplate:(e,{data:r})=>{e.attr("style","display: flex; gap: 4px; overflow: unset"),u(e,t.createElement(h,{className:"btn btn-xs btn-soft-primary",title:"Editar",onClick:()=>k(r)},t.createElement("i",{className:"fa fa-pen"}))),u(e,t.createElement(h,{className:"btn btn-xs btn-soft-success",title:"Ver/Agregar pagos",onClick:()=>q(r)},t.createElement("i",{className:"fas fa-money-check-alt"}))),u(e,t.createElement(h,{className:"btn btn-xs btn-light",title:r.status===null?"Restaurar":"Cambiar estado",onClick:()=>J(r)},r.status===1?t.createElement("i",{className:"fa fa-toggle-on text-success"}):r.status===0?t.createElement("i",{className:"fa fa-toggle-off text-danger"}):t.createElement("i",{className:"fas fa-trash-restore"}))),u(e,t.createElement(h,{className:"btn btn-xs btn-soft-danger",title:"Eliminar",onClick:()=>z(r.id)},t.createElement("i",{className:"fa fa-trash-alt"})))},allowFiltering:!1,allowExporting:!1}]}),t.createElement(M,{modalRef:s,title:G?"Editar proyecto":"Agregar proyecto",onSubmit:B},t.createElement("div",{className:"row",id:"project-crud-container"},t.createElement("input",{ref:p,type:"hidden"}),t.createElement(O,{eRef:v,label:"Cliente",col:"col-12",dropdownParent:"#project-crud-container",searchAPI:"/api/clients/paginate",searchBy:"name",required:!0}),t.createElement(O,{eRef:R,label:"Tipo del proyecto",col:"col-md-4",dropdownParent:"#project-crud-container",searchAPI:"/api/types/paginate",searchBy:"name",required:!0}),t.createElement(b,{eRef:N,label:"Nombre del proyecto",col:"col-md-8",required:!0}),t.createElement(ne,{eRef:w,label:"Descripcion del proyecto",col:"col-12"}),t.createElement(b,{eRef:x,label:"Costo",col:"col-md-6",type:"number",required:!0}),t.createElement(b,{eRef:S,label:"Fecha firma",col:"col-md-6",type:"date"}),t.createElement(b,{eRef:_,label:"Fecha inicio",col:"col-md-6",type:"date",required:!0}),t.createElement(b,{eRef:F,label:"Fecha fin",col:"col-md-6",type:"date",required:!0}))),t.createElement(M,{modalRef:c,title:`Pagos de ${l==null?void 0:l.name} - S/.${l==null?void 0:l.cost}`,onSubmit:V},t.createElement("div",{className:"row"},t.createElement("input",{ref:C,type:"hidden"}),t.createElement(b,{eRef:P,label:"Concepto",col:"col-md-7",required:!0}),t.createElement("div",{className:"form-group col-md-5"},t.createElement("label",null,"Monto ",t.createElement("b",{className:"text-danger"},"*")),t.createElement("div",{className:"input-group"},t.createElement("input",{ref:T,type:"number",className:"form-control",placeholder:`Max: ${l==null?void 0:l.remaining_amount}`,min:0,max:l==null?void 0:l.remaining_amount}),t.createElement(re,{content:"Agregar pago"},t.createElement("button",{className:"btn input-group-text btn-dark waves-effect waves-light",type:"submit"},t.createElement("i",{className:"fa fa-plus"})))))),t.createElement("table",{className:"table table-bordered table-sm table-responsive table-striped mb-2"},t.createElement("thead",null,t.createElement("tr",null,t.createElement("th",null),t.createElement("th",null,"Fecha"),t.createElement("th",null,"Concepto"),t.createElement("th",null,"Monto"))),t.createElement("tbody",null,I.map(e=>t.createElement("tr",null,t.createElement("td",null),t.createElement("td",null,moment(e.created_at).format("LL")),t.createElement("td",null,e.payment_type),t.createElement("td",null,"S/.",e.amount))))),t.createElement("table",{className:"table table-bordered table-sm table-responsive table-striped mb-0",style:{width:"max-content",float:"right"}},t.createElement("tbody",null,t.createElement("tr",null,t.createElement("th",{colSpan:3,className:"text-end"},"Pagado"),t.createElement("td",null,"S/.",l==null?void 0:l.total_payments)),t.createElement("tr",null,t.createElement("th",{colSpan:3,className:"text-end"},"Por pagar"),t.createElement("td",null,"S/.",l==null?void 0:l.remaining_amount))))))};Z((m,n)=>{L(m).render(t.createElement(te,{...n,title:"Proyectos"},t.createElement(ae,{...n})))});