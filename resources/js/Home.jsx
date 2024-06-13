import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Adminto from './components/Adminto'
import CreateReactScript from './Utils/CreateReactScript'
import Chart from 'chart.js/auto';
import DashboardRest from './actions/DashboardRest';

const Home = () => {
  const revenueRef = useRef();
  const chartRef = useRef(null); // Usar useRef para mantener la referencia del gráfico

  const [revenuesTitle, setRevenuesTitle] = useState('Reporte mensual');
  const [revenuesRange, setRevenuesRange] = useState('monthly');
  const [revenues, setRevenues] = useState([]);

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
              return moment({ year: row.year, month: row.month - 1 }).format('MMM Y')
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

  const onRevenueRangeChange = (e) => {
    const range = e.target.getAttribute('data-value')
    const title = e.target.textContent
    setRevenuesRange(range)
    setRevenuesTitle(title)
  }

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="dropdown float-end">
                <a href="#" className="dropdown-toggle arrow-none card-drop"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="mdi mdi-dots-vertical"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" style={{ cursor: 'pointer' }}
                    onClick={onRevenueRangeChange} data-value='daily'>
                    Reporte diario
                  </a>
                  <a className="dropdown-item" style={{ cursor: 'pointer' }}
                    onClick={onRevenueRangeChange} data-value='weekly'>
                    Reporte semanal
                  </a>
                  <a className="dropdown-item" style={{ cursor: 'pointer' }}
                    onClick={onRevenueRangeChange} data-value='monthly'>
                    Reporte mensual
                  </a>
                  <a className="dropdown-item" style={{ cursor: 'pointer' }}
                    onClick={onRevenueRangeChange} data-value='annually'>
                    Reporte anual
                  </a>
                </div>
              </div>
              <h4 className="header-title mb-0">Ingresos - {revenuesTitle}</h4>
            </div>
            <div className="card-body">
              <canvas ref={revenueRef}></canvas>
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