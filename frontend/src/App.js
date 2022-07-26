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
import AdminRuteo from './components/AdminRuteo';
import ProtectorRuteo from './components/ProtectorRuteo';
import { Nav } from 'react-bootstrap';
import SearchBox from './components/SearchBox';


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
import Busqueda from './screens/Busqueda';
import Escritorio from './screens/Escritorio';
import ChatBox from './components/ChatBox';


function App() {
 const [activeTab, setActiveTab] = useState(false);
  return (
    <BrowserRouter>
    <div className={activeTab  ? 'd-flex flex-column site-container active-cont' : 'd-flex flex-column site-containe'}>
      <ToastContainer position='top-center' limit={1}/>
      <header className="App-header rounde">
        <Navbar className='rounded' bg="" variant="dark">
            <Container>
              <button className="btn-custom btn-chat" onClick={()=> setActiveTab(!activeTab)}>
              <i className="fa-solid fa-message"></i>
              </button>
              <LinkContainer className="ms-3"to="/">
                <Navbar.Brand>Hobbie House <i className="fa-solid fa-chess-knight"></i></Navbar.Brand>
              </LinkContainer>
              <SearchBox></SearchBox>
              <TabBar/>
            </Container>
          </Navbar>
        
      </header>
      <div className={activeTab ? ' rounded active-nav side-navbar d-flex justify-content-between flex-wrap flex-column' :
          'side-navbar d-flex justify-content-between flex-wrap flex-column'}>

          <Nav className='flex-column text-white w-100 p-2'>
            <Nav.Item>
              <strong>CHAT</strong>
            </Nav.Item>
            <Nav.Item>
            <ChatBox></ChatBox>
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
          <Route path="/orders/:id" element={<ProtectorRuteo><OrdenPantalla/></ProtectorRuteo>} />
          <Route path="/history" element={<ProtectorRuteo><HistorialPedidos/></ProtectorRuteo>} />
          <Route path="/perfil" element={<ProtectorRuteo><Perfil/></ProtectorRuteo>}/>
          <Route path="/admin/escritorio" element={<AdminRuteo><Escritorio/></AdminRuteo>}/>
          <Route path="/search" element={<Busqueda/>} />
        </Routes>
        </Container>
        </main>
      <footer><div className='text-center'>Programacion BackEnd - coderhouse 2022 </div></footer>
    </div>
    </BrowserRouter>
  );
}

export default App;