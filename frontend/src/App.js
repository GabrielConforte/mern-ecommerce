//data
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

//router y servicios
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useState} from 'react';
//import { Store } from './utils/Store';

//componentes
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import TabBar from './components/TabBar';

//paginas
import Home from './screens/Home';
import ProductoContainer from './screens/ProductoContainer';
import Carrito from './screens/Carrito';
import SingIn from './screens/SingIn';
import SingUp from './screens/SingUp';
import Shipping from './screens/Shipping';
import MetodoPago from './screens/MetodoPago';
import ConfirmaPedido from './screens/ConfirmaPedido';
import OrdenPantalla from './screens/OrdenPantalla';
import HistorialPedidos from './screens/HistorialPedidos';
import Perfil from './screens/Perfil';
import { Nav } from 'react-bootstrap';


function App() {
 const [activeTab, setActiveTab] = useState(false);
  return (
    <BrowserRouter>
    <div className={activeTab  ? 'd-flex flex-column site-container active-cont' : 'd-flex flex-column site-containe'}>
      <ToastContainer position='top-center' limit={1}/>
      <header className="App-header rounde">
        <Navbar className='rounded' bg="" variant="dark">
            <Container>
              <botton className="btn-custom btn-cart" onClick={()=> setActiveTab(!activeTab)}>
              <i class="fa-solid fa-message"></i>
              </botton>
              <LinkContainer to="/">
                <Navbar.Brand>Hobbie House <i className="fa-solid fa-chess-knight"></i></Navbar.Brand>
              </LinkContainer>
              <TabBar/>
            </Container>
          </Navbar>
        
      </header>
      <div className={activeTab ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column' :
          'side-navbar d-flex justify-content-between flex-wrap flex-column'}>

          <Nav className='flex-column text-white w-100 p-2'>
            <Nav.Item>
              <strong>CHAT</strong>
            </Nav.Item>
          </Nav>
          </div>
      <main className='mt-2'>
        <Container>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:slug" element={<ProductoContainer/>} />
          <Route path="/carrito" element={<Carrito/>} />
          <Route path="/singin" element={<SingIn/>} />
          <Route path="/shipping" element={<Shipping/>} />
          <Route path="/singup" element={<SingUp/>} />
          <Route path="/payment" element={<MetodoPago/>} />
          <Route path="/confirmation" element={<ConfirmaPedido/>} />
          <Route path="/orders/:id" element={<OrdenPantalla/>} />
          <Route path="/history" element={<HistorialPedidos/>} />
          <Route path="/perfil" element={<Perfil/>} />
        </Routes>
        </Container>
        </main>
      <footer><div className='text-center'>Programacion BackEnd - coderhouse 2022 </div></footer>
    </div>
    </BrowserRouter>
  );
}

export default App;