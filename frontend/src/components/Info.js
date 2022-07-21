import React from 'react'

import { Alert } from 'react-bootstrap'

export default function Info(props) {
  return (
    <Alert variant={props.variant || 'info'}>
      {props.children}
    </Alert>
  )
}
