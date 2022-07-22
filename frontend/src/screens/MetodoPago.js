import React, {useState, useContext, useEffect} from 'react';
import CheckoutProgress from '../components/CheckoutProgress';
import { Helmet } from 'react-helmet-async';
import { Store } from '../utils/Store';
import { useNavigate } from 'react-router-dom';
import {Form } from 'react-bootstrap';

export default function MetodoPago() {
    const Navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const { cart: { shipping, metodoPago} } = state;
    const [metodo, setMetodo] = useState(metodoPago ? metodoPago.metodo : '' );

    useEffect(() => {
        if(!shipping) {
            Navigate('/shipping');
        }
    }
    , [shipping, Navigate]);

    const submit = async (e) => {
        e.preventDefault();
        await ctxDispatch({type: 'USER_METODO_PAGO', payload: {metodo}});
        localStorage.setItem('metodoPago', metodo);
        Navigate('/confirmation');
    }

    return (<>
    <CheckoutProgress step1 step2 step3></CheckoutProgress>
    <Helmet>Metodo de Pago</Helmet>
    <div className='loginContenedor'>
        <h1>Metodo de Pago</h1>
       <Form onSubmit={submit}>
       <div className="mb-3">
            <Form.Check
              type="radio"
              id="MercadoPago"
              label="MercadoPago"
              value="MercadoPago"
              checked={metodo === 'MercadoPago'}
              onChange={(e) => setMetodo(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="trasferencia"
              label="trasferencia"
              value="trasferencia"
              checked={metodo=== 'trasferencia'}
              onChange={(e) => setMetodo(e.target.value)}
            />
          </div>
            <button className="btn-custom btn-cart" type='submit'>Continuar</button>
       </Form>

    </div>

    </>);
}