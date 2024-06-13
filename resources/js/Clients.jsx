
import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import CreateReactScript from './Utils/CreateReactScript.jsx'
import ReactAppend from './Utils/ReactAppend.jsx'
import ClientsRest from './actions/ClientsRest.js'
import ProjectsRest from './actions/ProjectsRest.js'
import Adminto from './components/Adminto.jsx'
import Modal from './components/Modal.jsx'
import Table from './components/Table.jsx'
import InputFormGroup from './components/form/InputFormGroup.jsx'
import TextareaFormGroup from './components/form/TextareaFormGroup.jsx'
import TippyButton from './components/form/TippyButton.jsx'
import PaymentModal from './Reutilizables/Payments/PaymentModal.jsx'
import ProjectStatusDropdown from './Reutilizables/Projects/ProjectStatusDropdown.jsx'
import Tippy from '@tippyjs/react'

const Clients = ({ statuses, can }) => {
  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const rucRef = useRef()
  const nameRef = useRef()
  const tradenameRef = useRef()
  const webUrlRef = useRef()
  const messageRef = useRef()
  const descriptionRef = useRef()
  const contactNameRef = useRef()
  const contactPhoneRef = useRef()
  const contactEmailRef = useRef()
  const contactAddressRef = useRef()

  const [isEditing, setIsEditing] = useState(false)
  const [projectLoaded, setProjectLoaded] = useState({})
  const [projectsGrid, setProjectsGrid] = useState({})

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id || null
    rucRef.current.value = data?.ruc || null
    nameRef.current.value = data?.name || null
    tradenameRef.current.value = data?.tradename || null
    webUrlRef.current.value = data?.weburl || null
    messageRef.current.value = data?.message || 'Cliente creado desde Atalaya'
    descriptionRef.current.value = data?.description || null
    contactNameRef.current.value = data?.contact_name || null
    contactPhoneRef.current.value = data?.contact_phone || null
    contactEmailRef.current.value = data?.contact_email || null
    contactAddressRef.current.value = data?.contact_address || null

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      ruc: rucRef.current.value,
      name: nameRef.current.value,
      tradename: tradenameRef.current.value,
      web_url: webUrlRef.current.value,
      message: messageRef.current.value ?? 'Cliente creado desde Atalaya',
      description: descriptionRef.current.value ?? '',
      contact_name: contactNameRef.current.value ?? '',
      contact_phone: contactPhoneRef.current.value ?? '',
      contact_email: contactEmailRef.current.value ?? '',
      contact_address: contactAddressRef.current.value ?? '',
    }

    const result = await ClientsRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, status }) => {
    const result = await ClientsRest.status({ id, status })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const result = await ClientsRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Clientes' rest={ClientsRest}
      toolBar={(container) => {
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'refresh',
            hint: 'REFRESCAR TABLA',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
          }
        });
        // container.unshift({
        //   widget: 'dxButton', location: 'after',
        //   options: {
        //     icon: 'plus',
        //     hint: 'NUEVO REGISTRO',
        //     onClick: () => onModalOpen()
        //   }
        // });
      }}
      filterValue={['status_id', '=', 12]}
      columns={[
        can('projects', 'root', 'all', 'list') ? {
          dataField: 'id',
          caption: 'ID',
          dataType: 'number',
          cellTemplate: (container, { data, value, ...otherParams }) => {
            ReactAppend(container, <TippyButton className='btn btn-xs btn-white' title={`Ver ${data.projects} proyectos`} onClick={() => {
              otherParams.component.collapseAll(-1);
              otherParams.component.expandRow(otherParams.row.data)
            }}>
              <i className='fas fa-shapes'></i> {data.projects}
            </TippyButton>)
          },
          sortOrder: 'desc'
        } : null,
        {
          dataField: 'ruc',
          caption: 'RUC'
        },
        {
          dataField: 'tradename',
          caption: 'Nombre comercial'
        },
        {
          dataField: 'name',
          caption: 'Razon social',
          visible: false
        },
        {
          dataField: 'contact_phone',
          caption: 'Telefono'
        },
        {
          dataField: 'contact_email',
          caption: 'Correo'
        },
        {
          dataField: 'status_id',
          caption: 'ID estado cliente',
          dataType: 'boolean',
          visible: false
        },
        {
          dataField: 'status',
          caption: 'Estado',
          dataType: 'boolean',
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
        can('projects', 'root', 'all', 'list', 'update', 'changestatus', 'delete') ? {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.attr('style', 'display: flex; gap: 4px; overflow: visible')

            can('projects', 'root', 'all', 'list') && ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-dark' title={`Ver ${data.projects} proyectos en una nueva ventana`} onClick={() => location.href = `/projects/?client=${data.name}`}>
              <i className='mdi mdi-page-next'></i>
            </TippyButton>)

            can('clients', 'root', 'all', 'update') && ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-primary' title='Editar' onClick={() => onModalOpen(data)}>
              <i className='fa fa-pen'></i>
            </TippyButton>)

            can('clients', 'root', 'all', 'changestatus') && ReactAppend(container, <TippyButton className='btn btn-xs btn-light' title={data.status === null ? 'Restaurar' : 'Cambiar estado'} onClick={() => onStatusChange(data)}>
              {
                data.status === 1
                  ? <i className='fa fa-toggle-on text-success' />
                  : data.status === 0 ?
                    <i className='fa fa-toggle-off text-danger' />
                    : <i className='fas fa-trash-restore' />
              }
            </TippyButton>)

            can('clients', 'root', 'all', 'delete') && ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-danger' title='Eliminar' onClick={() => onDeleteClicked(data.id)}>
              <i className='fa fa-trash-alt'></i>
            </TippyButton>)
          },
          allowFiltering: false,
          allowExporting: false
        } : null
      ]}
      masterDetail={{
        enabled: false,
        template: async (container, { data: client, component }) => {
          container.css('padding', '10px')
          container.css('overflow', 'visible')

          let { data: dataSource } = await ProjectsRest.paginate({
            filter: ['client_id', '=', client.id],
            isLoadingAll: true
          })

          const dataGrid = $('<div id="projects-grid" style="height: 320px">').appendTo(container).dxDataGrid({
            dataSource,
            onToolbarPreparing: (e) => {
              const toolbarItems = e.toolbarOptions.items;
              toolbarItems.unshift({
                widget: 'dxButton',
                location: 'after',
                options: {
                  icon: 'fa fa-times',
                  hint: 'CERRAR TABLA',
                  onClick: (e) => {
                    component.collapseAll(-1);
                  }
                }
              });
            },
            columns: [
              {
                dataField: 'id',
                caption: 'ID',
                dataType: 'number',
                sortOrder: 'asc'
              },
              {
                dataField: 'type.name',
                caption: 'Tipo'
              },
              {
                dataField: 'name',
                caption: 'Proyecto'
              },
              {
                dataField: 'cost',
                caption: 'Costo',
                dataType: 'number',
                width: 150,
                cellTemplate: (container, { data }) => {
                  const percent = ((data.total_payments / data.cost) * 100).toFixed(2)
                  ReactAppend(container, <>
                    <p className='mb-1 d-flex justify-content-between'>
                      <span>S/.{Number(data.total_payments).toFixed(2)}</span>
                      <b className='float-end'>S/.{Number(data.cost).toFixed(2)}</b>
                    </p>
                    <div className='progress progress-bar-alt-primary progress-sm mt-0 mb-0'>
                      <div className='progress-bar bg-primary progress-animated wow animated animated' role='progressbar' aria-valuenow={data.total_payments} aria-valuemin='0' aria-valuemax={data.cost} style={{ width: `${percent}%`, visibility: 'visible', animationName: 'animationProgress' }}>
                      </div>
                    </div>
                  </>)
                }
              },
              can('projects', 'root', 'all', 'changestatus') ? {
                dataField: 'project_status.name',
                caption: 'Estado del proyecto',
                dataType: 'string',
                cellTemplate: (container, { data }) => {
                  container.attr('style', 'overflow: visible')
                  ReactAppend(container, <ProjectStatusDropdown can={can} statuses={statuses} data={data} onChange={async () => {
                    const { data: dataSource } = await ProjectsRest.paginate({
                      filter: ['client_id', '=', client.id],
                      isLoadingAll: true
                    })
                    $('#projects-grid').dxDataGrid('instance').option('dataSource', dataSource)
                  }} />)
                }
              } : null,
              {
                dataField: 'status',
                caption: 'Estado',
                dataType: 'boolean',
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
                cellTemplate: (container, { data }) => {
                  container.attr('style', 'display: flex; gap: 4px; overflow: unset')

                  can('projects', 'root', 'all', 'addpayments') && ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-success' title='Ver/Agregar pagos' onClick={() => setProjectLoaded(data)}>
                    <i className='fas fa-money-check-alt'></i>
                  </TippyButton>)
                },
                allowFiltering: false,
                allowExporting: false
              }
            ],
            allowColumnResizing: true,
            columnResizingMode: "widget",
            columnAutoWidth: true,
            showBorders: true,
            columnChooser: {
              title: 'Mostrar/Ocultar columnas',
              enabled: true,
              mode: 'select',
              search: { enabled: true }
            },
          })
          setProjectsGrid(dataGrid.dxDataGrid('instance'))
        }
      }}
    />
    <Modal modalRef={modalRef} title={isEditing ? 'Editar cliente' : 'Agregar cliente'} onSubmit={onModalSubmit} size='md'>
      <div className='row'>
        <input ref={idRef} type='hidden' />
        <InputFormGroup eRef={rucRef} label='RUC' col='col-4' required />
        <InputFormGroup eRef={tradenameRef} label='Nombre comercial' col='col-8' required />
        <InputFormGroup eRef={nameRef} label='Razon social' col='col-md-6' required />
        <InputFormGroup eRef={webUrlRef} label='URL Web' col='col-md-6' required />
        <TextareaFormGroup eRef={messageRef} label='Mensaje' col='col-12' required />
        <TextareaFormGroup eRef={descriptionRef} label='Descripcion' col='col-12' />
        <div className="col-12"><hr className='my-1' /></div>
        <InputFormGroup eRef={contactNameRef} label='Nombre de contacto' col='col-6' />
        <InputFormGroup eRef={contactPhoneRef} label='Celular de contacto' col='col-6' />
        <InputFormGroup eRef={contactEmailRef} label='Email de contacto' col='col-12' type='email' />
        <TextareaFormGroup eRef={contactAddressRef} label='Direccion de contacto' col='col-12' />
      </div>
    </Modal>

    <PaymentModal can={can} dataLoaded={projectLoaded} setDataLoaded={setProjectLoaded} grid2refresh={projectsGrid} />
  </>
  )
};

CreateReactScript((el, properties) => {
  if (!properties.can('clients', 'root', 'all', 'list')) return location.href = '/';
  createRoot(el).render(
    <Adminto {...properties} title='Clientes'>
      <Clients {...properties} />
    </Adminto>
  );
})