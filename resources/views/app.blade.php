@php
  $route = Route::currentRouteName();
  $component = Router::components[$route];
  $admintoInstance = isset($component['adminto-instance']) ? $component['adminto-instance'] : false;
@endphp

<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  <title>Gestion de clientes | SoDe World</title>
  <link rel="shortcut icon" href="assets/img/favicon/favicon.svg" type="image/png">

  @if ($admintoInstance)
    <link href="/lte/assets/css/config/default/bootstrap.min.css" rel="stylesheet" type="text/css"
      id="bs-default-stylesheet" />
      <script src="/lte/assets/libs/tippy.js/tippy.all.min.js"></script>
    <link href="/lte/assets/css/config/default/app.min.css" rel="stylesheet" type="text/css"
      id="app-default-stylesheet" />

    <link href="/lte/assets/css/config/default/bootstrap-dark.min.css" rel="stylesheet" type="text/css"
      id="bs-dark-stylesheet" disabled="disabled" />
    <link href="/lte/assets/css/config/default/app-dark.min.css" rel="stylesheet" type="text/css"
      id="app-dark-stylesheet" disabled="disabled" />

    <!-- icons -->
    <link href="/lte/assets/css/icons.min.css" rel="stylesheet" type="text/css" />

    {{-- DxDataGrid Styles --}}
    <link href="/lte/assets/libs/dxdatagrid/css/dx.light.css" rel="stylesheet"
    type="text/css">
  @endif

  @vite('resources/js/' . $component['component'])
  @inertiaHead
</head>

<body class="loading"
  data-layout='{"mode": "light", "width": "fluid", "menuPosition": "fixed", "sidebar": { "color": "light", "size": "default", "showuser": true}, "topbar": {"color": "light"}, "showRightSidebarOnPageLoad": true}'>
  @inertia

  @if ($admintoInstance)
    <div class="rightbar-overlay"></div>

    <!-- Vendor js -->
    <script src="/lte/assets/js/vendor.min.js"></script>

    <!-- App js -->
    <script src="/lte/assets/js/app.min.js"></script>

    <script src="/lte/assets/libs/dxdatagrid/js/dx.all.js"></script>
  @endif
</body>

</html>
