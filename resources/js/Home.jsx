import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Adminto from './components/Adminto'
import CreateReactScript from './Utils/CreateReactScript'
import Chart from 'chart.js/auto';
import DashboardRest from './actions/DashboardRest';
import DropdownEnd from './components/dropdown/DropdownEnd';
import DropdownItem from './components/dropdown/DropdownItem';
import Tippy from '@tippyjs/react';
import ProjectsRest from './actions/ProjectsRest';

const Home = () => {
  const revenueRef = useRef();
  const chartRef = useRef(null); // Usar useRef para mantener la referencia del gráfico

  const [revenuesTitle, setRevenuesTitle] = useState('Reporte mensual');
  const [revenuesRange, setRevenuesRange] = useState('monthly');

  const [revenues, setRevenues] = useState([]);
  const [lastRevenues, setLastRevenues] = useState({ last: 0, actual: 0 });
  const [lastMonth, setLastMonth] = useState(moment({ month: moment().month() - 1 }).format('MMMM Y'));

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destruir el gráfico existente antes de crear uno nuevo
    }
    chartRef.current = new Chart(revenueRef.current, {
      type: 'bar',
      data: {
        labels: revenues.map(row => {
          switch (revenuesRange) {
            case 'daily':
              return moment(row.date).format('DD MMM')
            case 'weekly':
              const year = Number(String(row.week).slice(0, 4))
              const week = Number(String(row.week).slice(4, 6))

              const startOfWeek = moment().year(year).week(week + 1).startOf('week').isoWeekday(0);
              const endOfWeek = moment().year(year).week(week + 1).endOf('week').isoWeekday(6);

              const startDay = startOfWeek.format('D');
              const endDay = endOfWeek.format('D');
              const monthStart = startOfWeek.format('MMM');
              const monthEnd = endOfWeek.format('MMM')

              if (monthStart == monthEnd) return `${startDay} - ${endDay} ${monthStart}`
              return `${startDay} ${monthStart} - ${endDay} ${monthEnd}`
            case 'annually':
              return row.year
            default:
              return moment({ year: row.year, month: row.month - 1 }).format('MMMM Y')
          }
        }),
        datasets: [
          {
            label: revenuesTitle,
            data: revenues.map(row => row.total)
          }
        ]
      }
    });
  }, [revenues]);

  useEffect(() => {
    DashboardRest.revenue(revenuesRange)
      .then(data => {
        setRevenues(data)
      })
  }, [revenuesRange])

  useEffect(() => {
    DashboardRest.lastRevenues()
      .then(data => {
        const lastRevenues = {
          last: 0,
          actual: 0
        }
        data.forEach(x => {
          if (x.month == moment().month() + 1) lastRevenues.actual = Number(x.total)
          else {
            setLastMonth(moment({ month: x.month - 1 }).format('MMM Y'))
            lastRevenues.last = Number(x.total)
          }
        })

        setLastRevenues(lastRevenues)
      })

    ProjectsRest.paginate({
      filter: [
        ['ends_at', '>=', moment().format('YYYY-MM-DD')], 'AND', [
          ['status_id', '=', 4], 'OR',
          ['status_id', '=', 5], 'OR',
          ['status_id', '=', 6]
        ]
      ]
    })
      .then(({ data }) => {
        console.log(data)
      })
  }, [null])

  const onRevenueRangeChange = (e) => {
    const range = e.target.getAttribute('data-value')
    const title = e.target.textContent
    setRevenuesRange(range)
    setRevenuesTitle(title)
  }

  const totalDays = moment().daysInMonth()
  const daysPassed = moment().format('DD')
  const suposeToBe = lastRevenues.actual * totalDays / daysPassed
  const trending = (suposeToBe / lastRevenues.last) - 1

  return (
    <>
      <div className="row">

        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title mt-0 mb-4">Ingresos - Mes anterior</h4>
              <div className="widget-chart-1">
                {/* <div className="widget-chart-box-1 float-start" dir="ltr">
                  <div style={{ display: 'inline', width: '70px', height: '70px' }}><canvas width="62" height="62" style={{ width: '70px', height: '70px' }}></canvas><input data-plugin="knob" data-width="70" data-height="70" data-fgcolor="#f05050 " data-bgcolor="#F9B9B9" value="58" data-skin="tron" data-angleoffset="180" data-readonly="true" data-thickness=".15" readOnly="readonly" style={{ width: '39px', height: '23px', position: 'absolute', verticalAlign: 'middle', marginTop: '23px', marginLeft: '-54px', border: '0px', background: 'none', font: 'bold 14px Arial', textAlign: 'center', color: 'rgb(240, 80, 80)', padding: '0px', appearance: 'none' }} /></div>
                </div> */}

                <div className="widget-detail-1 text-end">
                  <h2 className="fw-normal pt-2 mb-1"> S/.{Number(lastRevenues?.last || 0).toFixed(2)} </h2>
                  <p className="text-muted mb-1">{lastMonth}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title mt-0 mb-3">Ingresos - Mes actual</h4>
              <div className="widget-box-2">
                <div className="widget-detail-2 text-end">
                  <Tippy content={`Es probable que tengamos ${(Math.abs(trending) * 100).toFixed(2)}% ${trending >= 0 ? 'mas' : 'menos'} de ingresos respecto al mes anterior`}>
                    <span className="badge bg-success rounded-pill float-start mt-3">{Math.round(trending * 100)}% <i className={`mdi mdi-trending-${trending > 0 ? 'up' : 'down'}`}></i> </span>
                  </Tippy>
                  <h2 className="fw-normal mb-1"> S/.{Number(lastRevenues?.actual || 0).toFixed(2)} </h2>
                  <p className="text-muted mb-3">{moment().format('MMMM Y')}</p>
                </div>
                <div className="progress progress-bar-alt-success progress-sm">
                  <div className="progress-bar bg-success" role="progressbar" aria-valuenow="77" aria-valuemin="0" aria-valuemax="100" style={{ width: '77%' }}>
                    <span className="visually-hidden">77% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="dropdown float-end">
                <Tippy content="Ver proyectos" arrow={true}>
                  <a href="/projects" className="arrow-none card-drop">
                    <i className="mdi mdi-arrow-top-right"></i>
                  </a>
                </Tippy>
              </div>

              <h4 className="header-title mt-0 mb-4">Proyectos en curso</h4>

              <div className="widget-chart-1">
                <div className="widget-chart-box-1 float-start" dir="ltr">
                  <div style={{ display: 'inline', width: '70px', height: '70px' }}><canvas width="62" height="62" style={{ width: '70px', height: '70px' }}></canvas><input data-plugin="knob" data-width="70" data-height="70" data-fgcolor="#ffbd4a" data-bgcolor="#FFE6BA" value="80" data-skin="tron" data-angleoffset="180" data-readonly="true" data-thickness=".15" readOnly="readonly" style={{ width: '39px', height: '23px', position: 'absolute', verticalAlign: 'middle', marginTop: '23px', marginLeft: '-54px', border: '0px', background: 'none', font: 'bold 14px Arial', textAlign: 'center', color: 'rgb(255, 189, 74)', padding: '0px', appearance: 'none' }} /></div>
                </div>
                <div className="widget-detail-1 text-end">
                  <h2 className="fw-normal pt-2 mb-1"> 4569 </h2>
                  <p className="text-muted mb-1">Revenue today</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="dropdown float-end">
                <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="mdi mdi-dots-vertical"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a href="#" className="dropdown-item">Action</a>
                  <a href="#" className="dropdown-item">Another action</a>
                  <a href="#" className="dropdown-item">Something else</a>
                  <a href="#" className="dropdown-item">Separated link</a>
                </div>
              </div>

              <h4 className="header-title mt-0 mb-3">Proyectos nuevos</h4>

              <div className="widget-box-2">
                <div className="widget-detail-2 text-end">
                  <span className="badge bg-pink rounded-pill float-start mt-3">32% <i className="mdi mdi-trending-up"></i> </span>
                  <h2 className="fw-normal mb-1"> 158 </h2>
                  <p className="text-muted mb-3">Revenue today</p>
                </div>
                <div className="progress progress-bar-alt-pink progress-sm">
                  <div className="progress-bar bg-pink" role="progressbar" aria-valuenow="77" aria-valuemin="0" aria-valuemax="100" style={{ width: '77%' }}>
                    <span className="visually-hidden">77% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <DropdownEnd>
                <DropdownItem onClick={onRevenueRangeChange} data-value="daily">Reporte diario</DropdownItem>
                <DropdownItem onClick={onRevenueRangeChange} data-value="weekly">Reporte semanal</DropdownItem>
                <DropdownItem onClick={onRevenueRangeChange} data-value="monthly">Reporte mensual</DropdownItem>
                <DropdownItem onClick={onRevenueRangeChange} data-value="annually">Reporte anual</DropdownItem>
              </DropdownEnd>
              <h4 className="header-title mb-0">Ingresos - {revenuesTitle}</h4>
            </div>
            <div className="card-body">
              <canvas ref={revenueRef} height={80}></canvas>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <div className="card-body">
              <div className="dropdown float-end">
                <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="mdi mdi-dots-vertical"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a href="#" className="dropdown-item">Action</a>
                  <a href="#" className="dropdown-item">Another action</a>
                  <a href="#" className="dropdown-item">Something else</a>
                  <a href="#" className="dropdown-item">Separated link</a>
                </div>
              </div>

              <h4 className="header-title mb-3">Inbox</h4>

              <div className="inbox-widget">

                <div className="inbox-item">
                  <a href="#">
                    <div className="inbox-item-img"><img src="assets/images/users/user-1.jpg" className="rounded-circle" alt="" /></div>
                    <h5 className="inbox-item-author mt-0 mb-1">Chadengle</h5>
                    <p className="inbox-item-text">Hey! there I'm available...</p>
                    <p className="inbox-item-date">13:40 PM</p>
                  </a>
                </div>

                <div className="inbox-item">
                  <a href="#">
                    <div className="inbox-item-img"><img src="assets/images/users/user-2.jpg" className="rounded-circle" alt="" /></div>
                    <h5 className="inbox-item-author mt-0 mb-1">Tomaslau</h5>
                    <p className="inbox-item-text">I've finished it! See you so...</p>
                    <p className="inbox-item-date">13:34 PM</p>
                  </a>
                </div>

                <div className="inbox-item">
                  <a href="#">
                    <div className="inbox-item-img"><img src="assets/images/users/user-3.jpg" className="rounded-circle" alt="" /></div>
                    <h5 className="inbox-item-author mt-0 mb-1">Stillnotdavid</h5>
                    <p className="inbox-item-text">This theme is awesome!</p>
                    <p className="inbox-item-date">13:17 PM</p>
                  </a>
                </div>

                <div className="inbox-item">
                  <a href="#">
                    <div className="inbox-item-img"><img src="assets/images/users/user-4.jpg" className="rounded-circle" alt="" /></div>
                    <h5 className="inbox-item-author mt-0 mb-1">Kurafire</h5>
                    <p className="inbox-item-text">Nice to meet you</p>
                    <p className="inbox-item-date">12:20 PM</p>
                  </a>
                </div>

                <div className="inbox-item">
                  <a href="#">
                    <div className="inbox-item-img"><img src="assets/images/users/user-5.jpg" className="rounded-circle" alt="" /></div>
                    <h5 className="inbox-item-author mt-0 mb-1">Shahedk</h5>
                    <p className="inbox-item-text">Hey! there I'm available...</p>
                    <p className="inbox-item-date">10:15 AM</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="col-xl-8">
          <div className="card">
            <div className="card-body">
              <div className="dropdown float-end">
                <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="mdi mdi-dots-vertical"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a href="#" className="dropdown-item">Action</a>
                  <a href="#" className="dropdown-item">Another action</a>
                  <a href="#" className="dropdown-item">Something else</a>
                  <a href="#" className="dropdown-item">Separated link</a>
                </div>
              </div>

              <h4 className="header-title mt-0 mb-3">Proyectos prontos a terminar</h4>

              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Proyecto</th>
                      <th>Fecha de inicio</th>
                      <th>Fecha de finalización</th>
                      <th>Estado</th>
                      <th>Asignado a</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Adminto Admin v1</td>
                      <td>01/01/2017</td>
                      <td>26/04/2017</td>
                      <td><span className="badge bg-danger">Released</span></td>
                      <td>Coderthemes</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Adminto Frontend v1</td>
                      <td>01/01/2017</td>
                      <td>26/04/2017</td>
                      <td><span className="badge bg-success">Released</span></td>
                      <td>Adminto admin</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Adminto Admin v1.1</td>
                      <td>01/05/2017</td>
                      <td>10/05/2017</td>
                      <td><span className="badge bg-pink">Pending</span></td>
                      <td>Coderthemes</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Adminto Frontend v1.1</td>
                      <td>01/01/2017</td>
                      <td>31/05/2017</td>
                      <td><span className="badge bg-purple">Work in Progress</span>
                      </td>
                      <td>Adminto admin</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Adminto Admin v1.3</td>
                      <td>01/01/2017</td>
                      <td>31/05/2017</td>
                      <td><span className="badge bg-warning">Coming soon</span></td>
                      <td>Coderthemes</td>
                    </tr>

                    <tr>
                      <td>6</td>
                      <td>Adminto Admin v1.3</td>
                      <td>01/01/2017</td>
                      <td>31/05/2017</td>
                      <td><span className="badge bg-primary">Coming soon</span></td>
                      <td>Adminto admin</td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <Adminto {...properties} title='Inicio'>
      <Home {...properties} />
    </Adminto>
  );
})