import React from 'react'
import { Nav, Badge, NavDropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { Store } from '../utils/Store';
import { LinkContainer } from 'react-router-bootstrap';

export default function TabBar() {
    const {state, dispatch: ctxDispatch} = useContext(Store);
    let {cart, userInfo} = state;

    const signout = () => {
        ctxDispatch({type: 'USER_LOGOUT'});
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shipping');
        localStorage.removeItem('metodoPago');
    }

  return (
            <Nav>
                <Link to="/carrito" className="nav-link">
                <i className="fa-solid fa-cart-shopping"></i>
                    <Badge>
                        {cart.items.reduce((a,b) => a + b.cant, 0)}
                    </Badge>
                    </Link>
                {userInfo ? (
                <>
                <NavDropdown title={userInfo.name} id="user-nav-dropdown" menuVariant="dark">
                    <LinkContainer className='p-2' to="/perfil">
                        <NavDropdown.Item>
                            <i className="fa-solid fa-user"> </i>
                        <b> Perfil</b>
                        </NavDropdown.Item>
                    </LinkContainer>

                     <LinkContainer className='p-2' to="/history">
                        <NavDropdown.Item>
                        <i className="fa-solid fa-box"></i>
                           <b> Pedidos</b> 
                        </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer className='p-2' to="/singin" onClick={signout}>
                        <NavDropdown.Item>
                        <i className="fa-solid fa-right-from-bracket"></i>
                           <b> Cerrar Sesion</b> 
                        </NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>
                </>)
                :<>
                <LinkContainer to="/singin" className="nav-link">
                    <Nav.Link>
                  <i className="fa-solid fa-user"></i><b>Ingresar</b>
                          </Nav.Link>
                    </LinkContainer></>
                        }
            {userInfo && userInfo.isAdmin && (<>
            <NavDropdown title="Admin" id="admin-nav-dropdown" menuVariant="dark">
            <LinkContainer to="/admin/escritorio" className='p-2'>
                <NavDropdown.Item>
                    <i className="fa-solid fa-desktop" ></i>
                    <b> Escritorio</b> 
                </NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/admin/productos" className='p-2'>
                <NavDropdown.Item>
                <i className="fa-solid fa-boxes-stacked"></i>
                    <b> Productos</b> 
                </NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/admin/ordenes" className='p-2'>
                <NavDropdown.Item>
                    <i className="fa-solid fa-list" ></i>
                    <b> Ordenes</b> 
                </NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/admin/usuarios" className='p-2'>
                <NavDropdown.Item>
                    <i className="fa-solid fa-id-card"></i>
                    <b> Usuarios</b> 
                </NavDropdown.Item>
            </LinkContainer>
            </NavDropdown></>)}
            </Nav>)
}
