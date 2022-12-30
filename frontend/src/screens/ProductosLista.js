import React, {useReducer, useEffect} from 'react';
import axios from 'axios';
import {Link, useLocation} from 'react-router-dom';
import { Store } from '../utils/Store';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_DATA':
            return {
                ...state,
                loading: true };
        case 'FETCH_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                productos: action.payload.productos,
                page: action.payload.page,
                totalPages: action.payload.totalPages
             };
        case 'FETCH_DATA_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }
    }
export default function ProductosLista() {
  
const [{productos, totalPages, loading, error}, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
});

const {search, pathname} = useLocation();
const sp = new URLSearchParams(search);
const page = sp.get('page');
const { state } = useContext(Store);
const { userInfo } = state;

useEffect(() => {
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`/api/productos?page=${page}`, {
            headers: {Autorizacion: `Bearer ${userInfo.token}`}
            });
            dispatch({type: 'FETCH_DATA_SUCCESS', payload: data});
            
        }
            catch (error) {}
    }

    fetchData();
    } , [page, userInfo.token]);
    
    return (
        <>
            <h1>Productos</h1>
            {loading ? <p>Cargando...</p> : error ? <p>{error}</p> :
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.cantidad}</td>
                                <td>
                                    <button>Editar</button>
                                    <button>Eliminar</button>
                                </td>
                            </tr>
                            

                        ))}
                    </tbody>
                </table>
                 <div>
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === Number(page) ? 'btn text-bold' : 'btn'}
                key={x + 1}
                to={`/admin/products?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
                </>
            }
        </>
    );
}    