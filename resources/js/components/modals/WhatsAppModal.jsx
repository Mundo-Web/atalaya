import React, { useEffect, useRef, useState } from "react";
import WhatsAppStatuses from "../../Reutilizables/WhatsApp/WhatsAppStatuses";
import '../../../css/qr-code.css'

const WhatsAppModal = ({ status: whatsappStatus, setStatus }) => {
  const qrRef = useRef()
  const whatsappIP = 'https://whatsapp.mundoweb.pe'

  const { color, icon, text } = WhatsAppStatuses[whatsappStatus]
  const [percent, setPercent] = useState(0)
  const [sessionInfo, setSessionInfo] = useState({})

  useEffect(() => {
    if (whatsappStatus == 'verifying') {
      let eventSource = new EventSource(`${whatsappIP}/api/verify?session=atalaya`)
      eventSource.onmessage = ({ data }) => {
        if (data == 'ping') return console.log('Realtime active')
        const { status, qr, percent, info } = JSON.parse(data)
        switch (status) {
          case 'qr':
            setStatus('qr')
            $(qrRef.current).empty()
            new QRCode(qrRef.current, {
              text: qr,
              width: 200,
              height: 200,
              colorDark: '#343a40'
            });
            break;
          case 'loading_screen':
            setStatus('loading_screen')
            setPercent(percent)
            break
          case 'authenticated':
            setStatus('authenticated')
            break
          case 'ready':
            setStatus('ready')
            setSessionInfo(info)
            eventSource.close()
            break
          case 'close':
            setStatus('close')
            eventSource.close()
            setTimeout(() => {
              setStatus('verifying')
            }, 2500)
            break
          default:
            eventSource.close()
            break;
        }
      }
      eventSource.onerror = event => {
        console.log('Realtime closed')
        setStatus('close')
        eventSource.close()
        setTimeout(() => {
          setStatus('verifying')
        }, 2500)
      }
    }
  }, [whatsappStatus])

  const onCloseClicked = async () => {
    await fetch(`${whatsappIP}/api/session/atalaya`, {
      method: 'DELETE'
    })
    setStatus('verifying')
  }

  console.log(sessionInfo)

  return (<div id="whatsapp-modal" className="modal fade" aria-hidden="true" data-bs-backdrop='static' >
    <div className="modal-dialog modal-sm modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <button type='button' className='btn-close position-absolute top-0 end-0 me-2 mt-2' data-bs-dismiss='modal' aria-label='Close'></button>
            <i className={`${icon} h1 text-${color} my-2 d-block`}></i>
            <h4 className="mt-2">{text} {whatsappStatus == 'loading_screen' && `[${percent}%]`}</h4>
            <div ref={qrRef} id="qr-code" className={`mt-3 text-center ${whatsappStatus == 'qr' ? 'd-block' : 'd-none'}`}>
            </div>
            {
              whatsappStatus == 'ready' && <div className="d-block py-2">
                <b>{sessionInfo.pushname}</b>
                <br />
                <span className="text-muted">{sessionInfo?.me?.user}@{sessionInfo?.me?.server}</span>
              </div>
            }
            {whatsappStatus == 'ready' && <button type="button" className="btn btn-danger my-2" onClick={onCloseClicked}>Cerrar sesion</button>}
          </div>
        </div>
      </div>
    </div>
  </div>)
}

export default WhatsAppModal;