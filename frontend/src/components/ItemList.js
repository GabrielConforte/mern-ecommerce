import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Rating from "./Rating";
import { Store } from "../utils/Store";
import axios from "axios";
import { useContext } from "react";
import { toast } from 'react-toastify'

function ItemList(props){

    const { product } = props;
    const {state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { items },
      } = state;

    const addCart = async (item) => {
        const exist = items.find((item) => item._id === product._id);
        const cant = exist ? exist.cant + 1 : 1;
        const {data} = await axios.get(`/api/product/${product._id}`);
        if(cant === data.stock){
            return toast.error('No hay stock suficiente');
        }
        ctxDispatch({type: "ADD_TO_CART", payload: {...item, cant}});
    }


    return (
      <Card>
        <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
        </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
          <Rating rating={product.rating} reviews={product.numReviews}></Rating>
        </Link>
        <Card.Text>${product.price}</Card.Text>
        {product.stock === 0 ? <button className="btn-custom btn-cart bg-secondary rounded" dissabled="true" > no hay stock </button> : 
        <button className="btn-custom btn-cart" onClick={()=> addCart(product)}> Añadir al carrito</button>}
      </Card.Body>
    </Card>
    )
}

export default ItemList;

