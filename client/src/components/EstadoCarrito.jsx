import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearShoppingCart, getShoppingCart, getOrdersById, getPerfil } from '../Redux/actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link } from 'react-router-dom'


const EstadoCarrito = ({ carrito }) => {

    const MySwal = withReactContent(Swal)
    const autenticado = useSelector(estado => estado.autenticado);
    const perfil = useSelector(estado => estado.perfil);
  
   
    var cantTotal = carrito.reduce((cant, juego) => {
        if (autenticado && juego.orders) {
            return cant + juego.orders[0].productorders.cantidad
        }
        return cant + juego.cantidad;
    }, 0)
    var impTotal = carrito.reduce((imp, juego) => {
        if (autenticado && juego.orders) {
            return imp + (juego.orders[0].productorders.cantidad * juego.precio)
        }
        return imp + (juego.cantidad * juego.precio);
    }, 0)
    const dispatch = useDispatch();


    const handleOnClick = (carrito) => {
        MySwal.fire({
            html: <p>{`Esto quitará todos los productos del carrito. ¿Desea continuar?`}</p>,
            icon: 'question',
            confirmButtonText: 'Vaciar carrito',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        })
            .then(result => {
                if (result.isConfirmed) {
                    dispatch(clearShoppingCart(carrito, autenticado));
                }
            })
    }


    const onClick = () => {
        dispatch(getPerfil())
        console.log('perfil.id',perfil.id)
        dispatch(getOrdersById(perfil.id))
        
    }

    return ( /* nos va a devolver nuestro componente --*/

        <div className="contenedor-ticket">
            <div className="card-contenedora" >
                <h5>TICKET</h5>
                <hr />
                <p className="p-detalle">Actualmente, hay {cantTotal} productos en tu carrito</p>
                <div className="espacio-cart">

                </div>
                <hr />
                <p className="p-detalle">Total a pagar: ${impTotal}</p>
                <div className="comprar">


                    <hr />
                   <Link to={{
                        pathname: '/checkout',
                        state:  impTotal
                    }}> 
                   
                        <button onClick={onClick} type="button" className="btn-black-buy" > FINALIZAR COMPRA </button>
                    </Link>

                    <button type="button" className="btn-black" onClick={() => handleOnClick(carrito)} >VACIAR CARRITO</button>


                </div>

            </div>



        </div>


    )
}

export default EstadoCarrito;