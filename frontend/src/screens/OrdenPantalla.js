import React, { useEffect, useReducer } from 'react'
import Loading from '../components/Loading'
import Info from '../components/Info'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { Store } from '../utils/Store'
import { getErrorMsj } from '../utils/errorMsj'
import axios from 'axios'

function reducer(state, action) {

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

export default function OrdenPantalla() {

    const { state } = useContext(Store);
    const { userInfo } = state;
    const Navigate = useNavigate();
    const params = useParams();
    const { id: orderId } = params;
    const [{loading, error, order}, dispatch] = useReducer(reducer, {
        loading: true, order: {}, error: ''
    });

    useEffect(() => {
        const fetchOrder = async () => {
          try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
              headers: { autorizacion: `Bearer ${userInfo.token}` },
            });
            console.log("pasa por aqui");
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getErrorMsj(err) });
          }
        };
    
        if (!userInfo) {
          return Navigate('/login');
        }
        if (!order._id || (order._id && order._id !== orderId)) {
          fetchOrder();
        }
      }, [order, userInfo, orderId, Navigate]);



  return (
    loading ? 
    (<Loading />) : error ? (<Info variant="danger"/>) : (<div></div>))
}
