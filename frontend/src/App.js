//data
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

//router y servicios
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
//import { useContext } from 'react';
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


function App() {

  //const {state} = useContext(Store);
  return (
    <BrowserRouter>
    <div className='d-flex flex-column site-content'>
      <ToastContainer position='top-center' limit={1}/>
      <header className="App-header rounde">
        <Navbar className='rounded' bg="" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Home</Navbar.Brand>
              </LinkContainer>
              <TabBar/>
            </Container>
          </Navbar>
        
      </header>
      <main className='mt-2'>
        <Container>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:slug" element={<ProductoContainer/>} />
          <Route path="/carrito" element={<Carrito/>} />
          <Route path="/singin" element={<SingIn/>} />
        </Routes>
        </Container>
        </main>
      <footer><div className='text-center'>Programacion BackEnd - coderhouse 2022 </div></footer>
    </div>
    </BrowserRouter>
  );
}

export default App;