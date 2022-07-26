import React ,{useEffect} from "react";
import { Link , useNavigate, useLocation } from "react-router-dom";
import { getErrorMsj } from "../utils/errorMsj";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Col, Row,  } from "react-bootstrap";
import Rating from "../components/Rating";
import {toast} from "react-toastify";
import Loading from "../components/Loading";
import Info from "../components/Info";
import {LinkContainer} from "react-router-bootstrap";
const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          products: action.payload.products,
          page: action.payload.page,
          pagina: action.payload.pagina,
          contProducts: action.payload.contProducts,
          loading: false,
        };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
 
const precios = [
    {
        nombre: "de 1 a 50",
        valor: "1-50"
    },
    {
        nombre: "de 51 a 100",
        valor: "51-100"
    }
    ,{
        nombre: "de 101 a 150",
        valor: "101-150"
    },
    {
        nombre: "de 151 a 200",
        valor: "151-200"
    }
]

const rate = [
    {
        nombre: "4 estrellas o más",
        valor: "4"
    },
    {
        nombre: "3 estrellas o más",
        valor: "3"
    },
    {
        nombre: "2 estrellas o más",
        valor: "2"
    }
    ,{
        nombre: "1 estrella o más",
        valor: "1"
    }
]


export default function Busqueda() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const categoria = sp.get("categoria" || "all");
    const precio = sp.get("precio" || "all");
    const query = sp.get('query') || 'all'
    const rating = sp.get("rating" || "all");
    const orden = sp.get("orden" || "newest");
    const pagina = sp.get("pagina" || "1");

    const [{loading, error, products, paginas, contProducts}, dispatch] = React.useReducer(reducer, {
        loading: true,
        error: '',
    });
        
    useEffect(() => {
        const fetchData = async () => {
            try{
                const {data} = await axios.get(`/api/products?query=${query}&categoria=${categoria}&precio=${precio}&rating=${rating}&orden=${orden}&pagina=${pagina}`);
                dispatch({type: "FETCH_PRODUCTS", payload: data});
            }catch(error){
                dispatch({type: 'FETCH_FAIL', payload: getErrorMsj(error)});
            }
        }
        fetchData();
    }, [query, categoria, precio, rating, orden, pagina]);

    const [categorias, setCategorias] = React.useState([]);
    useEffect(() => {
        const fetchCategorias = async () => {
          try {
            const { data } = await axios.get(`/api/products/categories`);
            setCategorias(data);
          } catch (err) {
            toast.error(getErrorMsj(err));
          }
        };
        fetchCategorias();
      }, [dispatch]);

    const getFilter = (filtro) => {
        const filterPagina  = filtro.pagina || pagina;
        const filterCategoria = filtro.categoria || categoria;
        const filterPrecio = filtro.precio || precio;
        const filterRating = filtro.rating || rating;
        const filterOrden = filtro.orden || orden;
        const filterQuery = filtro.query || query;
        return `?query=${filterQuery}&categoria=${filterCategoria}&precio=${filterPrecio}&rating=${filterRating}&orden=${filterOrden}&pagina=${filterPagina}`;
    }
        return (
            <div>
            <Helmet>
              <title>Search Products</title>
            </Helmet>
            <Row>
              <Col md={3}>
                <h3>Department</h3>
                <div>
                  <ul>
                    <li>
                      <Link
                        className={'all' === categoria ? 'text-bold' : ''}
                        to={getFilter({ categoria: 'all' })}
                      >
                        Any
                      </Link>
                    </li>
                    {categorias.map((c) => (
                      <li key={c}>
                        <Link
                          className={c === categoria ? 'text-bold' : ''}
                          to={getFilter({ categoria: c })}
                        >
                          {c}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>precio</h3>
                  <ul>
                    <li>
                      <Link
                        className={'all' === precio ? 'text-bold' : ''}
                        to={getFilter({ precio: 'all' })}
                      >
                        Any
                      </Link>
                    </li>
                    {precios.map((p) => (
                      <li key={p.value}>
                        <Link
                          to={getFilter({ precio: p.value })}
                          className={p.value === precio ? 'text-bold' : ''}
                        >
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Avg. Customer Review</h3>
                  <ul>
                    {rate.map((r) => (
                      <li key={r.name}>
                        <Link
                          to={getFilter({ rating: r.rating })}
                          className={`${r.rating}` === `${rating}` ? 'text-bold' : ''}
                        >
                          <Rating caption={' & up'} rating={r.rating}></Rating>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        to={getFilter({ rating: 'all' })}
                        className={rating === 'all' ? 'text-bold' : ''}
                      >
                        <Rating caption={' & up'} rating={0}></Rating>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={9}>
                {loading ? (
                  <Loading></Loading>
                ) : error ? (
                  <Info variant="danger">{error}</Info>
                ) : (
                  <>
                    <Row className="justify-content-between mb-3">
                      <Col md={6}>
                        <div>
                          {contProducts === 0 ? 'No' : contProducts} Results
                          {query !== 'all' && ' : ' + query}
                          {categoria !== 'all' && ' : ' + categoria}
                          {precio !== 'all' && ' : precio ' + precio}
                          {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                          {query !== 'all' ||
                          categoria !== 'all' ||
                          rating !== 'all' ||
                          precio !== 'all' ? (
                            <button
                              onClick={() => navigate('/search')}
                            >
                              <i className="fas fa-times-circle"></i>
                            </button>
                          ) : null}
                        </div>
                      </Col>
                      <Col className="text-end">
                        Sort by{' '}
                        <select
                          value={orden}
                          onChange={(e) => {
                            navigate(getFilter({ orden: e.target.value }));
                          }}
                        >
                          <option value="newest">Newest Arrivals</option>
                          <option value="lowest">precio: Low to High</option>
                          <option value="highest">precio: High to Low</option>
                          <option value="toprated">Avg. Customer Reviews</option>
                        </select>
                      </Col>
                    </Row>
                    {products.length === 0 && (
                      <Info>No Product Found</Info>
                    )}
      
                    <Row>
                      {products.map((product) => (
                        <Col sm={6} lg={4} className="mb-3" key={product._id}>
                          
                        </Col>
                      ))}
                    </Row>
      
                    <div>
                      {[...Array(pagina).keys()].map((x) => (
                        <LinkContainer
                          key={x + 1}
                          className="mx-1"
                          to={getFilter({ page: x + 1 })}
                        >
                          <button
                            className={Number(pagina) === x + 1 ? 'text-bold' : ''}
                            variant="light"
                          >
                            {x + 1}
                          </button>
                        </LinkContainer>
                      ))}
                    </div>
                  </>
                )}
              </Col>
            </Row>
          </div>
        );
      }
