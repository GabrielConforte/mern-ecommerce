import data from "./data";
import './index.css';
function App() {
  return (
    <div>
      <header className="App-header">
        <a href="/">Home</a>
      </header>
      <main>
        <h1>Destacados</h1>
        <div className="productoContenedor">
        {
          data.products.map(product => (
            <div className="productoItem" key={product.slug}>
              <a href={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
              </a>
              <div className="productInfo">
              <a href={`/product/${product.slug}`}>
               <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.price}</p></a>
                <button>Añadir a Carrito</button>
              </div>
            </div>
          ))

        }</div>
        </main>

    </div>
  );
}

export default App;
