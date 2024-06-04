
import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Fetch, Notify } from 'sode-extend-react'
import Adminto from './components/Adminto'
import Table from './components/Table.jsx'
import Modal from './components/Modal.jsx'
import ReactAppend from './Utils/ReactAppend.jsx'
import TippyButton from './components/form/TippyButton.jsx'
import InputFormGroup from './components/form/InputFormGroup.jsx'
import PasswordFormGroup from './components/form/PasswordFormGroup.jsx'
import CreateReactScript from './Utils/CreateReactScript.jsx'
import JSEncrypt from 'jsencrypt'
import UsersRest from './actions/UsersRest.js'

const Users = ({ PUBLIC_RSA_KEY }) => {
  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const lastnameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmRef = useRef()

  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPublicKey(PUBLIC_RSA_KEY)

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (user) => {
    if (user?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = user?.id || null
    nameRef.current.value = user?.name || null
    lastnameRef.current.value = user?.lastname || null
    emailRef.current.value = user?.email || null
    passwordRef.current.value = null
    confirmRef.current.value = null

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      password: jsEncrypt.encrypt(passwordRef.current.value) || undefined,
      confirm: jsEncrypt.encrypt(confirmRef.current.value) || undefined
    }

    const result = await UsersRest.save(request)
    if (!result) return
    
    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, status }) => {
    const result = await UsersRest.status({id, status})
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const result = await UsersRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Usuarios' rest={UsersRest}
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
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          dataType: 'number',
          sortOrder: 'asc'
        },
        {
          dataField: 'name',
          caption: 'Nombres'
        },
        {
          dataField: 'lastname',
          caption: 'Apellidos'
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
    <Modal modalRef={modalRef} title={isEditing ? 'Editar usuario' : 'Agregar usuario'} onSubmit={onModalSubmit}>
      <div className='row'>
        <input ref={idRef} type='hidden' />
        <InputFormGroup eRef={nameRef} label='Nombres' col='col-md-6' required />
        <InputFormGroup eRef={lastnameRef} label='Apellidos' col='col-md-6' required />
        <InputFormGroup eRef={emailRef} label='Correo' col='col-12' type='email' required />
        <PasswordFormGroup eRef={passwordRef} label='Contraseña' col='col-md-6' required={!isEditing} />
        <PasswordFormGroup eRef={confirmRef} label='Repetir contraseña' col='col-md-6' required={!isEditing} />
      </div>
    </Modal>
  </>
  )
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <Adminto session={properties.session} title='Usuarios'>
      <Users {...properties} />
    </Adminto>
  );
})