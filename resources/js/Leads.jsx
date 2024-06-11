
import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import CreateReactScript from './Utils/CreateReactScript.jsx'
import ReactAppend from './Utils/ReactAppend.jsx'
import ClientsRest from './actions/ClientsRest.js'
import Adminto from './components/Adminto.jsx'
import Modal from './components/Modal.jsx'
import Table from './components/Table.jsx'
import InputFormGroup from './components/form/InputFormGroup.jsx'
import TextareaFormGroup from './components/form/TextareaFormGroup.jsx'
import TippyButton from './components/form/TippyButton.jsx'
import SelectAPIFormGroup from './components/form/SelectAPIFormGroup.jsx'
import moment from 'moment-timezone'
import SetSelectValue from './Utils/SetSelectValue.jsx'
import { GET } from 'sode-extend-react'
import Dropdown from './components/dropdown/DropDown.jsx'
import DropdownItem from './components/dropdown/DropdownItem.jsx'

moment.locale('es')

const Leads = ({ statuses }) => {
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

  const onClientStatusClicked = async (client, status) => {
    const result = await ClientsRest.clientStatus(client, status)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Leads' rest={ClientsRest}
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
      filterValue={['client_status.id', '<>', 12]}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          dataType: 'number',
          sortOrder: 'asc'
        },
        {
          dataField: 'contact_name',
          caption: 'Cliente'
        },
        {
          dataField: 'contact_email',
          caption: 'Correo'
        },
        {
          dataField: 'contact_phone',
          caption: 'Telefono'
        },
        {
          dataField: 'client_status.id',
          caption: 'ID estado cliente',
          visible: false
        },
        {
          dataField: 'client_status.name',
          caption: 'Estado del cliente',
          dataType: 'string',
          cellTemplate: (container, { data }) => {
            container.attr('style', 'display: flex; gap: 4px; overflow: unset')
            ReactAppend(container, <Dropdown className='btn btn-xs btn-white rounded-pill' title={data.client_status.name} tippy="Actualizar estado">
              {statuses.map(({ id, name }) => {
                return <DropdownItem key={id} onClick={() => onClientStatusClicked(data.id, id)}>
                  {name}
                </DropdownItem>
              })}
            </Dropdown>)
          }
        },
        {
          dataField: 'created_at',
          caption: 'Fecha creacion',
          dataType: 'datetime',
          cellTemplate: (container, { data }) => {
            container.text(moment(data.created_at).format('LL'))
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.attr('style', 'display: flex; gap: 4px; overflow: unset')
            ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-success' title='Convertir en cliente' onClick={() => onClientStatusClicked(data.id, 12)}>
              <i className='fa fa-user-plus'></i>
            </TippyButton>)
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    {/* <Modal modalRef={modalRef} title={isEditing ? 'Editar proyecto' : 'Agregar proyecto'} onSubmit={onModalSubmit}>
      <div className='row' id='client-crud-container'>
        <input ref={idRef} type='hidden' />
        <SelectAPIFormGroup eRef={clientRef} label='Cliente' col='col-12' dropdownParent='#client-crud-container' searchAPI='/api/clients/paginate' searchBy='name' required />
        <SelectAPIFormGroup eRef={typeRef} label='Tipo del proyecto' col='col-md-4' dropdownParent='#client-crud-container' searchAPI='/api/types/paginate' searchBy='name' required />
        <InputFormGroup eRef={nameRef} label='Nombre del proyecto' col='col-md-8' required />
        <TextareaFormGroup eRef={descriptionRef} label='Descripcion del proyecto' col='col-12' />
        <InputFormGroup eRef={costRef} label='Costo' col='col-md-6' type='number' required />
        <InputFormGroup eRef={signAtRef} label='Fecha firma' col='col-md-6' type='date' />
        <InputFormGroup eRef={startsAtRef} label='Fecha inicio' col='col-md-6' type='date' required />
        <InputFormGroup eRef={endsAtRef} label='Fecha fin' col='col-md-6' type='date' required />
      </div>
    </Modal> */}
  </>
  )
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <Adminto session={properties.session} title='Leads'>
      <Leads {...properties} />
    </Adminto>
  );
})