import React , { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Form } from 'react-bootstrap'
import { Store } from '../utils/Store'
import CheckoutProgress from '../components/CheckoutProgress'

export default function Shipping() {
    const Navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);

    const {userInfo, cart: {shipping} } = state;
    
    const [name, setName] = useState(shipping ? shipping.name : ' ' );
    const [address, setAddress] = useState(shipping ? shipping.address : ' ' );
    const [city, setCity] = useState(shipping ? shipping.city : ' ' );
    const [prov, setProv] = useState(shipping ? shipping.prov : ' ' );
    const [zip, setZip] = useState(shipping ? shipping.zip : ' ' );
    const [phone, setPhone] = useState(shipping ? shipping.phone : ' ' );

    const submit = async (e) => {
        e.preventDefault();
        await ctxDispatch({type: 'USER_SHIPPING', payload: {name, address, city, prov, zip, phone}});
        Navigate('/payment');
    }

    useEffect(() => {
        if(!userInfo) {
            Navigate('/singin');
        }
    }, [userInfo, Navigate]);

  return (
    <div><Helmet>Envio</Helmet>
    <CheckoutProgress step1 step2></CheckoutProgress>
    <div className='loginContenedor'>
        <h1>Envio</h1>
      
        <Form onSubmit={submit}>
            <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control type='text' placeholder='Nombre Completo' required onChange={(e)=> setName(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='address'>
                <Form.Label>Direccion</Form.Label>
                <Form.Control type='text' placeholder='Direccion' required onChange={(e)=> setAddress(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='phone'>
                <Form.Label>Telefono</Form.Label>
                <Form.Control type='text' placeholder='Telefono' required onChange={(e)=> setPhone(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='city'>
                <Form.Label>Ciudad</Form.Label>
                <Form.Control type='text' placeholder='Ciudad' required onChange={(e)=> setCity(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='zip'>
                <Form.Label>Codigo Postal</Form.Label>
                <Form.Control type='text' placeholder='Codigo Postal' required  onChange={(e)=> setZip(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='prov'>
                <Form.Label>Provincia</Form.Label>
                <Form.Control type='text' placeholder='Provincia' required onChange={(e)=> setProv(e.target.value)} />
            </Form.Group>
            <div>
                <button type="submit" className="btn-custom btn-cart">Enviar</button>
            </div>
        </Form></div>
    </div>
  )
}
