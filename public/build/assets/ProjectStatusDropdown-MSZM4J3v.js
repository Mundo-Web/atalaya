var O=Object.defineProperty;var A=(l,e,n)=>e in l?O(l,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):l[e]=n;var y=(l,e,n)=>(A(l,typeof e!="symbol"?e+"":e,n),n);import{m as a,r as o,R as t}from"./CreateReactScript-BZNFBiYC.js";import{M as Y}from"./Table-7H_SmTdZ.js";import{I as P}from"./InputFormGroup-BUOjBXeO.js";import{i as k,S as B}from"./Adminto-98sYPb9M.js";import{T as x}from"./TippyButton-CmK-eco3.js";import{D as I}from"./Dropdown-Bjfbcv4z.js";import{D as q}from"./DropdownItem-mg3Fv28F.js";import{P as J}from"./ProjectsRest-Ct6mlSHF.js";class i{}y(i,"paginate",async e=>{const{result:n}=await a.Fetch("/api/payments/paginate",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)});return n}),y(i,"byProject",async e=>{const{result:n}=await a.Fetch(`/api/payments/project/${e}`);return(n==null?void 0:n.data)??[]}),y(i,"save",async e=>{try{const{status:n,result:s}=await a.Fetch("/api/payments",{method:"POST",body:JSON.stringify(e)});if(!n)throw new Error((s==null?void 0:s.message)||"Ocurrio un error inesperado");return a.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:s.message,type:"success"}),!0}catch(n){return a.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:n.message,type:"danger"}),!1}}),y(i,"status",async({id:e,status:n})=>{try{const{status:s,result:c}=await a.Fetch("/api/payments/status",{method:"PATCH",body:JSON.stringify({id:e,status:n})});if(!s)throw new Error((c==null?void 0:c.message)??"Ocurrio un error inesperado");return a.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:c.message,type:"success"}),!0}catch(s){return a.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:s.message,type:"danger"}),!1}}),y(i,"delete",async e=>{try{const{status:n,result:s}=await a.Fetch(`/api/payments/${e}`,{method:"DELETE"});if(!n)throw new Error((s==null?void 0:s.message)??"Ocurrio un error inesperado");return a.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:s.message,type:"success"}),!0}catch(n){return a.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:n.message,type:"danger"}),!1}});const Z=({can:l,dataLoaded:e,setDataLoaded:n,grid2refresh:s})=>{const c=o.useRef(),m=o.useRef(),p=o.useRef(),f=o.useRef(),E=o.useRef(),g=o.useRef(),[_,b]=o.useState([]),[v,N]=o.useState(!1),[w,S]=o.useState(Number(e==null?void 0:e.remaining_amount));o.useEffect(()=>{e.id&&C(),$(c.current).on("hidden.bs.modal",()=>{n({}),b([]),N(!1),m.current.value=null,p.current.value=null,f.current.value=null,g.current.value=null})},[e]);const C=async()=>{const r=await i.byProject(e==null?void 0:e.id);b(r),S(Number(e==null?void 0:e.remaining_amount)),p.current.value=(e==null?void 0:e.id)||null,$(c.current).modal("show")},D=async r=>{r.preventDefault();const u={id:m.current.value||void 0,payment_id:p.current.value,project_id:e.id,payment_type:f.current.value,amount:g.current.value,date:E.current.value};await i.save(u)&&(m.current.value=null,E.current.value=null,f.current.value=null,g.current.value=null,await j(),s.refresh())},j=async()=>{const r=await i.byProject(e.id),u=r.reduce((T,F)=>Number(T)+Number(F.amount),0),h={...e,total_payments:u,remaining_amount:e.cost-u};n(h),b(r)},R=async r=>{m.current.value=r.id,f.current.value=r.payment_type,g.current.value=r.amount,E.current.value=r.date||moment(r.created_at).format("YYYY-MM-DD"),S(Number(e==null?void 0:e.remaining_amount)+Number(r.amount)),N(!0)},M=async r=>{const{isConfirmed:u}=await B.fire({title:"Estas seguro de eliminar este pago?",text:"No podras revertir esto!",icon:"warning",showCancelButton:!0,confirmButtonText:"Continuar",cancelButtonText:"Cancelar"});!u||!await i.delete(r)||(await j(),s.refresh())};return t.createElement(Y,{modalRef:c,title:`Pagos de ${e==null?void 0:e.name} - S/.${e==null?void 0:e.cost}`,onSubmit:D,hideButtonSubmit:!0},t.createElement("div",{className:`row ${!l("projects","all","addpayment","editpayment")&&"d-none"}`},t.createElement("input",{ref:p,type:"hidden"}),t.createElement("input",{ref:m,type:"hidden"}),t.createElement(P,{eRef:f,label:"Concepto",col:"col-12",required:!0}),t.createElement(P,{eRef:E,type:"date",label:"Fecha",col:"col-md-7",required:!0}),t.createElement("div",{className:"form-group col-md-5"},t.createElement("label",null,"Monto ",t.createElement("b",{className:"text-danger"},"*")),t.createElement("div",{className:"input-group"},t.createElement("input",{ref:g,type:"number",className:"form-control",placeholder:`Max: ${w}`,min:0,max:w||0,step:.01}),t.createElement(k,{content:v?"Actualizar pago":"Agregar pago"},t.createElement("button",{className:"btn input-group-text btn-dark waves-effect waves-light",type:"submit"},t.createElement("i",{className:`fa ${v?"fa-save":"fa-plus"}`})))))),t.createElement("hr",{className:"mb-2 mt-0"}),t.createElement("table",{className:"table table-bordered table-sm table-responsive table-striped mb-2"},t.createElement("thead",null,t.createElement("tr",null,l("projects","all","editpayment","deletepayment")&&t.createElement("th",null),t.createElement("th",null,"Concepto"),t.createElement("th",null,"Fecha"),t.createElement("th",null,"Monto"))),t.createElement("tbody",null,_.map(r=>(r.date||(r.date=moment(r.created_at).format("YYYY-MM-DD")),r)).sort((r,u)=>new Date(r.date)-new Date(u.date)).map(r=>t.createElement("tr",{key:`project-payment-${r.id}`},l("projects","all","editpayment","deletepayment")&&t.createElement("td",null,t.createElement("div",{className:"d-flex align-items-center gap-1"},l("projects","all","editpayment")&&t.createElement(x,{title:"Editar pago",className:"btn btn-xs btn-soft-primary",type:"button",onClick:()=>R(r)},t.createElement("i",{className:"fa fa-pen"})),l("projects","all","deletepayment")&&t.createElement(x,{title:"Eliminar pago",className:"btn btn-xs btn-soft-danger",type:"button",onClick:()=>M(r.id)},t.createElement("i",{className:"fa fa-trash"})))),t.createElement("td",null,r.payment_type),t.createElement("td",null,moment(r.date).format("LL")),t.createElement("td",null,"S/.",r.amount))))),t.createElement("table",{className:"table table-bordered table-sm table-responsive table-striped mb-0",style:{width:"max-content",float:"right"}},t.createElement("tbody",null,t.createElement("tr",null,t.createElement("th",{colSpan:3,className:"text-end"},"Pagado"),t.createElement("td",null,"S/.",e==null?void 0:e.total_payments)),t.createElement("tr",null,t.createElement("th",{colSpan:3,className:"text-end"},"Por pagar"),t.createElement("td",null,"S/.",e==null?void 0:e.remaining_amount)))))},d=({statuses:l,data:e,onChange:n})=>{const s=async(c,m)=>{await J.projectStatus(c,m)&&n()};return t.createElement(t.Fragment,null,t.createElement(I,{className:"btn btn-xs btn-white rounded-pill",title:e.project_status.name,tippy:"Actualizar estado",icon:{icon:"fa fa-circle",color:e.project_status.color}},l.map(({id:c,name:m,color:p})=>t.createElement(q,{key:c,onClick:()=>s(e.id,c)},t.createElement("i",{className:"fa fa-circle",style:{color:p}})," ",m))))};export{Z as P,d as a};
