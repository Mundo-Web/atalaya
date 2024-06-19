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
  <title>Gestion de clientes | Atalaya</title>
  <link rel="shortcut icon" href="/assets/img/icon.svg" type="image/png">

  @if ($admintoInstance)
    <link href="/lte/assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
    <script src="/lte/assets/libs/tippy.js/tippy.all.min.js"></script>

    {{-- QuillJs Styles --}}
    <link href="/lte/assets/libs/quill/quill.snow.css" rel="stylesheet" type="text/css" />
    <link href="/lte/assets/libs/quill/quill.bubble.css" rel="stylesheet" type="text/css" />

    {{-- Bootstrap Styles --}}
    <link href="/lte/assets/css/config/default/bootstrap.min.css" rel="stylesheet" type="text/css"
      id="bs-default-stylesheet" />
    <link href="/lte/assets/css/config/default/bootstrap-dark.min.css" rel="stylesheet" type="text/css"
      id="bs-dark-stylesheet" disabled="disabled" />

    {{-- App Styles --}}
    <link href="/lte/assets/css/config/default/app.css" rel="stylesheet" type="text/css" id="app-default-stylesheet" />
    <link href="/lte/assets/css/config/default/app-dark.css" rel="stylesheet" type="text/css" id="app-dark-stylesheet"
      disabled="disabled" />

    {{-- icons --}}
    <link href="/lte/assets/css/icons.min.css" rel="stylesheet" type="text/css" />

    {{-- DxDataGrid Styles --}}
    <link href="/lte/assets/libs/dxdatagrid/css/dx.light.compact.css?v=06d3ebc8-645c-4d80-a600-c9652743c426"
      rel="stylesheet" type="text/css" id="dg-default-stylesheet" />
    <link href="/lte/assets/libs/dxdatagrid/css/dx.dark.compact.css?v=06d3ebc8-645c-4d80-a600-c9652743c426"
      rel="stylesheet" type="text/css" id="dg-dark-stylesheet" disabled="disabled" />
  @endif

  @vite('resources/js/' . $component['component'])
  @inertiaHead
</head>

<body class="loading"
  data-layout='{"mode": "light", "width": "fluid", "menuPosition": "fixed", "sidebar": { "color": "light", "size": "default", "showuser": true}, "topbar": {"color": "light"}, "showRightSidebarOnPageLoad": false}'>
  @inertia

  @if ($admintoInstance)
    <div class="rightbar-overlay"></div>
    <script src="/lte/assets/libs/qrcodejs/qrcode.min.js"></script>
    <!-- Extends js -->
    <script src="/assets/js/file.extend.js"></script>
    <script src="/assets/js/storage.extend.js"></script>

    <!-- Vendor js -->
    <script src="/lte/assets/js/vendor.min.js"></script>

    <script src="/lte/assets/libs/quill/quill.min.js"></script>
    <script src="/lte/assets/libs/select2/js/select2.full.min.js"></script>

    <!-- App js -->
    <script src="/lte/assets/js/app.js?v={{ uniqid() }}"></script>

    <script src="/lte/assets/libs/dxdatagrid/js/dx.all.js"></script>
    <script src="/lte/assets/libs/dxdatagrid/js/localization/dx.messages.es.js"></script>
    <script src="/lte/assets/libs/dxdatagrid/js/localization/dx.messages.en.js"></script>
    <script src="/lte/assets/libs/moment/min/moment.min.js"></script>
    <script src="/lte/assets/libs/moment/moment-timezone.js"></script>
    <script src="/lte/assets/libs/moment/locale/es.js"></script>
  @else
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
    <script src="/assets/js/yeti.js"></script>
  @endif
</body>

</html>
