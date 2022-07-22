import React, { useEffect , useState , useContext} from 'react'
import { Container, Form} from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Store } from '../utils/Store'
import { toast } from 'react-toastify'

export default function SingIn() {
    const Navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        if (userInfo) {
            Navigate(redirect);
            }
            }, [userInfo, Navigate, redirect]);

    const funcionSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.post('http://localhost:5000/api/users/signin', { 
                email,
                password
            });
            ctxDispatch({type: 'USER_LOGIN', payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            
            Navigate(redirect||'/');
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
  return (
    <Container className=''>
        <div className='loginContenedor'>
        <Helmet>
            <title>Iniciar Sesion</title>
        </Helmet>
        <h1 className='my-3'>Iniciar Sesion</h1>
    <Form onSubmit={funcionSubmit}>
        <Form.Group className="mb-3">
            <Form.Label column sm={2}>
                Email
            </Form.Label>
                <Form.Control type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} autoComplete="true" />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label column sm={2}>
                Contraseña
            </Form.Label>
                <Form.Control type="password" placeholder="Contraseña" required onChange={(e) => setPassword(e.target.value)} autoComplete="true"/>
        </Form.Group>
        <Form.Group className="mb-3">
                <button className="btn-custom btn-cart" type="submit">
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