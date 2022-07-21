import { useParams } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import axios from "axios";
import { Row, Col, Card, Badge } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Rating from '../components/Rating';
import { Helmet } from "react-helmet-async";
import Loading from '../components/Loading';
import Info from '../components/Info';
import { getErrorMsj } from '../utils/errorMsj';

const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return {...state, loading: true};
      case "FETCH_SUCCESS":
        return {...state, product: action.payload, loading: false};
      case "FETCH_FAIL":
        return {...state, error: action.payload, loading: false};
      default:
        return state;
    }
  };

function ProductoContainer(){
    const params = useParams();
    const {slug} = params;

    const [{loading, error, product}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        product: []
      });
      useEffect(() => {
        const fetchData = async () => {
          dispatch({type: "FETCH_REQUEST"});
          try{
            const result = await axios.get(`/api/product/slug/${slug}`);
            dispatch({type: "FETCH_SUCCESS", payload: result.data});
          } catch (error) {
            dispatch({type: "FETCH_FAIL", payload: getErrorMsj(error)});
          }
      
        }
        fetchData();
      }, [slug]);


    return(
         loading? <div 
            className="mt-4 d-flex justify-content-center align-items-center"
         > <Loading/> </div>
        : error? <Info variant="danger">{error}</Info> :
        <div className="productoContenedor">
            <Row>
                <Col md={6}>
                    <img className="img-large" src={product.image} alt={product.name}/>
                </Col>
                <Col md={3}>   
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Helmet>
                                <title>{product.name}</title>
                            </Helmet>
                            <h1>{product.name}</h1>
                            <p>Descripcion: </p>
                            <p>{product.description}</p>
                        </ListGroup.Item>
                        <ListGroup.Item><Rating rating={product.rating} reviews={product.numReviews}></Rating></ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Precio</Col>
                    <Col><h3><b>${product.price}</b></h3></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.stock > 0 ? (
                        <Badge bg="success">En Stock</Badge>
                      ) : (
                        <Badge bg="danger">No disponible</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.stock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <button className="btn-custom btn-cart">
                        añadir
                      </button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductoContainer;


/** <button className="btn-custom btn-cart">Añadir</button> */