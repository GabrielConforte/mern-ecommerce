import React from 'react'

import Spinner from 'react-bootstrap/Spinner'

export default function Loading() {
  return (
    <div><Spinner animation="border" role="status">
        <span className='visually-hidden'>Cargando informacion</span>
            </Spinner></div>
  )
}
