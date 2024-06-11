import React from 'react'
import { createRoot } from 'react-dom/client'
import Adminto from './components/Adminto'
import CreateReactScript from './Utils/CreateReactScript'

const Home = () => {
  return (
    <>
      <div className="row justify-content-center align-items-center" style={{height: 'calc(100vh - 140px)'}}>

        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8 col-xs-12">
          <div className="card with-border">
            <div className="card-body">
              <div className="dropdown float-end">
                <a href="#" className="dropdown-toggle arrow-none card-drop"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="mdi mdi-dots-vertical"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a href="#" className="dropdown-item">Action</a>
                  <a href="#" className="dropdown-item">Another action</a>
                  <a href="#" className="dropdown-item">Something else</a>
                  <a href="#" className="dropdown-item">Separated link</a>
                </div>
              </div>
              <div className="widget-detail-1 text-center">
                <h2 className="fw-normal mb-1">S/ 2600.00 </h2>
                <p className="text-muted mb-1">Mes de mayo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <Adminto {...properties} title='Inicio'>
      <Home {...properties} />
    </Adminto>
  );
})