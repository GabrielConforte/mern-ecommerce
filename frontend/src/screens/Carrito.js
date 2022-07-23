//funcionalidades de react
import React from 'react'
import { useContext } from 'react'

//servicios y dependencias
import { Helmet } from 'react-helmet-async'
import axios from 'axios'

//componentes
import { Store } from '../utils/Store'
import { Row, Col, ListGroup, Card} from 'react-bootstrap'
import Info from '../components/Info'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Carrito() {
    const Navigate = useNavigate();
    const {state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { items },
      } = state;
      console.log(items);
    const updateCart = async (item, cant) => {
        const { data } = await axios.get(`/api/product/${item._id}`);
        if(cant === data.stock){
            return toast.error('No hay stock suficiente');
        }
        ctxDispatch({type: "ADD_TO_CART", payload: {...item, cant}});
    }

    const removeItem = async (item) => {
        ctxDispatch({type: "REMOVE_ITEM", payload: item});
    }

    const checkout = async () => {
        Navigate('/singin?redirect=/shipping');
    }

  return (
    <div>
        <Helmet>
            <title>Tu Carrito</title>
        </Helmet>
        <h1>Tu Carrito</h1>
        <Row>
            <Col md={8}>
                {items.length === 0 ? <Info>
                    Tu carrito esta vacio
                    {" "}
                    <Link to="/">ir a la tienda</Link>
                </Info> : <ListGroup>
                    {items.map((item) => <ListGroup.Item key={item._id}>
                       <Row className='align-items-center'>
                            <Col md={4}>
                               <img src={item.image} alt={item.name}
                                    className='img-thumb rounded
                                '/>
                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                            </Col>
                            <Col md={3}>
                                <button className='btn-custom rounded btn-mp' onClick={()=>updateCart(item, item.cant  - 1 )} disabled={item.cant <= 1}>
                                    <i className='fas fa-minus-circle'></i>
                                </button> 
                                {" "}
                                <span>{item.cant}</span>
                                {" "}
                                <button className='btn-custom rounded btn-mp' onClick={()=>updateCart(item, item.cant + 1 )} disabled={item.cant >= item.stock}>
                                    <i className='fas fa-plus-circle'></i>
                                </button>
                          </Col>
                        <Col md={3}>
                            <span>$ {item.price}</span>
                        </Col>
                        <Col md={2}>
                            <button className='btn-custom rounded bg-danger' onClick={()=>removeItem(item)}>
                                <i className='fas fa-trash-alt'></i>
                            </button>
                        </Col>
                       </Row>
                    </ListGroup.Item>)}
                </ListGroup>}

            </Col>
            <Col md={4}>
                <Card>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Subtotal</Col>
                                    <Col><h3><b>$ {items.reduce((acc, item) => acc + item.price * item.cant, 0)}</b></h3></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Envio*</Col>
                                    <Col><h3><b>$ {items.reduce((acc, item) => acc + item.price * item.cant, 0) > 100 ? 0 : 10}</b></h3></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col><h3><b>$ {items.reduce((acc, item) => acc + item.price * item.cant, 0) + (items.reduce((acc, item) => acc + item.price * item.cant, 0) > 100 ? 0 : 10)}</b></h3></Col>
                                </Row>
                                <i>*con una compra mayor a 100 el envio es gratuito</i>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className='d-grid'>
                                    <button className="btn-custom btn-cart" onClick={()=> checkout()}>
                                            <i className="fas fa-credit-card"></i>
                                            <span> Pagar</span>
                                    </button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>

                </Card>
            </Col>
        </Row>
    </div>
  )
}
