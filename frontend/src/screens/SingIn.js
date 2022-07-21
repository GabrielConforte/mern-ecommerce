import React from 'react'
import { Container, Form, Col,} from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useLocation, Link } from 'react-router-dom'


export default function SingIn() {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
  return (
    <Container className=''>
        <div className='loginContenedor'>
        <Helmet>
            <title>Iniciar Sesion</title>
        </Helmet>
        <h1 className='my-3'>Iniciar Sesion</h1>
    <Form>
        <Form.Group className="mb-3">
            <Form.Label column sm={2}>
                Email
            </Form.Label>
                <Form.Control type="text" placeholder="Usuario" />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label column sm={2}>
                Contraseña
            </Form.Label>
                <Form.Control type="password" placeholder="Contraseña" />
        </Form.Group>
        <Form.Group className="mb-3">
                <button className="btn-custom btn-cart" type="submit" block>
                    Iniciar Sesion
                </button>
        </Form.Group>
        <Form.Group className="mb-3">
                <Link to={`/singup?redirect=${redirect}`}>¿No tienes usuario?</Link>
        </Form.Group>

    </Form></div>
    </Container>
  )
}