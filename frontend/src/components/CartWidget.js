import React from 'react'
import { Nav, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function CartWidget(props) {
    let { cart } = props;
  return (
            <Nav>
                <Link to="/cart" className="nav-link">
                <i className="fa-solid fa-cart-shopping"></i>
                    <Badge>
                        {cart.items.reduce((a,b) => a + b.cant, 0)}
                    </Badge>
                    </Link>
            </Nav>)
}
