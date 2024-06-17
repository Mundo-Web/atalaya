
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
import Dropdown from './components/dropdown/DropDown.jsx'
import DropdownItem from './components/dropdown/DropdownItem.jsx'
import Swal from 'sweetalert2'
import ClientNotesModal from './Reutilizables/ClientNotes/ClientNotesModal.jsx'
import Tippy from '@tippyjs/react'

const Leads = ({ statuses, session, can }) => {
  const gridRef = useRef()
  const modalLeadRef = useRef()
  const modalRef = useRef()

  // Form ref
  const idRef = useRef()
  const contactNameRef = useRef()
  const contactEmailRef = useRef()
  const contactPhoneRef = useRef()
  const nameRef = useRef()
  const webUrlRef = useRef()
  const messageRef = useRef()

  const [isEditing, setIsEditing] = useState(false)
  const [lead, setLead] = useState({})
  const [clientLoaded, setClientLoaded] = useState({})

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
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
      id: idRef.current.value,
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

  const onAssignLeadClicked = async (client_id, assign) => {
    const result = await ClientsRest.assign(client_id, assign)
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
        can('leads', 'root', 'all', 'create') && container.unshift({
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
          caption: 'Cliente',
          width: 250,
          cellTemplate: (container, { data }) => {
            // container.attr('style', 'display:flex; overflow: visible')
            ReactAppend(container, <div className='d-flex align-items-center'>
              <div>{data.contact_name}</div>
              {data.user_assigned.id && <Tippy content={`Atendido por ${data.user_assigned.name} ${data.user_assigned.lastname}`}>
                <img className='avatar-xs rounded-circle ms-1' src={`/api/profile/thumbnail/${data.user_assigned.relative_id}`} alt={data.user_assigned.name} />
              </Tippy>}
            </div>)
          }
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
        can('leads', 'root', 'all', 'changestatus') ? {
          dataField: 'client_status.name',
          caption: 'Estado del cliente',
          dataType: 'string',
          cellTemplate: (container, { data }) => {
            container.attr('style', 'overflow: visible')
            ReactAppend(container, <Dropdown className='btn btn-xs btn-white rounded-pill' title={data.client_status.name} icon={{ icon: 'fa fa-circle', color: data.client_status.color }} tippy='Actualizar estado'>
              {statuses.map(({ id, name, color }) => {
                return <DropdownItem key={id} onClick={() => onClientStatusClicked(data.id, id)}>
                  <i className='fa fa-circle' style={{ color }}></i> {name}
                </DropdownItem>
              })}
            </Dropdown>)
          }
        } : null,
        {
          dataField: 'source',
          caption: 'Fuente',
          dataType: 'string'
        },
        {
          dataField: 'created_at',
          caption: 'Fecha creacion',
          dataType: 'datetime',
          cellTemplate: (container, { data }) => {
            container.text(moment(data.created_at).format('lll'))
          },
          sortOrder: 'desc',
        },
        {
          caption: 'Acciones',
          width: 200,
          cellTemplate: (container, { data }) => {
            container.attr('style', 'display: flex; gap: 4px; overflow: visible')

            can('leads', 'root', 'all', 'update') && ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-primary' title='Editar lead' onClick={() => onModalOpen(data)}>
              <i className='fa fa-pen'></i>
            </TippyButton>)

            if (!data.user_assigned.id) {
              ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-dark' title="Atender lead"
                onClick={() => onAssignLeadClicked(data.id, true)}>
                <i className='fas fa-hands-helping'></i>
              </TippyButton>)
            } else if (data.user_assigned.id == session.id) {
              ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-danger' title="Dejar de atender"
                onClick={() => onAssignLeadClicked(data.id, false)}>
                <i className='fas fa-hands-wash'></i>
              </TippyButton>)
            }

            can('leads', 'root', 'all', 'movetoclient') && ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-success' title='Convertir en cliente' onClick={async () => {
              const { isConfirmed } = await Swal.fire({
                title: "Estas seguro?",
                text: `${data.contact_name} pasara a ser un cliente!`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Continuar",
                cancelButtonText: `Cancelar`
              })
              if (isConfirmed) onClientStatusClicked(data.id, 12)
            }}>
              <i className='fa fa-user-plus'></i>
            </TippyButton>)
            can('leads', 'root', 'all', 'addnotes') && ReactAppend(container, <TippyButton className="btn btn-xs btn-soft-primary position-relative" title="Ver/Agregar notas" onClick={() => setClientLoaded(data)}>
              <i className="fas fa-sticky-note" />
              {
                data.notes > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {data.notes}
                  <span className="visually-hidden">Notas de {data.name}</span>
                </span>
              }
            </TippyButton>)
            ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-info' title='Ver lead' onClick={() => onModalLeadOpen(data)}>
              <i className='fa fa-comment'></i>
            </TippyButton>)
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalLeadRef} title={`Lead de ${lead?.contact_name}`} onSubmit={(e) => { e.preventDefault(); $(modalRef.current).modal('hide') }} hideButtonSubmit={true}>
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
        <input ref={idRef} type="hidden" />
        <InputFormGroup eRef={contactNameRef} label='Nombre completo' required />
        <InputFormGroup eRef={contactEmailRef} label='Correo electronico' type="email" col='col-md-6' />
        <InputFormGroup eRef={contactPhoneRef} label='Telefono' type="tel" col='col-md-6' required />
        <InputFormGroup eRef={nameRef} label='Empresa / Marca' col='col-md-6' />
        <InputFormGroup eRef={webUrlRef} label='Link de WEB' col='col-md-6' />
        <TextareaFormGroup eRef={messageRef} label='Mensaje' placeholder='Ingresa tu mensaje' rows={4} required />
      </div>
    </Modal>
    <ClientNotesModal can={can} client={clientLoaded} setClient={setClientLoaded} grid2refresh={gridRef} page='leads' />
  </>
  )
};

CreateReactScript((el, properties) => {
  if (!properties.can('leads', 'root', 'all', 'list')) return location.href = '/';
  createRoot(el).render(
    <Adminto {...properties} title='Leads'>
      <Leads {...properties} />
    </Adminto>
  );
})