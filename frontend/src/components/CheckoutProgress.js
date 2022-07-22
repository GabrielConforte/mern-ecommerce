import React from 'react'
import { Row, Col} from 'react-bootstrap'

export default function CheckoutProgress(props) {
  return (
    <Row className="barraProgreso mb-2 p-3 text-center">
        <Col className={props.step1 ? 'active' : ''}><b>Ingresar</b></Col>
        <Col className={props.step2 ? 'active' : ''}><b>Envio</b></Col>
        <Col className={props.step3 ? 'active' : ''}><b>Pago</b></Col>
        <Col className={props.step4 ? 'active' : ''}><b>Confirmacion</b></Col>
    </Row>
  )
}
