import { useParams } from 'react-router-dom';

function ProductoContainer(){
    const params = useParams();
    const {slug} = params;

    return(
        <div>
            <h1>Producto {slug}</h1>
        </div>
    )
}

export default ProductoContainer;