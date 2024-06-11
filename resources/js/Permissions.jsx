
import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Adminto from './components/Adminto.jsx'
import Table from './components/Table.jsx'
import Modal from './components/Modal.jsx'
import ReactAppend from './Utils/ReactAppend.jsx'
import TippyButton from './components/form/TippyButton.jsx'
import InputFormGroup from './components/form/InputFormGroup.jsx'
import CreateReactScript from './Utils/CreateReactScript.jsx'
import JSEncrypt from 'jsencrypt'
import PermissionsRest from './actions/PermissionsRest.js'
import moment from 'moment-timezone'
import TextareaFormGroup from './components/form/TextareaFormGroup.jsx'

const Permissions = ({ PUBLIC_RSA_KEY }) => {
  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const descriptionRef = useRef()

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id || null
    nameRef.current.value = data?.name || null
    descriptionRef.current.value = data?.description || null

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      description: descriptionRef.current.value
    }

    const result = await PermissionsRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onDeleteClicked = async (id) => {
    const result = await PermissionsRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Permisos' rest={PermissionsRest}
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
          caption: 'Permiso'
        },
        {
          dataField: 'description',
          caption: 'Descripcion'
        },
        {
          dataField: 'created_at',
          caption: 'Fecha creacion',
          dataType: 'date',
          cellTemplate: (container, { data }) => {
            ReactAppend(container, <span>{moment(data.created_at).format('LL')}</span>)
          }
        },
        {
          dataField: 'updated_at',
          caption: 'Fecha actualizacion',
          dataType: 'date',
          cellTemplate: (container, { data }) => {
            ReactAppend(container, <span>{moment(data.updated_at).format('LL')}</span>)
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.attr('style', 'display: flex; gap: 4px; overflow: unset')

            ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-primary' title='Editar' onClick={() => onModalOpen(data)}>
              <i className='fa fa-pen'></i>
            </TippyButton>)

            ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-danger' title='Eliminar' onClick={() => onDeleteClicked(data.id)}>
              <i className='fa fa-trash-alt'></i>
            </TippyButton>)
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalRef} title={isEditing ? 'Editar rol' : 'Agregar rol'} onSubmit={onModalSubmit}>
      <div className='row'>
        <input ref={idRef} type='hidden' />
        <InputFormGroup eRef={nameRef} label='Permiso' col='col-12' required disabled={isEditing} />
        <TextareaFormGroup eRef={descriptionRef} label='Descripcion' col='col-12' />
      </div>
    </Modal>
  </>
  )
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <Adminto {...properties} title='Permisos'>
      <Permissions {...properties} />
    </Adminto>
  );
})