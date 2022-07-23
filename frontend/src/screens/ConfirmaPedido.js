import React, {useContext, useEffect, useReducer, useState} from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../utils/Store';
import {Row, Col, Card, ListGroup} from 'react-bootstrap';
import {Link, useNavigate } from 'react-router-dom';
import CheckoutProgress from '../components/CheckoutProgress';
import {toast} from 'react-toastify';
import { getErrorMsj } from '../utils/errorMsj';
import axios from 'axios';
import Loading from '../components/Loading';

const reducer = (state, action) => {
    switch (action.type) {
        case 'CREAR_PEDIDO':
            return {...state, metodoPago: action.payload}
        case 'CREAR_CORRECTO':
            return {...state, correcto: action.payload}
        case 'CREAR_ERROR':
            return {...state, error: action.payload}
        default:
            return state
    }
}   

export default function ConfirmaPedido() {
    const Navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const { cart, userInfo} = state;
    const [total, setTotal] = useState(0);
    const [{loading, error}, dispatch] = useReducer(reducer, {loading: false, error: ' '});

    const enviarOrden = async () => {
        try{    
            dispatch({type: 'CREAR_PEDIDO', payload: cart});
            const { data } = await axios.post('/api/orders', {
                pedido: cart.items,
                metodoPago: cart.metodoPago.metodo,
                usuario: userInfo._id,
                total: total,
                envio: cart.shipping
            },
            {
                headers: {
                    autorizacion: `Bearer ${userInfo.token}`
                }
            });
            ctxDispatch({type: 'CLEAR_CART'});
            dispatch({type: 'CREAR_CORRECTO'});
            localStorage.removeItem('cartItems');
            console.log(data);
            toast.success('Orden creada correctamente');
            Navigate(`/order/${data._id}`);
        }catch(error){
            dispatch({type: 'CREAR_ERROR'})
            toast.error(getErrorMsj(error));
        }
    }

    useEffect(() => {
        setTotal((cart.items.reduce((a,b) => a + b.price * b.cant, 0)) + (cart.items.reduce((acc, item) => acc + item.price * item.cant, 0) > 100 ? 0 : 10));
        if(!userInfo) {
            Navigate('/singin');
        }

        if(!cart.shipping.address) {
            Navigate('/shipping');
        }

        if(!cart.metodoPago.metodo){
            Navigate('/payment');
        }
    }, [cart, Navigate, userInfo]);


  return (
    <div>
        <Helmet>Confirma Pedido</Helmet>
        <CheckoutProgress step1 step2 step3 step4></CheckoutProgress>
        <div className='m-1'>
        <h1>Confirma Pedido</h1>
        <h3 className='my-3'> Vista Previa </h3>
        <Row>
            <Col md={8}>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Detalles del envio</Card.Title>
                        <Card.Text>
                            <strong>Nombre: </strong> {cart.shipping.name}<br/>
                            <strong>Dirección: </strong> {cart.shipping.address}, {cart.shipping.city}, {cart.shipping.prov}, {cart.shipping.zip} <br/>
                            <strong>Telefono: </strong> {cart.shipping.phone} <br/>
                        </Card.Text>
                        <Link to='/shipping'>Editar datos</Link>
                    </Card.Body>
                </Card>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Detalles del pago</Card.Title>  
                        <Card.Text>
                            <strong>Metodo de pago: </strong> {cart.metodoPago.metodo} <br/>
                        </Card.Text>
                        <Link to='/payment'>Editar datos</Link>
                    </Card.Body>
                </Card>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Detalles del pedido</Card.Title>
                        <ListGroup variant="flush">
                            <Row>
                            {cart.items.map((item, index) => {
                                return (
                                    <Col className="rounded mb-3"key={item._id}>
                                    <ListGroup.Item >
                                        <img src={item.image} className="img-thumb rounded"></img>
                                        <Link to={`/product/${item.slug}`}>{item.name}</Link> x {item.cant} <br/>
                                        <strong>Subtotal: </strong> ${item.price * item.cant} <br/>
                                    </ListGroup.Item></Col>
                                )
                            })}</Row>
                        </ListGroup>
                        <Link to="/carrito">Editar datos</Link>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Resumen del pedido</Card.Title>
                        <Card.Text>
                            <strong>Subtotal: </strong> ${cart.items.reduce((a,b) => a + b.price * b.cant, 0)} <br/>
                            <strong>Envio: </strong>${cart.items.reduce((acc, item) => acc + item.price * item.cant, 0) > 100 ? 0 : 10}<br/>
                            <strong>Total: </strong>${total}<br/>
                        </Card.Text>
                            <button onClick={enviarOrden} className='btn-custom btn-cart' > Enviar Orden </button>
                            {loading && <Loading></Loading>}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </div>
    </div>
  )
}
