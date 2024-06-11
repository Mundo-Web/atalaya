
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
import moment from 'moment-timezone'
import Dropdown from './components/dropdown/DropDown.jsx'
import DropdownItem from './components/dropdown/DropdownItem.jsx'

moment.locale('es')

const Leads = ({ statuses }) => {
  const gridRef = useRef()
  const modalLeadRef = useRef()
  const modalRef = useRef()

  // Form ref
  const contactNameRef = useRef()
  const contactEmailRef = useRef()
  const contactPhoneRef = useRef()
  const nameRef = useRef()
  const webUrlRef = useRef()
  const messageRef = useRef()

  const [isEditing, setIsEditing] = useState(false)
  const [lead, setLead] = useState({})

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    contactNameRef.current.value = data?.contact_name ?? ''
    contactEmailRef.current.value = data?.contact_email ?? ''
    contactPhoneRef.current.value = data?.contact_phone ?? ''
    nameRef.current.value = data?.name ?? ''
    webUrlRef.current.value = data?.web_url ?? ''
    messageRef.current.value = data?.message ?? ''

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      contact_name: contactNameRef.current.value,
      contact_email: contactEmailRef.current.value,
      contact_phone: contactPhoneRef.current.value,
      name: nameRef.current.value,
      web_url: webUrlRef.current.value,
      message: messageRef.current.value,
      client_width: window.screen.width,
      client_height: window.screen.height,
      client_system: navigator.platform ?? 'Linux'
      // TODO: Agregar latitud y longitud
    }

    const result = await ClientsRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onModalLeadOpen = (data) => {
    setLead(data)
    $(modalLeadRef.current).modal('show')
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
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'plus',
            hint: 'NUEVO REGISTRO',
            onClick: () => onModalOpen()
          }
        });
      }}
      filterValue={['client_status.id', '<>', 12]}
      columns={[
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
            ReactAppend(container, <Dropdown className='btn btn-xs btn-white rounded-pill' title={data.client_status.name} tippy='Actualizar estado'>
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
          },
          sortOrder: 'desc',
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.attr('style', 'display: flex; gap: 4px; overflow: unset')
            ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-success' title='Convertir en cliente' onClick={() => onClientStatusClicked(data.id, 12)}>
              <i className='fa fa-user-plus'></i>
            </TippyButton>)
            ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-primary' title='Ver lead' onClick={() => onModalLeadOpen(data)}>
              <i className='fa fa-comment'></i>
            </TippyButton>)
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalLeadRef} title={`Lead de ${lead?.contact_name}`} onSubmit={(e) => { e.preventDefault(); $(modalRef.current).modal('hide') }}>
      <div>
        <p>
          <b>Telefono</b>: {lead?.contact_phone}
        </p>
        <p className='my-2'>
          <b>Correo</b>: {lead?.contact_email}
        </p>
        <b>Mensaje</b>:
        <p className='mb-0'>{lead?.message}</p>
      </div>
    </Modal>

    <Modal modalRef={modalRef} title={isEditing ? 'Editar lead' : 'Nuevo lead'} btnSubmitText='Guardar' onSubmit={onModalSubmit}>
      <div className="row mb-0">
        <InputFormGroup eRef={contactNameRef} label='Nombre completo' required />
        <InputFormGroup eRef={contactEmailRef} label='Correo electronico' col='col-md-6' required />
        <InputFormGroup eRef={contactPhoneRef} label='Telefono' col='col-md-6' required />
        <InputFormGroup eRef={nameRef} label='Empresa / Marca' col='col-md-6' />
        <InputFormGroup eRef={webUrlRef} label='Link de WEB' col='col-md-6' />
        <TextareaFormGroup eRef={messageRef} label='Mensaje' placeholder='Ingresa tu mensaje' rows={4} required />
      </div>
    </Modal>
  </>
  )
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <Adminto {...properties} title='Leads'>
      <Leads {...properties} />
    </Adminto>
  );
})