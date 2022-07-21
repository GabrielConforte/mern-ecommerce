//data
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

//router y servicios
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import { useContext } from 'react';
import { Store } from './screens/Store';

//componentes
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import CartWidget from './components/CartWidget';

//paginas
import Home from './screens/Home';
import ProductoContainer from './screens/ProductoContainer';


function App() {

  const {state} = useContext(Store);
  const {cart} = state;
  return (
    <BrowserRouter>
    <div className='d-flex flex-column site-content'>
      <header className="App-header rounde">
        <Navbar className='rounded' bg="" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Home</Navbar.Brand>
              </LinkContainer>
              <CartWidget cart={cart}/>
            </Container>
          </Navbar>
        
      </header>
      <main className='mt-2'>
        <Container>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:slug" element={<ProductoContainer/>} />
        </Routes>
        </Container>
        </main>
      <footer><div className='text-center'>Programacion BackEnd - coderhouse 2022 </div></footer>
    </div>
    </BrowserRouter>
  );
}

export default App;