import React, { useEffect, useReducer, useState } from 'react'
import Loading from '../components/Loading'
import Info from '../components/Info'
import { Card, Row, Col, ListGroup } from 'react-bootstrap';
import { Helmet  } from 'react-helmet-async';
import { useNavigate,Link, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { Store } from '../utils/Store'
import { getErrorMsj } from '../utils/errorMsj'
import axios from 'axios'

function reducer(state, action) {

        switch (action.type) {
            case 'FETCH_REQUEST':
                return { ...state, loading: true, error: ' ' };
            case 'FETCH_SUCCESS':
                return { ...state, loading: false, order: action.payload, error: ' ' };
            case 'FETCH_FAILURE':
                return { ...state, loading: false, error: action.payload };
            default:
                return state;
        }
    }

export default function OrdenPantalla() {

    const { state } = useContext(Store);
    const { userInfo } = state;
    const Navigate = useNavigate();
    const params = useParams();
    const { id: orderId } = params;
    const [{loading, error, order}, dispatch] = useReducer(reducer, {
        loading: true, order: {}, error: ''
    });

    useEffect(() => {
        const fetchOrder = async () => {
          try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
              headers: { autorizacion: `Bearer ${userInfo.token}` },
            });
            
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getErrorMsj(err) });
          }
        };
    
        if (!userInfo) {
          return Navigate('/login');
        }
        if (!order._id || (order._id && order._id !== orderId)) {
          fetchOrder();
        }
      }, [order, userInfo, orderId, Navigate]);



  return (
      <div>
        <Helmet>Felicidades</Helmet>
        <div className='m-1'>
              {loading ?
             (<Loading/>)
              :
              (<div>
              <h1>Pedido efectuado</h1>
              <h3 className='my-3'> Vista Previa </h3>
              <Row>
                  <Col md={8}>
                      <Card className="mb-3">
                          <Card.Body>
                              <Card.Title>Codigo de envio: {order._id}</Card.Title>
                              <Card.Text>
                                  <strong>A Nombre de: </strong>  {order.envio.name}<br/>
                                  <strong>Dirección: </strong> {order.envio.address}<br/>
                                  <strong>Telefono: </strong> {order.envio.phone}<br/><br/>
                                  <Info>{order.statusEnv}</Info>
                              </Card.Text>
                          </Card.Body>
                      </Card>
                      <Card className="mb-3">
                          <Card.Body>
                              <Card.Title>Detalles del pago</Card.Title>  
                              <Card.Text>
                                  <strong>Metodo de pago: </strong>{order.metodoPago}<br/><br/>
                                  <Info>{order.statusPag}</Info>
                              </Card.Text>
                          </Card.Body>
                      </Card>
                      <Card className="mb-3">
                          <Card.Body>
                              <Card.Title>Detalles del pedido</Card.Title>
                              <ListGroup variant="flush">
                                  <Row>
                                  {order.pedido.map((item, index) => {
                                return (
                                    <Col className="rounded mb-3"key={item._id}>
                                    <ListGroup.Item >
                                        <img src={item.image} className="img-thumb rounded" alt={item.nombre}></img>
                                        <Link to={`/product/${item.slug}`}>{item.name}</Link> x {item.cant} <br/>
                                        <strong>Subtotal: </strong> ${item.price * item.cant} <br/>
                                    </ListGroup.Item></Col>
                                )
                            })}
                                  </Row>
                              </ListGroup>
                          </Card.Body>
                      </Card>
                  </Col>
                  <Col md={4}>
                      <Card className="mb-3">
                          <Card.Body>
                              <Card.Title>Valor final</Card.Title>
                              <Card.Text>
                                  <strong>${order.total}</strong>
                              </Card.Text>
                                
                          </Card.Body>
                      </Card>
                  </Col>
              </Row>
              </div>)
              }
    </div>
    </div>

  )
}
