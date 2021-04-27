import React, { useEffect, useState } from 'react'
import {MdRemoveShoppingCart} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import {actualizaCantidad, quitarProducto, sumarProducto, restarProducto} from '../Redux/actions'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const CarritoCard = ({orderId, userId, id, nombre, descripcionCorta, precio, cantidad, multimedia}) => {
    
    const {autenticado} = useSelector(state => state);

    const [cant, setCant] = useState(cantidad);
    const dispatch = useDispatch();
    console.log({cantidad, cant})

    const MySwal = withReactContent(Swal)

    useEffect( () => {
        dispatch(actualizaCantidad(userId.id, id, orderId, cant, autenticado))        
    }, [cant])

    
    const removeProduct = () => {
        MySwal.fire({
            html: <p>{`Esto eliminara el producto ${nombre} del carrito. ¿Desea continuar?`}</p>,
            icon: 'question',
            confirmButtonText: 'Quitar producto',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        })
        .then(result => {
            if (result.isConfirmed) {
                dispatch(quitarProducto(id, orderId, autenticado, precio,userId))
            }
        })
    }

    const sumaUno = () => {
        setCant(cant + 1);
        dispatch(sumarProducto(orderId,precio))
    }

    const restaUno = () => {
        if (cant > 1 ) setCant(cant - 1);
        if (cant === 1 ) {
            removeProduct()
        }
        if(cant>1){
            dispatch(restarProducto(orderId,precio))
        }
    }


    return (
        
        <div >
            <div className="card-group">
                <img className="img-cart" src={`${multimedia && multimedia[0].url}`} alt="Card image cap"></img>
                <div className='card-body-descripcion'>
                    <h5>{nombre}</h5>
                    <p>{`${descripcionCorta}...`}</p>
                </div>
                <div className='card-body-cantidad'>
                    <button type="button" class="btn-add-quit" onClick={restaUno}>-</button>
                    <p> {cant} </p>
                    <button type="button" class="btn-add-quit" onClick={sumaUno}>+</button>
                </div>
                <div className="card-body-precio">
                    $ {precio}
                </div>
                <div className="card-body-borrar">
                    <MdRemoveShoppingCart onClick={removeProduct}/>
                </div>
            </div>
        </div>

                    
    
                
                

    )
}

export default CarritoCard;