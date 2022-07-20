import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Home() {

const [products, setProducts] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    const resultado = await axios.get('/api/product');
    setProducts(resultado.data);
  }
  fetchData();
}, []);
  return (
    <div>
      <h1>Destacados</h1>
        <div className="productoContenedor">
        {
          products.map(product => (
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