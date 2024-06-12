import React, { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal";
import InputFormGroup from "../../components/form/InputFormGroup";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import PaymentsRest from "../../actions/PaymentsRest";

const PaymentModal = ({ dataLoaded, setDataLoaded, grid2refresh }) => {

  const modalPaymentRef = useRef()
  
  const idPaymentRef = useRef()
  const paymentTypeRef = useRef()
  const paymentAmountRef = useRef()

  const [payments, setPayments] = useState([])

  useEffect(() => {
    if (dataLoaded.id) {
      onPaymentModalOpen()
    }

    $(modalPaymentRef.current).on('hidden.bs.modal', () => {
      setDataLoaded({})
    })
  }, [dataLoaded])


  const onPaymentModalOpen = async () => {
    const paymentsByProject = await PaymentsRest.byProject(dataLoaded?.id)
    setPayments(paymentsByProject)

    idPaymentRef.current.value = dataLoaded?.id || null
    $(modalPaymentRef.current).modal('show')
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

    grid2refresh.refresh()
    // $(modalPaymentRef.current).modal('hide')
  }
  return (
    <Modal modalRef={modalPaymentRef} title={`Pagos de ${dataLoaded?.name} - S/.${dataLoaded?.cost}`} onSubmit={onPaymentSubmit} hideButtonSubmit>
      <div className={`row ${dataLoaded.remaining_amount > 0 ? '' : 'd-none'}`}>
        <input ref={idPaymentRef} type='hidden' />
        <InputFormGroup eRef={paymentTypeRef} label='Concepto' col='col-md-7' required />
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
          return <tr key={`project-payment-${payment.id}`}>
            <td></td>
            <td>{moment(payment.created_at).format('LL')}</td>
            <td>{payment.payment_type}</td>
            <td>S/.{payment.amount}</td>
          </tr>
        })}</tbody>
      </table>
      <table className='table table-bordered table-sm table-responsive table-striped mb-0' style={{ width: 'max-content', float: 'right' }}>
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
  )
}

export default PaymentModal;