
import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { GET } from 'sode-extend-react'
import Swal from 'sweetalert2'
import 'tippy.js/dist/tippy.css'
import PaymentModal from './Reutilizables/Payments/PaymentModal.jsx'
import ProjectStatusDropdown from './Reutilizables/Projects/ProjectStatusDropdown.jsx'
import CreateReactScript from './Utils/CreateReactScript.jsx'
import Number2Currency from './Utils/Number2Currency.jsx'
import ReactAppend from './Utils/ReactAppend.jsx'
import SetSelectValue from './Utils/SetSelectValue.jsx'
import ProjectsRest from './actions/ProjectsRest.js'
import Adminto from './components/Adminto.jsx'
import Modal from './components/Modal.jsx'
import Table from './components/Table.jsx'
import DxButton from './components/dx/DxButton.jsx'
import InputFormGroup from './components/form/InputFormGroup.jsx'
import SelectAPIFormGroup from './components/form/SelectAPIFormGroup.jsx'
import TextareaFormGroup from './components/form/TextareaFormGroup.jsx'
import DxBox from './components/dx/DxBox.jsx'
import Tippy from '@tippyjs/react'
import { renderToString } from 'react-dom/server'
import UsersByProjectsRest from './actions/UsersByProjectsRest.js'
import AssignUsersModal from './Reutilizables/Projects/AssignUsersModal.jsx'

