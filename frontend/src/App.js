//data

import './index.css';

//router y servicios
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';

//paginas
import Home from './screens/Home';
import ProductoContainer from './screens/ProductoContainer';


function App() {
  return (
    <BrowserRouter>
    <div>
      <header className="App-header">
        <Link to="/">Home</Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:slug" element={<ProductoContainer/>} />
        </Routes>
        
        </main>

    </div>
    </BrowserRouter>
  );
}

export default App;