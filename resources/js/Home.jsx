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
import Number2Currency from './Utils/Number2Currency';

const Home = () => {
  const revenueRef = useRef();
  const chartRef = useRef(null); // Usar useRef para mantener la referencia del gráfico
  const pieRef = useRef(null);

  const [revenuesTitle, setRevenuesTitle] = useState('Reporte mensual');
  const [revenuesRange, setRevenuesRange] = useState('monthly');

  const [revenues, setRevenues] = useState([]);
  const [lastRevenues, setLastRevenues] = useState({ last: 0, actual: 0 });
  const [lastMonth, setLastMonth] = useState(moment({ month: moment().month() - 1 }).format('MMMM Y'));
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0)
  const [totalProjectsThisMonth, setTotalProjectsThisMonth] = useState(0)

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
            setLastMonth(moment({ month: x.month - 1 }).format('MMMM Y'))
            lastRevenues.last = Number(x.total)
          }
        })

        setLastRevenues(lastRevenues)
      })

    ProjectsRest.paginate({
      sort: [
        {
          selector: 'ends_at',
          desc: false
        }
      ],
      requireTotalCount: true,
      isLoadingAll: true,
      filter: [
        // ['ends_at', '>=', moment().format('YYYY-MM-DD')], 'and',
        // ['status', '<>', null], 'and',
        // [
        '!',
        [
          ['status_id', '=', 8], 'or',
          ['status_id', '=', 9]
        ]
        // ]
      ]
    })
      .then(({ data, totalCount }) => {
        let conteoEstados = {};
        data.forEach(({ project_status: { name, color } }) => {
          let key = name;
          if (conteoEstados[key]) conteoEstados[key].cantidad++;
          else conteoEstados[key] = { estado: name, color: color, cantidad: 1 };
        });
        let results = Object.values(conteoEstados);
        new Chart(pieRef.current, {
          type: 'doughnut',
          data: {
            labels: Object.keys(conteoEstados),
            datasets: [{
              data: results.map(x => x.cantidad) || [],
              backgroundColor: results.map(x => x.color) || [],
              hoverOffset: 4
            }]
          },
          options: {
            plugins: {
              legend: {
                display: false
              }
            }
          }
        })

        setTotalProjects(totalCount)
        setProjects(data)
      })

    ProjectsRest.paginate({
      requireTotalCount: true,
      ignoreData: true,
      filter: [
        ['created_at', '>=', moment().format('YYYY-MM-[01]')], 'and',
        ['created_at', '<=', moment().add(1, 'month').format('YYYY-MM-[01]')]
      ]
    })
      .then(({ totalCount }) => {
        setTotalProjectsThisMonth(totalCount)
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
      <div className='row'>

        <div className='col-xl-3 col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h4 className='header-title mt-0 mb-4'>Ingresos - Mes anterior</h4>
              <div className='widget-chart-1'>
                <div className='widget-detail-1 text-end'>
                  <h2 className='fw-normal pt-2 mb-1'> S/. {Number2Currency(lastRevenues?.last)} </h2>
                  <p className='text-muted mb-1'>{lastMonth}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-xl-3 col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h4 className='header-title mt-0 mb-3'>Ingresos - Mes actual</h4>
              <div className='widget-box-2'>
                <div className='widget-detail-2 text-end'>
                  <Tippy content={`Es probable que tengamos ${(Math.abs(trending) * 100).toFixed(2)}% ${trending >= 0 ? 'mas' : 'menos'} de ingresos respecto al mes anterior`}>
                    <span className={`badge bg-${trending > 0 ? 'success' : 'danger'} rounded-pill float-start mt-3`}>{Math.round(trending * 100) || 0}% <i className={`mdi mdi-trending-${trending > 0 ? 'up' : 'down'}`}></i> </span>
                  </Tippy>
                  <h2 className='fw-normal mb-1'> S/. {Number2Currency(lastRevenues?.actual)} </h2>
                  <p className='text-muted mb-3'>{moment().format('MMMM Y')}</p>
                </div>
                <Tippy content={<p className='text-center mb-0'>
                  Para este mes de {moment().format('MMMM Y')} se espera que tengamos S/. {Number2Currency(suposeToBe)}
                </p>} allowHTML={true} arrow={true}>
                  <div className={`progress progress-bar-alt-${trending > 0 ? 'success' : 'danger'} progress-sm`}>
                    <div className={`progress-bar bg-${trending > 0 ? 'success' : 'danger'}`} role='progressbar' aria-valuenow={trending * 100} aria-valuemin='0' aria-valuemax='100' style={{ width: `${Math.abs(trending * 100)}%` }}>
                      <span className='visually-hidden'>{Math.round(trending * 100) || 0}%</span>
                    </div>
                  </div>
                </Tippy>
              </div>
            </div>
          </div>
        </div>

        <div className='col-xl-3 col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <div className='dropdown float-end'>
                <Tippy content='Ver proyectos' arrow={true}>
                  <a href='/projects' className='arrow-none card-drop'>
                    <i className='mdi mdi-arrow-top-right'></i>
                  </a>
                </Tippy>
              </div>

              <h4 className='header-title mt-0 mb-4'>Proyectos en curso</h4>

              <div className='widget-chart-1'>
                <div className='widget-chart-box-1 float-start' dir='ltr'>
                  <div style={{ display: 'inline', width: '70px', height: '70px' }}>
                    <canvas ref={pieRef} width='62' height='62' style={{ width: '70px', height: '70px' }}>
                    </canvas>
                  </div>
                </div>
                <div className='widget-detail-1 text-end'>
                  <h2 className='fw-normal pt-2 mb-1'> {totalProjects} </h2>
                  <p className='text-muted mb-1'>proyectos en curso</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-xl-3 col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <div className='dropdown float-end'>
                <Tippy content='Ver proyectos' arrow={true}>
                  <a href='/projects' className='arrow-none card-drop'>
                    <i className='mdi mdi-arrow-top-right'></i>
                  </a>
                </Tippy>
              </div>

              <h4 className='header-title mt-0 mb-3'>Proyectos nuevos</h4>

              <div className='widget-box-2'>
                <div className='widget-detail-2 text-end'>
                  {/* <span className='badge bg-pink rounded-pill float-start mt-3'>32% <i className='mdi mdi-trending-up'></i> </span> */}
                  <h2 className='fw-normal mb-1'> {totalProjectsThisMonth} </h2>
                  <p className='text-muted mb-3'> proyectos este mes</p>
                </div>
                {/* <div className='progress progress-bar-alt-pink progress-sm'>
                  <div className='progress-bar bg-pink' role='progressbar' aria-valuenow='77' aria-valuemin='0' aria-valuemax='100' style={{ width: '77%' }}>
                    <span className='visually-hidden'>77% Complete</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <DropdownEnd>
                <DropdownItem onClick={onRevenueRangeChange} data-value='daily'>Reporte diario</DropdownItem>
                <DropdownItem onClick={onRevenueRangeChange} data-value='weekly'>Reporte semanal</DropdownItem>
                <DropdownItem onClick={onRevenueRangeChange} data-value='monthly'>Reporte mensual</DropdownItem>
                <DropdownItem onClick={onRevenueRangeChange} data-value='annually'>Reporte anual</DropdownItem>
              </DropdownEnd>
              <h4 className='header-title mb-0'>Ingresos - {revenuesTitle}</h4>
            </div>
            <div className='card-body'>
              <canvas ref={revenueRef} height={80}></canvas>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='dropdown float-end'>
                <Tippy content='Ver proyectos' arrow={true}>
                  <a href='/projects' className='arrow-none card-drop'>
                    <i className='mdi mdi-arrow-top-right'></i>
                  </a>
                </Tippy>
              </div>

              <h4 className='header-title mt-0 mb-3'>Proyectos prontos a terminar</h4>

              <div className='table-responsive'>
                <table className='table table-hover mb-0'>
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Proyecto</th>
                      <th>Fecha de inicio</th>
                      <th>Fecha de finalización</th>
                      <th>Estado</th>
                      <th>Asignado a</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      projects.map((project, i) => {
                        return <tr key={`project-${i}`}>
                          <td>{project.client.tradename}</td>
                          <td>{project.name}</td>
                          <td>{moment(project.starts_at).format('LL')}</td>
                          <td>{moment(project.ends_at).format('LL')}</td>
                          <td><span className='badge' style={{ backgroundColor: project.project_status.color }}>{project.project_status.name}</span></td>
                          <td>-</td>
                        </tr>
                      })
                    }
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