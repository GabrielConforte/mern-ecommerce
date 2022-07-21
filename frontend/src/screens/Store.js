import { createContext, useReducer } from "react"
export const Store = createContext();

const initialState = {
    cart: {
        items: [],
    }
}

function reducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART":// voy a dejar notas porque es medio complicado: 
        const newItem = action.payload;//esto es lo que se va a agregar al carrito
        const existItem = state.cart.items.find( //revisa si esta en el carrito
          (item) => item._id === newItem._id
        );
        const cartItems = existItem ? state.cart.items.map((item) =>
              item._id === existItem._id ?
                newItem //si no existia, se agrega "newItem" que tiene la cantidad de 1
               :
                item //si existia, se agrega el item existente que le suma 1 a la cantidad
            )
          : [...state.cart.items, newItem]; //si no existia, se agrega el item nuevo al carrito
        return { ...state,
            cart: {
                items: cartItems,//retorna el carrito con los items agregados
            } } ;
        default:
            return state;
    }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}