import {useEffect, useReducer } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      <h1>Destacados</h1>
        <div className="productoContenedor">
          { loading? <div> Cargando info.... </div>
          : error? <div> {error} </div>
          : products.map(product => (
            <div className="productoItem" key={product.slug}>
              <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
              </Link>
              <div className="productInfo">
              <Link to={`/product/${product.slug}`}>
               <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
              </Link>
                <button>Añadir a Carrito</button>
              </div>
            </div>
          ))
        }</div>
    </div>
  );
}

export default Home;