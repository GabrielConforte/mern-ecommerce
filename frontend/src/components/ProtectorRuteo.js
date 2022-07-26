import React from 'react'
import { Navigate } from 'react-router-dom'
import { Store } from '../utils/Store'

export default function ProtectorRuteo({ children }) {

    const { state } = React.useContext(Store);
    const {userInfo} = state;


  return (
    userInfo ? children : <Navigate to="/singin"></Navigate>
  )
}