const Projects = ({ statuses, can }) => {
  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const clientRef = useRef()
  const typeRef = useRef()
  const nameRef = useRef()
  const descriptionRef = useRef()
  const costRef = useRef()
  const signAtRef = useRef()
  const startsAtRef = useRef()
  const endsAtRef = useRef()

  const [isEditing, setIsEditing] = useState(false)
  const [dataLoaded, setDataLoaded] = useState({})
  const [project2Assign, setProject2Assign] = useState({})

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id || null
    SetSelectValue(clientRef.current, data?.client?.id, data?.client?.name)
    SetSelectValue(typeRef.current, data?.type?.id, data?.type?.name)
    nameRef.current.value = data?.name || null
    descriptionRef.current.value = data?.description || null
    costRef.current.value = data?.cost
    signAtRef.current.value = data?.sign_at ? moment(data.sign_at).format('YYYY-MM-DD') : null
    startsAtRef.current.value = data?.starts_at ? moment(data.starts_at).format('YYYY-MM-DD') : null
    endsAtRef.current.value = data?.ends_at ? moment(data.ends_at).format('YYYY-MM-DD') : null

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      client_id: clientRef.current.value,
      type_id: typeRef.current.value,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      cost: costRef.current.value ?? undefined,
      sign_at: signAtRef.current.value ?? undefined,
      starts_at: startsAtRef.current.value,
      ends_at: endsAtRef.current.value,
    }

    const result = await ProjectsRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, status }) => {
    const result = await ProjectsRest.status({ id, status })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Estas seguro?",
      text: `Esta acción no se puede deshacer`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Continuar",
      cancelButtonText: `Cancelar`
    })
    if (!isConfirmed) return

    const result = await ProjectsRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Proyectos' rest={ProjectsRest}
      toolBar={(container) => {
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'refresh',
            hint: 'Refrescar tabla',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
          }
        });
        can('projects', 'root', 'all', 'create') && container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'plus',
            hint: 'Nuevo registro',
            onClick: () => onModalOpen()
          }
        });
      }}
      filterValue={undefined}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          dataType: 'number',
          sortOrder: 'asc',
          visible: false
        },
        {
          dataField: 'client.tradename',
          caption: 'Nombre comercial',
          filterValue: GET.client || undefined,
          fixed: true,
          fixedPosition: 'left'
        },
        {
          dataField: 'type.name',
          caption: 'Tipo'
        },
        {
          dataField: 'name',
          caption: 'Proyecto',
          visible: false
        },
        {
          dataField: 'users',
          caption: 'Asignados',
          dataType: 'string',
          cellTemplate: (container, { data }) => {
            const relatives = (data.users || '').split('|').filter(Boolean)
            container.append(DxBox([
              <div className='avatar-group m-0'>
                {
                  relatives.map(relative_id => <Tippy key={`user-${relative_id}`} content="Cargando..." allowHTML={true} onShow={async (instance) => {
                    const user = await UsersByProjectsRest.getUser(relative_id)
                    const userDate = moment(user.created_at)
                    const now = moment()
                    const diffHours = now.diff(userDate, 'hours')
                    const time = diffHours > 12 ? userDate.format('lll') : userDate.fromNow()

                    $(instance.popper).find('.tippy-content').addClass('p-0')
                    instance.setContent(renderToString(<div className="card mb-0" style={{
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)'
                    }}>
                      <div className="card-body widget-user p-2">
                        <div className="d-flex align-items-center">
                          <div className="avatar-lg me-3 flex-shrink-0">
                            <img src={`/api/profile/thumbnail/${relative_id}`} className="img-fluid rounded-circle" alt="user" />
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <h5 className="text-blue mt-0 mb-1"> {user.name} {user.lastname}</h5>
                            <p className="text-dark mb-1 font-13 text-truncate">{user.email}</p>
                            <small className='text-muted'>Asignado: <b>{time}</b></small>
                          </div>
                        </div>
                      </div>
                    </div>))
                  }}>
                    <img
                      className='avatar-group-item avatar-xs rounded-circle mb-0'
                      src={`/api/profile/thumbnail/${relative_id}`}
                      style={{ backdropFilter: 'blur(40px)' }}
                    />
                  </Tippy>)
                }
              </div>
            ]))
          }
        },
        {
          dataField: 'cost',
          caption: 'Costo',
          dataType: 'number',
          cellTemplate: (container, { data }) => {
            container.text(`S/. ${Number2Currency(data.cost)}`)
          }
        },
        {
          dataField: 'remaining_amount',
          caption: 'Pagos',
          dataType: 'number',
          cellTemplate: (container, { data }) => {
            const percent = ((data.total_payments / data.cost) * 100).toFixed(2)
            const payments = Number(data.total_payments).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
            const rest = Number(data.cost - data.total_payments).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
            container.append(DxBox([
              <>
                <p className='mb-0 d-flex justify-content-between'>
                  <b className='text-success'><i className='fa fa-arrow-circle-up'></i> S/. {payments}</b>
                  <b className='float-end text-danger'><i className='fa fa-arrow-circle-down'></i> S/. {rest}</b>
                </p>
                <div className='progress progress-bar-alt-primary progress-sm mt-0 mb-0' style={{
                  width: '200px'
                }}>
                  <div className='progress-bar bg-primary progress-animated wow animated animated' role='progressbar' aria-valuenow={data.total_payments} aria-valuemin='0' aria-valuemax={data.cost} style={{ width: `${percent}%`, visibility: 'visible', animationName: 'animationProgress' }}>
                  </div>
                </div>
              </>
            ], false))
          }
        },
        {
          dataField: 'starts_at',
          caption: 'Fecha de inicio',
          dataType: 'date',
          cellTemplate: (container, { data }) => {
            // container.text(moment(data.starts_at).format('LL'))
            const startDate = moment(data.starts_at);
            const endDate = moment(data.ends_at);
            const currentDate = moment();

            let dateElement = <></>
            if (currentDate.isBefore(startDate)) {
              dateElement = <i className='text-primary'>El proyecto aún no comienza</i>
            } else if (currentDate.isAfter(endDate)) {
              dateElement = <i className='text-danger'>El proyecto ya terminó</i>
            } else {
              const totalDuration = endDate.diff(startDate);
              const elapsedDuration = currentDate.diff(startDate);
              const percentageElapsed = (elapsedDuration / totalDuration) * 100;

              dateElement = <div style={{ width: '200px' }}>
                <p className='mb-0 d-flex justify-content-between'>
                  <span>{moment(data.starts_at).format('DD MMMM')}</span>
                  <span className='float-end text-danger'>{moment(data.ends_at).format('DD MMMM')}</span>
                </p>
                <div className="progress progress-bar-alt-success mb-0 mt-0">
                  <div className="progress-bar  progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${percentageElapsed}%` }}>{percentageElapsed.toFixed(2)}%</div>
                </div>
              </div>
            }

            container.append(DxBox([{
              width: '200px',
              children: dateElement
            }]))
          }
        },
        // {
        //   dataField: 'ends_at',
        //   caption: 'Fecha de finalización',
        //   dataType: 'date',
        //   cellTemplate: (container, { data }) => {
        //     container.text(moment(data.ends_at).format('LL'))
        //   }
        // },
        can('projects', 'root', 'all', 'changestatus') ? {
          dataField: 'project_status.name',
          caption: 'Estado del proyecto',
          dataType: 'string',
          cellTemplate: (container, { data }) => {
            container.attr('style', 'overflow: visible')
            container.append(DxBox([
              {
                height: '0',
                children: <ProjectStatusDropdown can={can} statuses={statuses} data={data} onChange={() => {
                  $(gridRef.current).dxDataGrid('instance').refresh()
                }} />
              }
            ]))
          }
        } : null,
        {
          dataField: 'status',
          caption: 'Estado',
          dataType: 'boolean',
          visible: false,
          cellTemplate: (container, { data }) => {
            switch (data.status) {
              case 1:
                ReactAppend(container, <span className='badge bg-success rounded-pill'>Activo</span>)
                break
              case 0:
                ReactAppend(container, <span className='badge bg-danger rounded-pill'>Inactivo</span>)
                break
              default:
                ReactAppend(container, <span className='badge bg-dark rounded-pill'>Eliminado</span>)
                break
            }
          }
        },
        {
          caption: 'Acciones',
          // width: 175,
          cellTemplate: (container, { data }) => {
            // container.attr('style', 'display: flex; gap: 4px;')

            // can('projects', 'root', 'all', 'update') && ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-primary' title='Editar' onClick={() => onModalOpen(data)}>
            //   <i className='fa fa-pen'></i>
            // </TippyButton>)
            can('projects', 'root', 'all', 'update') && container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Editar',
              icon: 'fa fa-pen',
              onClick: () => onModalOpen(data)
            }))

            can('projects', 'root', 'all', 'assignUsers') && container.append(DxButton({
              className: 'btn btn-xs btn-soft-info',
              title: 'Asignar usuarios',
              icon: 'fa fa-user-plus',
              onClick: () => setProject2Assign(data)
            }))

            // can('projects', 'root', 'all', 'addpayment') && ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-success' title='Ver/Agregar pagos' onClick={() => setDataLoaded(data)}>
            //   <i className='fas fa-money-check-alt'></i>
            // </TippyButton>)
            can('projects', 'root', 'all', 'addpayment') && container.append(DxButton({
              className: 'btn btn-xs btn-soft-success',
              title: 'Ver/Agregar pagos',
              icon: 'fas fa-money-check-alt',
              onClick: () => setDataLoaded(data)
            }))

            // can('projects', 'root', 'all', 'update') && ReactAppend(container, <TippyButton className='btn btn-xs btn-light' title={data.status === null ? 'Restaurar' : 'Cambiar estado'} onClick={() => onStatusChange(data)}>
            //   {
            //     data.status === 1
            //       ? <i className='fa fa-toggle-on text-success' />
            //       : data.status === 0 ?
            //         <i className='fa fa-toggle-off text-danger' />
            //         : <i className='fas fa-trash-restore' />
            //   }
            // </TippyButton>)

            // can('projects', 'root', 'all', 'delete') && ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-danger' title='Eliminar' onClick={() => onDeleteClicked(data.id)}>
            //   <i className='fa fa-trash-alt'></i>
            // </TippyButton>)
            can('projects', 'root', 'all', 'delete') && container.append(DxButton({
              className: 'btn btn-xs btn-soft-danger',
              title: 'Eliminar',
              icon: 'fa fa-trash-alt',
              onClick: () => onDeleteClicked(data.id)
            }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalRef} title={isEditing ? 'Editar proyecto' : 'Agregar proyecto'} onSubmit={onModalSubmit}>
      <div className='row' id='project-crud-container'>
        <input ref={idRef} type='hidden' />
        <SelectAPIFormGroup eRef={clientRef} label='Cliente' col='col-12' dropdownParent='#project-crud-container' searchAPI='/api/clients/paginate' searchBy='name' required />
        <SelectAPIFormGroup eRef={typeRef} label='Tipo del proyecto' col='col-md-4' dropdownParent='#project-crud-container' searchAPI='/api/types/paginate' searchBy='name' filter={['table_id', '=', 1]} required />
        <InputFormGroup eRef={nameRef} label='Nombre del proyecto' col='col-md-8' required />
        <TextareaFormGroup eRef={descriptionRef} label='Descripcion del proyecto' col='col-12' />
        <InputFormGroup eRef={costRef} label='Costo' col='col-md-6' type='number' step={0.01} required />
        <InputFormGroup eRef={signAtRef} label='Fecha firma' col='col-md-6' type='date' />
        <InputFormGroup eRef={startsAtRef} label='Fecha inicio' col='col-md-6' type='date' required />
        <InputFormGroup eRef={endsAtRef} label='Fecha fin' col='col-md-6' type='date' required />
      </div>
    </Modal>

    <PaymentModal can={can} dataLoaded={dataLoaded} setDataLoaded={setDataLoaded} grid2refresh={$(gridRef.current).dxDataGrid('instance')} />

    <AssignUsersModal dataLoaded={project2Assign} setDataLoaded={setProject2Assign} grid2refresh={$(gridRef.current).dxDataGrid('instance')} />
  </>
  )
};

CreateReactScript((el, properties) => {
  if (!properties.can('projects', 'root', 'all', 'list')) return location.href = '/';
  createRoot(el).render(
    <Adminto {...properties} title='Proyectos'>
      <Projects {...properties} />
    </Adminto>
  );
})