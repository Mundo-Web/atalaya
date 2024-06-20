import{R as t,C as D,c as A,r as l}from"./CreateReactScript-BZNFBiYC.js";import{T as G,R as d,M as x}from"./Table-7H_SmTdZ.js";import{P as y}from"./PermissionsRest-BHvc_BPG.js";import{R}from"./RolesRest-BIP0dnCB.js";import{i as S,A as M}from"./Adminto-98sYPb9M.js";import{I as P}from"./InputFormGroup-BUOjBXeO.js";import{T as B}from"./TextareaFormGroup-Ch_FAxDs.js";import{T as g}from"./TippyButton-CmK-eco3.js";const _=({id:s,children:a,className:n})=>t.createElement("div",{id:s,className:`accordion custom-accordion ${n}`},a),I=({title:s,id:a,parent:n,children:i,className:m,isOpened:o})=>t.createElement("div",{className:"card mb-1"},t.createElement("div",{className:"card-header p-0",id:`heading-${a}`},t.createElement("h5",{className:"m-0"},t.createElement("a",{className:`d-block text-dark ${!o&&"collapsed"} p-2`,"data-bs-toggle":"collapse",href:`#${a}`,"aria-expanded":"false"},s))),t.createElement("div",{id:a,className:`collapse ${o&&"show"}`,"aria-labelledby":`heading-${a}`,"data-bs-parent":`#${n}`},t.createElement("div",{className:`card-body p-2 ${m}`},i))),L=({title:s,label:a,id:n,name:i,value:m,checked:o,required:u,rounded:b=!1,style:p,className:f})=>t.createElement(S,{content:s,arrow:!0},t.createElement("div",{className:`form-check form-check-success ${f}`,style:{...p,cursor:"pointer"}},t.createElement("input",{className:`form-check-input ${b&&"rounded-circle"}`,type:"checkbox",value:m,name:i,id:n,defaultChecked:o,required:u,style:{cursor:"pointer"}}),t.createElement("label",{className:"form-check-label",htmlFor:n,style:{cursor:"pointer"}},a))),q=({permissions:s})=>{s=Object.values(s.map(e=>{const[r]=e.name.split(".");return{...e,origin:r}}).reduce((e,r)=>(e[r.origin]||(e[r.origin]=[]),e[r.origin].push(r),e),{}));const a=l.useRef(),n=l.useRef(),i=l.useRef();l.useRef();const m=l.useRef(),o=l.useRef(),u=l.useRef(),[b,p]=l.useState(!1),[f,k]=l.useState({}),v=e=>{e!=null&&e.id?p(!0):p(!1),m.current.value=(e==null?void 0:e.id)||null,o.current.value=(e==null?void 0:e.name)||null,u.current.value=(e==null?void 0:e.description)||null,$(n.current).modal("show")},N=async e=>{k(e);const r=await y.byRole(e.id);$("#permissions input").prop("checked",!1),r.forEach(({name:c})=>{$(`[name="${c}"]`).prop("checked",!0)}),$(i.current).modal("show")},w=async e=>{e.preventDefault();const r={id:m.current.value||void 0,name:o.current.value,description:u.current.value};await R.save(r)&&($(a.current).dxDataGrid("instance").refresh(),$(n.current).modal("hide"))},F=async e=>{e.preventDefault();const r=[...$("#permissions input:checked")].map(h=>h.value),c={role_id:f.id,permissions:r};await y.massiveByRole(c)&&($(i.current).modal("hide"),$(a.current).dxDataGrid("instance").refresh())},T=async e=>{await R.delete(e)&&$(a.current).dxDataGrid("instance").refresh()};return t.createElement(t.Fragment,null,t.createElement(G,{gridRef:a,title:"Roles",rest:R,toolBar:e=>{e.unshift({widget:"dxButton",location:"after",options:{icon:"refresh",hint:"Refrescar tabla",onClick:()=>$(a.current).dxDataGrid("instance").refresh()}}),e.unshift({widget:"dxButton",location:"after",options:{icon:"plus",hint:"Nuevo registro",onClick:()=>v()}})},columns:[{dataField:"id",caption:"ID",dataType:"number",sortOrder:"asc"},{dataField:"name",caption:"Rol"},{dataField:"description",caption:"Descripcion"},{dataField:"created_at",caption:"Fecha creacion",dataType:"date",cellTemplate:(e,{data:r})=>{d(e,t.createElement("span",null,moment(r.created_at).format("LL")))}},{dataField:"updated_at",caption:"Fecha actualizacion",dataType:"date",cellTemplate:(e,{data:r})=>{d(e,t.createElement("span",null,moment(r.updated_at).format("LL")))}},{caption:"Acciones",cellTemplate:(e,{data:r})=>{e.attr("style","display: flex; gap: 4px; overflow: unset"),d(e,t.createElement(g,{className:"btn btn-xs btn-soft-primary",title:"Editar",onClick:()=>v(r)},t.createElement("i",{className:"fa fa-pen"}))),d(e,t.createElement(g,{className:"btn btn-xs btn-soft-dark",title:"Modificar permisos",onClick:()=>N(r),"data-loading-text":'<i class="fa fa-spinner fa-spin"></i>'},t.createElement("i",{className:"fas fa-th-list"}))),d(e,t.createElement(g,{className:"btn btn-xs btn-soft-danger",title:"Eliminar",onClick:()=>T(r.id)},t.createElement("i",{className:"fa fa-trash-alt"})))},allowFiltering:!1,allowExporting:!1}]}),t.createElement(x,{modalRef:n,title:b?"Editar rol":"Agregar rol",onSubmit:w},t.createElement("div",{className:"row"},t.createElement("input",{ref:m,type:"hidden"}),t.createElement(P,{eRef:o,label:"Rol",col:"col-12",required:!0}),t.createElement(B,{eRef:u,label:"Descripcion",col:"col-12"}))),t.createElement(x,{modalRef:i,title:`Permisos para ${f.name}`,btnSubmitText:"Guardar",onSubmit:F,size:"sm"},t.createElement(_,{id:"permissions"},s.map((e,r)=>{const c=e[0].origin;return t.createElement(I,{key:`accordion-${r}`,id:`permission-${c}`,title:c,parent:"permissions",className:"d-flex gap-2 flex-wrap flex-row"},e.map(({id:E,name:h,description:C})=>t.createElement(L,{key:`permission-${E}`,className:"mb-0",id:`permission-ck-${E}`,label:h.replace(`${c}.`,""),name:h,value:E,title:C,style:{width:"max-content"},rounded:!0})))}))))};D((s,a)=>{A(s).render(t.createElement(M,{...a,title:"Roles"},t.createElement(q,{...a})))});
