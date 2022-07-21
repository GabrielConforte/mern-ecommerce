import {useEffect, useReducer } from "react";
import axios from "axios";
import  ItemList  from "../components/ItemList";
import { Row, Col} from "react-bootstrap";
import {Helmet} from "react-helmet-async";
import Loading from "../components/Loading";
import Info from "../components/Info";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {...state, loading: true};
    case "FETCH_SUCCESS":
      return {...state, products: action.payload, loading: false};
    case "FETCH_FAIL":
      return {...state, error: action.payload, loading: false};
    default:
      return state;
  }
};

function Home() {

const [{loading, error, products}, dispatch] = useReducer(reducer, {
  loading: true,
  error: '',
  products: []
});
useEffect(() => {
  const fetchData = async () => {
    dispatch({type: "FETCH_REQUEST"});
    try{
      const result = await axios.get("/api/product");
      dispatch({type: "FETCH_SUCCESS", payload: result.data});
    } catch (error) {
      dispatch({type: "FETCH_FAIL", payload: error.message});
    }

  }
  fetchData();
}, []);
  return (
    <div>
      <Helmet>
        <title>Inicio</title>
      </Helmet>
      <h1>Destacados</h1>
        <div className="productoContenedor">
          { loading? <Loading/>
          : error? <Info variant="danger">{error}</Info>
          : 
          <Row>
          {products.map(product => (
            <Col key={product.slug} sm={6} md={4}>
            <ItemList product={product}/>
            </Col>
          ))
        
          }
          </Row>
        }</div>
    </div>
  );
}

export default Home;