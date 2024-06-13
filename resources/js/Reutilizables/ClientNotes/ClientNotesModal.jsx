import React, { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal";
import InputFormGroup from "../../components/form/InputFormGroup";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import PaymentsRest from "../../actions/PaymentsRest";
import TippyButton from "../../components/form/TippyButton";
import Swal from "sweetalert2";

const ClientNotesModal = ({ can, client, setClient, grid2refresh }) => {

  const modalPaymentRef = useRef()

  const idRef = useRef()
  const projectIdRef = useRef()
  const paymentTypeRef = useRef()
  const dateRef = useRef()
  const paymentAmountRef = useRef()

  const [payments, setPayments] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (client.id) {
      onPaymentModalOpen()
    }

    $(modalPaymentRef.current).on('hidden.bs.modal', () => {
      setClient({})
      setPayments([])
      setIsEditing(false)
      // idRef.current.value = null
      // projectIdRef.current.value = null
      // paymentTypeRef.current.value = null
      // paymentAmountRef.current.value = null
    })
  }, [client])


  const onPaymentModalOpen = async () => {
    const paymentsByProject = await PaymentsRest.byProject(client?.id)
    setPayments(paymentsByProject)

    // projectIdRef.current.value = client?.id || null
    $(modalPaymentRef.current).modal('show')
  }

  const onPaymentSubmit = async (e) => {
    e.preventDefault()
    const request = {
      id: idRef.current.value || undefined,
      payment_id: projectIdRef.current.value,
      project_id: client.id,
      payment_type: paymentTypeRef.current.value,
      amount: paymentAmountRef.current.value,
      date: dateRef.current.value
    }

    const result = await PaymentsRest.save(request)
    if (!result) return

    idRef.current.value = null
    paymentTypeRef.current.value = null
    paymentAmountRef.current.value = null

    await reloadPayment()
    grid2refresh.refresh()
  }

  const reloadPayment = async () => {
    const paymentsByProject = await PaymentsRest.byProject(client.id)
    const total_payments = paymentsByProject.reduce((acc, payment) => Number(acc) + Number(payment.amount), 0)
    const newDataLoaded = { ...client, total_payments, remaining_amount: client.cost - total_payments }
    setClient(newDataLoaded)
    setPayments(paymentsByProject)
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

    const result = await PaymentsRest.delete(payment_id)
    if (!result) return
    await reloadPayment()
    grid2refresh.refresh()

  }

  return (
    <div ref={modalPaymentRef} className="modal fade" tabIndex="-1" aria-labelledby="standard-modalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="standard-modalLabel">Notas de  {client?.tradename || client?.name || client?.contact_name}</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientNotesModal;