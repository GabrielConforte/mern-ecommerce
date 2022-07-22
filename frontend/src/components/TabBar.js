import React from 'react'
import { Nav, Badge, NavDropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { Store } from '../utils/Store';

export default function TabBar(props) {
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
                {userInfo ? 
                <>
                <NavDropdown title={userInfo.name} menuVariant="dark">
                        <Link className='p-2' to="/perfil">
                       Perfil
                    </Link>
                    <NavDropdown.Divider/>
                    <Link className='p-2' to="/pedidos">
                        Pedidos
                    </Link >
                    <NavDropdown.Divider/>
                     <Link className='p-2' to="#logout" onClick={signout}>
                       Cerrar Sesion
                    </Link >
                </NavDropdown>
                </>
                :
                <Link to="/singin" className="nav-link">
                  <b>Ingresar</b>  <i className="fa-solid fa-user">  </i>
                    </Link >
                        }
            </Nav>)
}
