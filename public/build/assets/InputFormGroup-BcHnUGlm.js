import{r as u,R as e,c as p}from"./CreateReactScript-BhyNrTql.js";import{i as b}from"./Adminto-Dzn_iDrM.js";const f=({gridRef:t,rest:r,columns:a,toolBar:l,masterDetail:s,filterValue:o})=>(u.useEffect(()=>{$(t.current).dxDataGrid({language:"es",dataSource:{load:async n=>await r.paginate(n)},onToolbarPreparing:n=>{const{items:c}=n.toolbarOptions;l(c)},remoteOperations:!0,columnResizingMode:"widget",columnAutoWidth:!0,scrollbars:"auto",filterPanel:{visible:!0},searchPanel:{visible:!0},headerFilter:{visible:!0,search:{enabled:!0}},height:"calc(100vh - 185px)",filterValue:o,rowAlternationEnabled:!0,showBorders:!0,filterRow:{visible:!0,applyFilter:"auto"},filterBuilderPopup:{visible:!1,position:{of:window,at:"top",my:"top",offset:{y:10}}},paging:{pageSize:10},pager:{visible:!0,allowedPageSizes:[5,10,25,50,100],showPageSizeSelector:!0,showInfo:!0,showNavigationButtons:!0},allowFiltering:!0,scrolling:{mode:"standard",useNative:!0,preloadEnabled:!0,rowRenderingMode:"standard"},columnChooser:{title:"Mostrar/Ocultar columnas",enabled:!0,mode:"select",search:{enabled:!0}},columns:a,masterDetail:s}).dxDataGrid("instance")},[null]),e.createElement("div",{ref:t})),h=({title:t,gridRef:r,rest:a,columns:l,toolBar:s,masterDetail:o,filterValue:n=[]})=>e.createElement("div",{className:"row"},e.createElement("div",{className:"col-12"},e.createElement("div",{className:"card"},e.createElement("div",{className:"card-body"},e.createElement("h4",{className:"header-title"},e.createElement("div",{id:"header-title-options",className:"float-end"}),e.createElement("span",{id:"header-title-prefix"})," Lista de ",t," ",e.createElement("span",{id:"header-title-suffix"})),e.createElement(f,{gridRef:r,rest:a,columns:l.filter(Boolean),toolBar:s,masterDetail:o,filterValue:n}))))),v=({modalRef:t,title:r="Modal",isStatic:a=!1,size:l="md",children:s,bodyClass:o="",btnCancelText:n,btnSubmitText:c,hideFooter:i,onSubmit:d=m=>{m.preventDefault(),$(t.current).modal("hide")}})=>e.createElement("form",{className:"modal fade",ref:t,tabIndex:"-1","aria-hidden":"true","dataa-bs-backdrop":a?"static":"",onSubmit:d,autoComplete:"off"},e.createElement("div",{className:`modal-dialog modal-dialog-centered modal-${l??"md"}`},e.createElement("div",{className:"modal-content "},e.createElement("div",{className:"modal-header"},e.createElement("h4",{className:"modal-title"},r),e.createElement("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})),e.createElement("div",{className:`modal-body ${o??""}`},s),!i&&e.createElement("div",{className:"modal-footer"},e.createElement("button",{className:"btn btn-sm btn-danger pull-left",type:"button","data-bs-dismiss":"modal"},n??"Cerrar"),e.createElement("button",{className:"btn btn-sm btn-success pull-right",type:"submit"},c??"Aceptar"))))),N=(t,r)=>{const a=document.createElement("div");t.append(a),p(a).render(r)},w=({title:t,className:r,onClick:a,children:l,eRef:s,...o})=>e.createElement(b,{content:t,arrow:!0},e.createElement("button",{ref:s,className:r,onClick:a,...o},l)),x=({col:t,label:r,eRef:a,type:l="text",placeholder:s,required:o=!1,disabled:n=!1})=>e.createElement("div",{className:`form-group ${t} mb-2`},e.createElement("label",{htmlFor:""},r," ",o&&e.createElement("b",{className:"text-danger"},"*")),e.createElement("input",{ref:a,type:l,className:"form-control",placeholder:s,required:o,disabled:n}));export{x as I,v as M,N as R,h as T,w as a};