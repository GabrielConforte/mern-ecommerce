import React from 'react'
import { Navigate } from 'react-router-dom'
import { Store } from '../utils/Store'

export default function AdminRuteo({ children }) {

    const { state } = React.useContext(Store);
    const {userInfo} = state;


  return (
    userInfo && userInfo.isAdmin ? children : <Navigate to="/singin"></Navigate>
  )
}
