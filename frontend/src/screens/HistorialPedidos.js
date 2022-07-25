import React , { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';
import Info from '../components/Info';
import { useNavigate , Link, useParams} from 'react-router-dom';
import axios from 'axios';
import { getErrorMsj } from '../utils/errorMsj';
import { Store } from '../utils/Store';


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: ' ' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: ' ' };
        case 'FETCH_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}


export default function HistorialPedidos() {

    const { state } = useContext(Store);
    const { userInfo } = state;
    const Navigate = useNavigate();

    const [{loading, error, order}, dispatch] = useReducer(reducer, {
        loading: true, order: [], error: ''
    });

   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data }= await axios.get(`http://localhost:5000/api/orders/user/${userInfo._id}`,
                { headers: { autorizacion: `Bearer ${userInfo.token}` } });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAILURE', payload: getErrorMsj(error) });
            }
        }
        fetchData();
        console.log(order);
    }, [userInfo]);
  return (
    <div>
        <Helmet>
            <title>Historial Pedidos</title>
        </Helmet>

        <h1>Historial Pedidos</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map(o => (
                        <tr key={o._id}>
                            <td>{o._id}</td>
                            <td>{o.createdAt}</td>
                            <td>{o.total}</td>
                            <td>{o.statusPag} - {o.statusEnv}</td>
                            <td><Link to={`/orders/${o._id}`}>Detalles</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}
