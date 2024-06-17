import React, { useEffect } from 'react'
import { Local } from 'sode-extend-react'

const DataGrid = ({ gridRef: dataGridRef, rest, columns, toolBar, masterDetail, filterValue }) => {
  useEffect(() => {
    $(dataGridRef.current).dxDataGrid({
      language: "es",
      dataSource: {
        load: async (params) => {
          const data = await rest.paginate(params)
          return data
        },
      },
      onToolbarPreparing: (e) => {
        const { items } = e.toolbarOptions;
        toolBar(items)
      },
      remoteOperations: true,
      columnResizingMode: "widget",
      allowColumnResizing: true,
      allowColumnReordering: true,
      columnAutoWidth: true,
      scrollbars: 'auto',
      filterPanel: { visible: true },
      searchPanel: { visible: true },
      headerFilter: { visible: true, search: { enabled: true } },
      height: 'calc(100vh - 185px)',
      filterValue,
      // export: {
      //   enabled: true
      // },
      // onExporting: function (e) {
      //   var workbook = new ExcelJS.Workbook();
      //   var worksheet = workbook.addWorksheet('Main sheet');
      //   DevExpress.excelExporter.exportDataGrid({
      //     worksheet: worksheet,
      //     component: e.component,
      //     customizeCell: function (options) {
      //       options.excelCell.alignment = { horizontal: 'left' };
      //     }
      //   }).then(function () {
      //     workbook.xlsx.writeBuffer().then(function (buffer) {
      //       saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `types.${SERVICE}.xlsx`);
      //     });
      //   });
      // },
      rowAlternationEnabled: true,
      showBorders: true,
      filterRow: {
        visible: true,
        applyFilter: "auto"
      },
      filterBuilderPopup: {
        visible: false,
        position: {
          of: window, at: 'top', my: 'top', offset: { y: 10 },
        },
      },
      paging: {
        pageSize: 10,
      },
      pager: {
        visible: true,
        allowedPageSizes: [5, 10, 25, 50, 100],
        showPageSizeSelector: true,
        showInfo: true,
        showNavigationButtons: true,
      },
      allowFiltering: true,
      scrolling: {
        mode: 'standard',
        useNative: true,
        preloadEnabled: true,
        rowRenderingMode: 'standard'
      },
      columnChooser: {
        title: 'Mostrar/Ocultar columnas',
        enabled: true,
        mode: 'select',
        search: { enabled: true }
      },
      columns,
      masterDetail,
      onColumnsChanging: () => {
        const dataGrid = $(dataGridRef.current).dxDataGrid('instance')
        const state = dataGrid.state()

        if (Object.keys(state) == 0) return

        const path = location.pathname
        const dxSettings = Local.get('dxSettings') || {}
        if (JSON.stringify(dxSettings[path]) == JSON.stringify(state)) return
        
        dxSettings[path] = state
        Local.set('dxSettings', dxSettings)
      }
    }).dxDataGrid('instance')

    $(dataGridRef.current).dxDataGrid('instance').state(Local.get('dxSettings')[location.pathname] || {})
  }, [null])

  return (
    <div ref={dataGridRef}></div>
  )
}

export default DataGrid