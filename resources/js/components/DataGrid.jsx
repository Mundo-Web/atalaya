import React, { useEffect } from 'react'
import { Fetch } from 'sode-extend-react'
import UsersRest from '../actions/UsersRest'

const DataGrid = ({ gridRef: dataGridRef, rest, columns, toolBar }) => {
  useEffect(() => {
    const dataGrid = $(dataGridRef.current).dxDataGrid({
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
      columnAutoWidth: true,
      showBorders: true,
      scrollbars: 'auto',
      filterPanel: { visible: true },
      searchPanel: { visible: true },
      headerFilter: { visible: true, allowSearch: true },
      height: 'calc(100vh - 185px)',
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
        mode: 'select'
      },
      columns
    }).dxDataGrid('instance')
  }, [null])

  return (
    <div ref={dataGridRef}></div>
  )
}

export default DataGrid