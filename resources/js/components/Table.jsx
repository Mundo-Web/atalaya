import React from 'react'
import DataGrid from './DataGrid'

const Table = ({ title, gridRef, rest, columns, toolBar, masterDetail }) => {
  return (<div className="row">
    <div className="col-12">
      <div className="card">
        <div className="card-body">
          <h4 className="header-title">
            <div id="header-title-options" className="float-end"></div>
            <span id="header-title-prefix"></span> Lista de {title} <span id="header-title-suffix"></span>
          </h4>
          <DataGrid gridRef={gridRef} rest={rest} columns={columns} toolBar={toolBar} masterDetail={masterDetail}/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Table