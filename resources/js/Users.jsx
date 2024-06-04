import { createInertiaApp } from '@inertiajs/react'
import React, { Children, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Cookies, Fetch, FetchParams } from 'sode-extend-react'
import Adminto from './components/Adminto'
import Table from './components/Table.jsx'
import Modal from './components/Modal.jsx'
import ReactAppend from './Utils/ReactAppend.jsx'
import TippyButton from './components/form/TippyButton.jsx'
import InputFormGroup from './components/form/InputFormGroup.jsx'
import PasswordFormGroup from './components/form/PasswordFormGroup.jsx'
import CreateReactScript from './Utils/CreateReactScript.jsx'

const Users = () => {
  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const lastnameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmRef = useRef()

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
      email: lastnameRef.current.value,
      password: passwordRef.current.value || undefined,
      confirm: confirmRef.current.value || undefined
    }

    const { status, result } = await Fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(request)
    })

    console.log(status, result)
  }

  return (<>
    <Table gridRef={gridRef} title='Usuarios' api='users/paginate'
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
          dataType: 'number'
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
                ReactAppend(container, <span className='badge bg-light rounded-pill'>Eliminado</span>)
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
            ReactAppend(container, <TippyButton className='btn btn-xs btn-light' title='Cambiar estado'>
              {
                data.status == 1
                  ? <i className='fa fa-toggle-on text-success'></i>
                  : <i className='fa fa-toggle-off text-danger'></i>
              }
            </TippyButton>)
            ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-danger' title='Eliminar'>
              <i className='fa fa-trash-alt'></i>
            </TippyButton>)
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalRef} title={isEditing ? 'Editar usuario': 'Agregar usuario'} onSubmit={onModalSubmit}>
      <div className='row'>
        <input ref={idRef} type='hidden' />
        <InputFormGroup eRef={nameRef} label='Nombres' col='col-md-6' required />
        <InputFormGroup eRef={lastnameRef} label='Apellidos' col='col-md-6' required />
        <InputFormGroup eRef={emailRef} label='Correo' col='col-12' type='email' required />
        <PasswordFormGroup eRef={passwordRef} label='Contraseña' col='col-md-6' required={!isEditing}/>
        <PasswordFormGroup eRef={confirmRef} label='Repetir contraseña' col='col-md-6' required={!isEditing}/>
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