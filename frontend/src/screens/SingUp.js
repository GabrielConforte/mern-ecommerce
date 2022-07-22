import React, { useEffect , useState , useContext} from 'react'
import { Container, Form} from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Store } from '../utils/Store'
import { toast } from 'react-toastify'

export default function SingUp() {
    const Navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordB, setPasswordB] = useState('');
    const { state  } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        if (userInfo) {
            Navigate(redirect);
            }
            }, [userInfo, Navigate, redirect]);

    const funcionSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordB) {
            toast.error('Las contraseñas no coinciden');
            return;
        }
        try{
            const {data} = await axios.post('http://localhost:5000/api/users/signup', { 
                nombre,
                email,
                password
            });

            //mensaje de creacion exitosa
            toast.success(data.message);
            Navigate(redirect||'/');
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
  return (
    <Container className=''>
        <div className='loginContenedor'>
        <Helmet>
            <title>Crear Usuario</title>
        </Helmet>
        <h1 className='my-3'>Crear Usuario</h1>
    <Form onSubmit={funcionSubmit}>
    <Form.Group className="mb-3">
            <Form.Label column sm={2}>
                Nombre
            </Form.Label>
                <Form.Control type="text" placeholder="Nombre de usuario" required onChange={(e) => setNombre(e.target.value)} autoComplete="true" />
        </Form.Group>
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
            <Form.Label column sm={2}>
                Confirmar Contraseña
            </Form.Label>
                <Form.Control type="password" placeholder="La misma contraseña" required onChange={(e) => setPasswordB(e.target.value)} autoComplete="true"/>
        </Form.Group>
        <Form.Group className="mb-3">
                <button className="btn-custom btn-cart" type="submit">
                    Crear usuario
                </button>
        </Form.Group>
        <Form.Group className="mb-3">
                <Link to={`/singin?redirect=${redirect}`}>¿Ya tienes usuario?</Link>
        </Form.Group>

    </Form></div>
    </Container>
  )
}