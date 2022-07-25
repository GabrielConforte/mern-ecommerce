import React , { useState, useContext }from 'react'
import { Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Store } from '../utils/Store';
import { getErrorMsj } from '../utils/errorMsj';
import { toast } from 'react-toastify';
import axios from 'axios';

const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_REQUEST':
        return { ...state, loadingUpdate: true };
      case 'UPDATE_SUCCESS':
        return { ...state, loadingUpdate: false };
      case 'UPDATE_FAIL':
        return { ...state, loadingUpdate: false };
  
      default:
        return state;
    }
  };

export default function Perfil() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    console.log(userInfo);
    const [name , setName] = useState(userInfo.name);
    const [email , setEmail] = useState(userInfo.email);
    const [password , setPassword] = useState('');
    const [passwordB , setPasswordB] = useState('');

    const [{loading, error}, dispatch] = useState({loading: false, error: ''});

    const submit = async (e) => {
        e.preventDefault();
        try{
            dispatch({type: 'UPDATE_REQUEST'});
            const { data } = await axios.put('http://localhost:5000/api/users/', {
                name,
                email,
                password,
            }, {
                headers: { autorizacion: `Bearer ${userInfo.token}` }
            });
            ctxDispatch({type: 'USER_LOGIN', payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Perfil actualizado');
        }catch(err) {
            dispatch({
              type: 'FETCH_FAIL',
            });
            toast.error(getErrorMsj(err));
          }
    }

  return (
    <div className='container loginContenedor'>
        <Helmet>
            <title>Perfil</title>
        </Helmet>
        <h1 className="my-3"> Perfil de usuario </h1>
        <Form onSubmit={submit}>
            <Form.Group controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={name || ' '} onChange={(e)=> setName(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email || ' '} onChange={(e)=> setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password || ''} onChange={(e)=> setPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="passwordB">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={passwordB || ''} onChange={(e)=> setPasswordB(e.targer.value)}/>
            </Form.Group>

            <Form.Group controlId="submit">
            <button className='btn-custom btn-cart mt-3' type="submit">
                Actualizar
            </button>
            </Form.Group>
        </Form>
    </div>
  )
}
