import React, { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal";
import 'tippy.js/dist/tippy.css';
import Swal from "sweetalert2";
import Accordion from "../../components/accordion/Accordion";
import NotesRest from "../../actions/ClientNotesRest";
import InputFormGroup from "../../components/form/InputFormGroup";
import TextareaFormGroup from "../../components/form/TextareaFormGroup";
import SelectAPIFormGroup from "../../components/form/SelectAPIFormGroup";
import SetSelectValue from "../../Utils/SetSelectValue";
import AccordionCard from "../../components/accordion/AccordionCard";

const ClientNotesModal = ({ can, client, setClient, grid2refresh }) => {

  const modalNoteRef = useRef()
  const modalAddNoteRef = useRef()

  const idRef = useRef()
  const typeRef = useRef()
  const nameRef = useRef()
  const descriptionRef = useRef()

  const [notes, setNotes] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (client.id) {
      onNotesModalOpen()
    }

    $(modalNoteRef.current).on('hidden.bs.modal', () => {
      setClient({})
      setNotes([])
      setIsEditing(false)
      // idRef.current.value = null
      // projectIdRef.current.value = null
      // paymentTypeRef.current.value = null
      // paymentAmountRef.current.value = null
    })
  }, [client])


  const onNotesModalOpen = async () => {
    const notesByClient = await NotesRest.byClient(client?.id)
    setNotes(notesByClient)
    $(modalNoteRef.current).modal('show')
  }

  const onNoteSubmit = async (e) => {
    e.preventDefault()
    const request = {
      id: idRef.current.value || undefined,
      type_id: typeRef.current.value,
      client_id: client.id,
      name: nameRef.current.value,
      description: descriptionRef.current.value
    }

    const result = await NotesRest.save(request)
    if (!result) return

    $(modalAddNoteRef.current).modal('hide')

    idRef.current.value = null
    SetSelectValue(typeRef.current, null, null)
    nameRef.current.value = null
    descriptionRef.current.value = null

    await reloadNotes()
    grid2refresh.refresh()
  }

  const reloadNotes = async () => {
    const paymentsByProject = await NotesRest.byClient(client.id)
    const total_payments = paymentsByProject.reduce((acc, payment) => Number(acc) + Number(payment.amount), 0)
    const newDataLoaded = { ...client, total_payments, remaining_amount: client.cost - total_payments }
    setClient(newDataLoaded)
    setNotes(paymentsByProject)
  }

  const onEditPayment = async (payment) => {
    idRef.current.value = payment.id
    paymentTypeRef.current.value = payment.payment_type
    paymentAmountRef.current.value = payment.amount
    dateRef.current.value = payment.date || moment(payment.created_at).format('YYYY-MM-DD')
    setIsEditing(true)
  }

  const onDeletePayment = async (payment_id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Estas seguro de eliminar este pago?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Continuar",
      cancelButtonText: `Cancelar`
    })
    if (!isConfirmed) return

    const result = await NotesRest.delete(payment_id)
    if (!result) return
    await reloadNotes()
    grid2refresh.refresh()
  }

  return (<>
    <Modal modalRef={modalNoteRef} title={`Notas de ${client?.tradename || client?.name || client?.contact_name}`} hideFooter>
      <div className="text-center">
        <button className="btn btn-primary" type="button" onClick={() => $(modalAddNoteRef.current).modal('show')} >Agregar nota</button>
      </div>
      {notes.length > 0 && <hr className="my-2" />}
      <Accordion id='notes-accordion'>
        {notes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((note, i) => {
          return <AccordionCard key={`note-${i}`} id={`note-${i}`} title={<>
            {note.name}
            <small className="text-muted float-end">{moment(note.created_at).fromNow()}</small>
          </>} parent='notes-accordion' isOpened={i ===0}>
            {note.description}
          </AccordionCard>
        })}
      </Accordion>
    </Modal>
    <Modal modalRef={modalAddNoteRef} title="Agregar nota" size="sm" onSubmit={onNoteSubmit}>
      <div id="note-crud-container">
        <input ref={idRef} type="hidden" />
        <SelectAPIFormGroup eRef={typeRef} label='Tipo de nota' col='col-12' dropdownParent='#note-crud-container' searchAPI='/api/types/paginate' searchBy='name' filter={['table_id', '=', 4]} required />
        <InputFormGroup eRef={nameRef} label="Titulo de la nota" required />
        <TextareaFormGroup eRef={descriptionRef} label="Descripcion de la nota" required />
      </div>
    </Modal>
  </>)
}

export default ClientNotesModal;