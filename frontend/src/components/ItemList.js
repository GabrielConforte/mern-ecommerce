import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Rating from "./Rating";
function ItemList(props){
    const { product } = props;
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
        <button className="btn-custom btn-cart"> Añadir al carrito</button>
      </Card.Body>
    </Card>
    )
}

export default ItemList;

