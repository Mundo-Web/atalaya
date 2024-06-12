
import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import CreateReactScript from './Utils/CreateReactScript.jsx'
import ReactAppend from './Utils/ReactAppend.jsx'
import ProjectsRest from './actions/ProjectsRest.js'
import Adminto from './components/Adminto.jsx'
import Modal from './components/Modal.jsx'
import Table from './components/Table.jsx'
import InputFormGroup from './components/form/InputFormGroup.jsx'
import TextareaFormGroup from './components/form/TextareaFormGroup.jsx'
import TippyButton from './components/form/TippyButton.jsx'
import SelectAPIFormGroup from './components/form/SelectAPIFormGroup.jsx'
import SetSelectValue from './Utils/SetSelectValue.jsx'
import { GET } from 'sode-extend-react'
import Dropdown from './components/dropdown/DropDown.jsx'
import DropdownItem from './components/dropdown/DropdownItem.jsx'
import PaymentsRest from './actions/PaymentsRest.js'
import Tippy from '@tippyjs/react'

const Projects = ({ statuses }) => {
  const gridRef = useRef()
  const modalRef = useRef()
  const modalPaymentRef = useRef()

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

  const idPaymentRef = useRef()
  const paymentTypeRef = useRef()
  const paymentAmountRef = useRef()

  const [isEditing, setIsEditing] = useState(false)
  const [dataLoaded, setDataLoaded] = useState({})
  const [payments, setPayments] = useState([])

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

  const onPaymentModalOpen = async (data) => {
    setDataLoaded(data)

    const paymentsByProject = await PaymentsRest.byProject(data.id)
    setPayments(paymentsByProject)

    idPaymentRef.current.value = data?.id || null
    $(modalPaymentRef.current).modal('show')
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

  const onPaymentSubmit = async (e) => {
    e.preventDefault()
    const request = {
      payment_id: idPaymentRef.current.value || undefined,
      project_id: dataLoaded.id,
      payment_type: paymentTypeRef.current.value,
      amount: paymentAmountRef.current.value,
    }

    const result = await PaymentsRest.save(request)
    if (!result) return

    paymentTypeRef.current.value = null
    paymentAmountRef.current.value = null

    const paymentsByProject = await PaymentsRest.byProject(dataLoaded.id)
    const total_payments = paymentsByProject.reduce((acc, payment) => Number(acc) + Number(payment.amount), 0)
    const newDataLoaded = { ...dataLoaded, total_payments, remaining_amount: dataLoaded.cost - total_payments }
    setDataLoaded(newDataLoaded)
    setPayments(paymentsByProject)

    $(gridRef.current).dxDataGrid('instance').refresh()
    // $(modalPaymentRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, status }) => {
    const result = await ProjectsRest.status({ id, status })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const result = await ProjectsRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onProjectStatusClicked = async (project, status) => {
    const result = await ProjectsRest.projectStatus(project, status)
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
            hint: 'REFRESCAR TABLA',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
          }
        });
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'plus',
            hint: 'NUEVO REGISTRO',
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
          sortOrder: 'asc'
        },
        {
          dataField: 'client.name',
          caption: 'Cliente',
          filterValue: GET.client || undefined
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
        {
          dataField: 'project_status.name',
          caption: 'Estado del proyecto',
          dataType: 'string',
          cellTemplate: (container, { data }) => {
            container.attr('style', 'display: flex; gap: 4px; overflow: unset')
            ReactAppend(container, <Dropdown className='btn btn-xs btn-white rounded-pill' title={data.project_status.name} tippy='Actualizar estado' icon={{ icon: 'fa fa-circle', color: data.project_status.color }}>
              {statuses.map(({ id, name, color }) => {
                return <DropdownItem key={id} onClick={() => onProjectStatusClicked(data.id, id)}>
                  <i className='fa fa-circle' style={{ color }}></i> {name}
                </DropdownItem>
              })}
            </Dropdown>)
          }
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
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.attr('style', 'display: flex; gap: 4px; overflow: unset')

            ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-primary' title='Editar' onClick={() => onModalOpen(data)}>
              <i className='fa fa-pen'></i>
            </TippyButton>)

            ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-success' title='Ver/Agregar pagos' onClick={() => onPaymentModalOpen(data)}>
              <i className='fas fa-money-check-alt'></i>
            </TippyButton>)

            ReactAppend(container, <TippyButton className='btn btn-xs btn-light' title={data.status === null ? 'Restaurar' : 'Cambiar estado'} onClick={() => onStatusChange(data)}>
              {
                data.status === 1
                  ? <i className='fa fa-toggle-on text-success' />
                  : data.status === 0 ?
                    <i className='fa fa-toggle-off text-danger' />
                    : <i className='fas fa-trash-restore' />
              }
            </TippyButton>)

            ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-danger' title='Eliminar' onClick={() => onDeleteClicked(data.id)}>
              <i className='fa fa-trash-alt'></i>
            </TippyButton>)
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalRef} title={isEditing ? 'Editar proyecto' : 'Agregar proyecto'} onSubmit={onModalSubmit}>
      <div className='row' id='project-crud-container'>
        <input ref={idRef} type='hidden' />
        <SelectAPIFormGroup eRef={clientRef} label='Cliente' col='col-12' dropdownParent='#project-crud-container' searchAPI='/api/clients/paginate' searchBy='name' required />
        <SelectAPIFormGroup eRef={typeRef} label='Tipo del proyecto' col='col-md-4' dropdownParent='#project-crud-container' searchAPI='/api/types/paginate' searchBy='name' required />
        <InputFormGroup eRef={nameRef} label='Nombre del proyecto' col='col-md-8' required />
        <TextareaFormGroup eRef={descriptionRef} label='Descripcion del proyecto' col='col-12' />
        <InputFormGroup eRef={costRef} label='Costo' col='col-md-6' type='number' required />
        <InputFormGroup eRef={signAtRef} label='Fecha firma' col='col-md-6' type='date' />
        <InputFormGroup eRef={startsAtRef} label='Fecha inicio' col='col-md-6' type='date' required />
        <InputFormGroup eRef={endsAtRef} label='Fecha fin' col='col-md-6' type='date' required />
      </div>
    </Modal>

    <Modal modalRef={modalPaymentRef} title={`Pagos de ${dataLoaded?.name} - S/.${dataLoaded?.cost}`} onSubmit={onPaymentSubmit}>
      <div className='row'>
        <input ref={idPaymentRef} type='hidden' />
        <InputFormGroup eRef={paymentTypeRef} label='Concepto' col='col-md-7' required/>
        <div className='form-group col-md-5'>
          <label>Monto <b className='text-danger'>*</b></label>
          <div className='input-group' >
            <input ref={paymentAmountRef} type='number' className='form-control' placeholder={`Max: ${dataLoaded?.remaining_amount}`} min={0} max={dataLoaded?.remaining_amount} />
            <Tippy content='Agregar pago'>
              <button className='btn input-group-text btn-dark waves-effect waves-light' type='submit'>
                <i className='fa fa-plus'></i>
              </button>
            </Tippy>
          </div>
        </div>
      </div>
      <table className='table table-bordered table-sm table-responsive table-striped mb-2'>
        <thead>
          <tr>
            <th></th>
            <th>Fecha</th>
            <th>Concepto</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>{payments.map(payment => {
          return <tr>
            <td></td>
            <td>{moment(payment.created_at).format('LL')}</td>
            <td>{payment.payment_type}</td>
            <td>S/.{payment.amount}</td>
          </tr>
        })}</tbody>
      </table>
      <table className='table table-bordered table-sm table-responsive table-striped mb-0' style={{width: 'max-content', float: 'right'}}>
        <tbody>
          <tr>
            <th colSpan={3} className='text-end'>Pagado</th>
            <td>S/.{dataLoaded?.total_payments}</td>
          </tr>
          <tr>
            <th colSpan={3} className='text-end'>Por pagar</th>
            <td>S/.{dataLoaded?.remaining_amount}</td>
          </tr>
        </tbody>
      </table>
      
    </Modal>
  </>
  )
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <Adminto {...properties} title='Proyectos'>
      <Projects {...properties} />
    </Adminto>
  );
})