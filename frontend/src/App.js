//data
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

//router y servicios
import {BrowserRouter, Route, Routes} from 'react-router-dom';

//componentes bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';

//paginas
import Home from './screens/Home';
import ProductoContainer from './screens/ProductoContainer';


function App() {
  return (
    <BrowserRouter>
    <div className='d-flex flex-column site-content'>
      <header className="App-header rounde">
        <Navbar className='rounded' bg="" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Home</Navbar.Brand>
              </LinkContainer>
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