
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
import moment from 'moment-timezone'
import SetSelectValue from './Utils/SetSelectValue.jsx'

const Projects = () => {
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
          dataField: 'client.name',
          caption: 'Cliente'
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
          caption: 'Costo'
        },
        {
          dataField: 'project_status.name',
          caption: 'Estado del proyecto'
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
    <Modal modalRef={modalRef} title={isEditing ? 'Editar cliente' : 'Agregar cliente'} onSubmit={onModalSubmit}>
      <div className='row' id='client-crud-container'>
        <input ref={idRef} type='hidden' />
        <SelectAPIFormGroup eRef={clientRef} label='Cliente' col='col-md-6' dropdownParent='#client-crud-container' searchAPI='/api/clients/paginate' searchBy='name' required />
        <SelectAPIFormGroup eRef={typeRef} label='Tipo' col='col-md-6' dropdownParent='#client-crud-container' searchAPI='/api/types/paginate' searchBy='name' required />
        <InputFormGroup eRef={nameRef} label='Nombre' col='col-12' required />
        <TextareaFormGroup eRef={descriptionRef} label='Descripcion' col='col-12' />
        <InputFormGroup eRef={costRef} label='Costo' col='col-md-6' type='number' required />
        <InputFormGroup eRef={signAtRef} label='Fecha firma' col='col-md-6' type='date' />
        <InputFormGroup eRef={startsAtRef} label='Fecha inicio' col='col-md-6' type='date' required />
        <InputFormGroup eRef={endsAtRef} label='Fecha fin' col='col-md-6' type='date' required />
      </div>
    </Modal>
  </>
  )
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <Adminto session={properties.session} title='Proyectos'>
      <Projects {...properties} />
    </Adminto>
  );
})