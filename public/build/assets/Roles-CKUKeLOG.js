import{R as t,C as D,c as S,r as l}from"./CreateReactScript-BS7_ejQX.js";import{i as G,A as P}from"./Adminto-C3KgdbI4.js";import{T as M,R as p,M as y,I as B,a as h}from"./InputFormGroup-BsGevjyq.js";import{R as g}from"./RolesRest-BEwuvCAh.js";import{T as O}from"./TextareaFormGroup-CFfWIkzF.js";import{P as k}from"./PermissionsRest-BhhmfvPb.js";const I=({title:s,label:a,id:n,name:c,value:i,checked:m,required:u,rounded:d=!1,style:b,className:f})=>t.createElement(G,{content:s,arrow:!0},t.createElement("div",{className:`form-check form-check-success ${f}`,style:{...b,cursor:"pointer"}},t.createElement("input",{className:`form-check-input ${d&&"rounded-circle"}`,type:"checkbox",value:i,name:c,id:n,defaultChecked:m,required:u,style:{cursor:"pointer"}}),t.createElement("label",{className:"form-check-label",htmlFor:n,style:{cursor:"pointer"}},a))),L=({id:s,children:a,className:n})=>t.createElement("div",{id:s,className:`accordion custom-accordion ${n}`},a),_=({title:s,id:a,parent:n,children:c,className:i})=>t.createElement("div",{className:"card mb-1"},t.createElement("div",{className:"card-header p-0",id:`heading-${a}`},t.createElement("h5",{className:"m-0"},t.createElement("a",{className:"d-block text-dark collapsed p-2","data-bs-toggle":"collapse",href:`#${a}`,"aria-expanded":"false"},s))),t.createElement("div",{id:a,className:"collapse","aria-labelledby":`heading-${a}`,"data-bs-parent":`#${n}`},t.createElement("div",{className:`card-body p-2 ${i}`},c))),q=({permissions:s})=>{s=Object.values(s.map(e=>{const[r]=e.name.split(".");return{...e,origin:r}}).reduce((e,r)=>(e[r.origin]||(e[r.origin]=[]),e[r.origin].push(r),e),{}));const a=l.useRef(),n=l.useRef(),c=l.useRef();l.useRef();const i=l.useRef(),m=l.useRef(),u=l.useRef(),d=l.useRef(),[b,f]=l.useState(!1),[v,N]=l.useState({}),x=e=>{e!=null&&e.id?f(!0):f(!1),m.current.value=(e==null?void 0:e.id)||null,u.current.value=(e==null?void 0:e.name)||null,d.current.value=(e==null?void 0:e.description)||null,$(n.current).modal("show")},w=async e=>{i.current.disabled=!0,N(e);const r=await k.byRole(e.id);i.current.disabled=!1,$("#permissions input").prop("checked",!1),r.forEach(({name:o})=>{$(`[name="${o}"]`).prop("checked",!0)}),$(c.current).modal("show")},F=async e=>{e.preventDefault();const r={id:m.current.value||void 0,name:u.current.value,description:d.current.value};await g.save(r)&&($(a.current).dxDataGrid("instance").refresh(),$(n.current).modal("hide"))},T=async e=>{e.preventDefault();const r=[...$("#permissions input:checked")].map(R=>R.value),o={role_id:v.id,permissions:r};await k.massiveByRole(o)&&($(c.current).modal("hide"),$(a.current).dxDataGrid("instance").refresh())},A=async e=>{await g.delete(e)&&$(a.current).dxDataGrid("instance").refresh()};return t.createElement(t.Fragment,null,t.createElement(M,{gridRef:a,title:"Roles",rest:g,toolBar:e=>{e.unshift({widget:"dxButton",location:"after",options:{icon:"refresh",hint:"REFRESCAR TABLA",onClick:()=>$(a.current).dxDataGrid("instance").refresh()}}),e.unshift({widget:"dxButton",location:"after",options:{icon:"plus",hint:"NUEVO REGISTRO",onClick:()=>x()}})},columns:[{dataField:"id",caption:"ID",dataType:"number",sortOrder:"asc"},{dataField:"name",caption:"Rol"},{dataField:"description",caption:"Descripcion"},{dataField:"created_at",caption:"Fecha creacion",dataType:"date",cellTemplate:(e,{data:r})=>{p(e,t.createElement("span",null,moment(r.created_at).format("LL")))}},{dataField:"updated_at",caption:"Fecha actualizacion",dataType:"date",cellTemplate:(e,{data:r})=>{p(e,t.createElement("span",null,moment(r.updated_at).format("LL")))}},{caption:"Acciones",cellTemplate:(e,{data:r})=>{e.attr("style","display: flex; gap: 4px; overflow: unset"),p(e,t.createElement(h,{className:"btn btn-xs btn-soft-primary",title:"Editar",onClick:()=>x(r)},t.createElement("i",{className:"fa fa-pen"}))),p(e,t.createElement(h,{eRef:i,className:"btn btn-xs btn-soft-dark",title:"Modificar permisos",onClick:()=>w(r),"data-loading-text":'<i class="fa fa-spinner fa-spin"></i>'},t.createElement("i",{className:"fas fa-th-list"}))),p(e,t.createElement(h,{className:"btn btn-xs btn-soft-danger",title:"Eliminar",onClick:()=>A(r.id)},t.createElement("i",{className:"fa fa-trash-alt"})))},allowFiltering:!1,allowExporting:!1}]}),t.createElement(y,{modalRef:n,title:b?"Editar rol":"Agregar rol",onSubmit:F},t.createElement("div",{className:"row"},t.createElement("input",{ref:m,type:"hidden"}),t.createElement(B,{eRef:u,label:"Rol",col:"col-12",required:!0}),t.createElement(O,{eRef:d,label:"Descripcion",col:"col-12"}))),t.createElement(y,{modalRef:c,title:`Permisos para ${v.name}`,btnSubmitText:"Guardar",onSubmit:T,size:"sm"},t.createElement(L,{id:"permissions"},s.map((e,r)=>{const o=e[0].origin;return t.createElement(_,{key:`accordion-${r}`,id:`permission-${o}`,title:o,parent:"permissions",className:"d-flex gap-2 flex-wrap flex-row"},e.map(({id:E,name:R,description:C})=>t.createElement(I,{key:`permission-${E}`,className:"mb-0",id:`permission-ck-${E}`,label:R.replace(`${o}.`,""),name:R,value:E,title:C,style:{width:"max-content"},rounded:!0})))}))))};D((s,a)=>{S(s).render(t.createElement(P,{...a,title:"Roles"},t.createElement(q,{...a})))});
