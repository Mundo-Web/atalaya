var Y=Object.defineProperty;var k=(n,e,r)=>e in n?Y(n,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[e]=r;var p=(n,e,r)=>(k(n,typeof e!="symbol"?e+"":e,r),r);import{m as o,r as i,R as t}from"./CreateReactScript-BZNFBiYC.js";import{M as D}from"./Table-7H_SmTdZ.js";import{I as C}from"./InputFormGroup-BUOjBXeO.js";import{i as I,S as q}from"./Adminto-98sYPb9M.js";import{T as _}from"./TippyButton-CmK-eco3.js";import{D as J}from"./Dropdown-Bjfbcv4z.js";import{D as z}from"./DropdownItem-mg3Fv28F.js";import{P as G}from"./Number2Currency-BMjtDIra.js";import{S as x,a as H}from"./SetSelectValue-TcZeamg_.js";class y{}p(y,"paginate",async e=>{const{result:r}=await o.Fetch("/api/payments/paginate",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)});return r}),p(y,"byProject",async e=>{const{result:r}=await o.Fetch(`/api/payments/project/${e}`);return(r==null?void 0:r.data)??[]}),p(y,"save",async e=>{try{const{status:r,result:l}=await o.Fetch("/api/payments",{method:"POST",body:JSON.stringify(e)});if(!r)throw new Error((l==null?void 0:l.message)||"Ocurrio un error inesperado");return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:l.message,type:"success"}),!0}catch(r){return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:r.message,type:"danger"}),!1}}),p(y,"status",async({id:e,status:r})=>{try{const{status:l,result:c}=await o.Fetch("/api/payments/status",{method:"PATCH",body:JSON.stringify({id:e,status:r})});if(!l)throw new Error((c==null?void 0:c.message)??"Ocurrio un error inesperado");return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:c.message,type:"success"}),!0}catch(l){return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:l.message,type:"danger"}),!1}}),p(y,"delete",async e=>{try{const{status:r,result:l}=await o.Fetch(`/api/payments/${e}`,{method:"DELETE"});if(!r)throw new Error((l==null?void 0:l.message)??"Ocurrio un error inesperado");return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:l.message,type:"success"}),!0}catch(r){return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:r.message,type:"danger"}),!1}});const te=({can:n,dataLoaded:e,setDataLoaded:r,grid2refresh:l})=>{const c=i.useRef(),a=i.useRef(),u=i.useRef(),g=i.useRef(),b=i.useRef(),m=i.useRef(),[h,v]=i.useState([]),[N,j]=i.useState(!1),[S,P]=i.useState(Number(e==null?void 0:e.remaining_amount));i.useEffect(()=>{e.id&&M(),$(c.current).on("hidden.bs.modal",()=>{r({}),v([]),j(!1),a.current.value=null,u.current.value=null,g.current.value=null,m.current.value=null})},[e]);const M=async()=>{const s=await y.byProject(e==null?void 0:e.id);v(s),P(Number(e==null?void 0:e.remaining_amount)),u.current.value=(e==null?void 0:e.id)||null,$(c.current).modal("show")},A=async s=>{s.preventDefault();const f={id:a.current.value||void 0,payment_id:u.current.value,project_id:e.id,payment_type:g.current.value,amount:m.current.value,date:b.current.value};await y.save(f)&&(a.current.value=null,b.current.value=null,g.current.value=null,m.current.value=null,await R(),l.refresh())},R=async()=>{const s=await y.byProject(e.id),f=s.reduce((T,B)=>Number(T)+Number(B.amount),0),w={...e,total_payments:f,remaining_amount:e.cost-f};r(w),v(s)},F=async s=>{a.current.value=s.id,g.current.value=s.payment_type,m.current.value=s.amount,b.current.value=s.date||moment(s.created_at).format("YYYY-MM-DD"),P(Number(e==null?void 0:e.remaining_amount)+Number(s.amount)),j(!0)},O=async s=>{const{isConfirmed:f}=await q.fire({title:"Estas seguro de eliminar este pago?",text:"No podras revertir esto!",icon:"warning",showCancelButton:!0,confirmButtonText:"Continuar",cancelButtonText:"Cancelar"});!f||!await y.delete(s)||(await R(),l.refresh())};return t.createElement(D,{modalRef:c,title:`Pagos de ${e==null?void 0:e.name} - S/.${e==null?void 0:e.cost}`,onSubmit:A,hideButtonSubmit:!0},t.createElement("div",{className:`row ${!n("projects","all","addpayment","editpayment")&&"d-none"}`},t.createElement("input",{ref:u,type:"hidden"}),t.createElement("input",{ref:a,type:"hidden"}),t.createElement(C,{eRef:g,label:"Concepto",col:"col-12",required:!0}),t.createElement(C,{eRef:b,type:"date",label:"Fecha",col:"col-md-7",required:!0}),t.createElement("div",{className:"form-group col-md-5"},t.createElement("label",null,"Monto ",t.createElement("b",{className:"text-danger"},"*")),t.createElement("div",{className:"input-group"},t.createElement("input",{ref:m,type:"number",className:"form-control",placeholder:`Max: ${S}`,min:0,max:S||0,step:.01}),t.createElement(I,{content:N?"Actualizar pago":"Agregar pago"},t.createElement("button",{className:"btn input-group-text btn-dark waves-effect waves-light",type:"submit"},t.createElement("i",{className:`fa ${N?"fa-save":"fa-plus"}`})))))),t.createElement("hr",{className:"mb-2 mt-0"}),t.createElement("table",{className:"table table-bordered table-sm table-responsive table-striped mb-2"},t.createElement("thead",null,t.createElement("tr",null,n("projects","all","editpayment","deletepayment")&&t.createElement("th",null),t.createElement("th",null,"Concepto"),t.createElement("th",null,"Fecha"),t.createElement("th",null,"Monto"))),t.createElement("tbody",null,h.map(s=>(s.date||(s.date=moment(s.created_at).format("YYYY-MM-DD")),s)).sort((s,f)=>new Date(s.date)-new Date(f.date)).map(s=>t.createElement("tr",{key:`project-payment-${s.id}`},n("projects","all","editpayment","deletepayment")&&t.createElement("td",null,t.createElement("div",{className:"d-flex align-items-center gap-1"},n("projects","all","editpayment")&&t.createElement(_,{title:"Editar pago",className:"btn btn-xs btn-soft-primary",type:"button",onClick:()=>F(s)},t.createElement("i",{className:"fa fa-pen"})),n("projects","all","deletepayment")&&t.createElement(_,{title:"Eliminar pago",className:"btn btn-xs btn-soft-danger",type:"button",onClick:()=>O(s.id)},t.createElement("i",{className:"fa fa-trash"})))),t.createElement("td",null,s.payment_type),t.createElement("td",null,moment(s.date).format("LL")),t.createElement("td",null,"S/.",s.amount))))),t.createElement("table",{className:"table table-bordered table-sm table-responsive table-striped mb-0",style:{width:"max-content",float:"right"}},t.createElement("tbody",null,t.createElement("tr",null,t.createElement("th",{colSpan:3,className:"text-end"},"Pagado"),t.createElement("td",null,"S/.",e==null?void 0:e.total_payments)),t.createElement("tr",null,t.createElement("th",{colSpan:3,className:"text-end"},"Por pagar"),t.createElement("td",null,"S/.",e==null?void 0:e.remaining_amount)))))},re=({statuses:n,data:e,onChange:r})=>{const l=async(c,a)=>{await G.projectStatus(c,a)&&r()};return t.createElement(t.Fragment,null,t.createElement(J,{className:"btn btn-xs btn-white rounded-pill",title:e.project_status.name,tippy:"Actualizar estado",icon:{icon:"fa fa-circle",color:e.project_status.color}},n.map(({id:c,name:a,color:u})=>t.createElement(z,{key:c,onClick:()=>l(e.id,c)},t.createElement("i",{className:"fa fa-circle",style:{color:u}})," ",a))))};class E{}p(E,"getUser",async e=>{const{result:r}=await o.Fetch(`/api/users-by-projects/${e}`);return(r==null?void 0:r.data)??null}),p(E,"byProject",async e=>{const{result:r}=await o.Fetch(`/api/users-by-projects/project/${e}`);return(r==null?void 0:r.data)??[]}),p(E,"massiveByProject",async e=>{try{const{status:r,result:l}=await o.Fetch("/api/users-by-projects/project",{method:"PATCH",body:JSON.stringify(e)});if(!r)throw new Error((l==null?void 0:l.message)||"Ocurrio un error inesperado");return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:l.message,type:"success"}),!0}catch(r){return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:r.message,type:"danger"}),!1}});const ne=({dataLoaded:n,setDataLoaded:e,grid2refresh:r})=>{var b;const l=i.useRef(),c=i.useRef(),a=i.useRef();i.useEffect(()=>{n.id&&u(),$(l.current).on("hidden.bs.modal",()=>{c.current.value=null,x(a.current,null,null),e({})})},[n]);const u=async()=>{const m=await E.byProject(n==null?void 0:n.id);c.current.value=(n==null?void 0:n.id)||null,x(a.current,m,"id","fullname"),$(l.current).modal("show")},g=async m=>{m.preventDefault();const h={project_id:c.current.value,users:$(a.current).val()};console.log(h),await E.massiveByProject(h)&&($(l.current).modal("hide"),r.refresh())};return t.createElement(D,{modalRef:l,title:"Asignar usuarios al proyecto",onSubmit:g},t.createElement("div",{id:"assign-users-container"},t.createElement("p",null,"Que usuarios deseas asignar al proyecto ",t.createElement("b",null,n==null?void 0:n.name)," de ",t.createElement("b",null,(b=n==null?void 0:n.client)==null?void 0:b.name)),t.createElement("input",{ref:c,type:"hidden"}),t.createElement(H,{eRef:a,label:"Usuarios a asignar",col:"col-12",dropdownParent:"#assign-users-container",searchAPI:"/api/users/paginate",searchBy:"fullname",multiple:!0})))};export{ne as A,te as P,E as U,re as a};
