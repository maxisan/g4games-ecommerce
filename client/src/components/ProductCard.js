import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { addToShoppingCart, quitarProducto } from '../Redux/actions';
import "bootstrap/dist/css/bootstrap.min.css";
import {AiFillCheckCircle} from 'react-icons/ai'
import {MdRemoveShoppingCart} from 'react-icons/md'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'




function ProductCard({ nombre, descripcionCorta, precio, multimedia, id, stock, agregado, orderId }) {

    const dispatch = useDispatch();
    const {autenticado, perfil} = useSelector(state => state)
    const [enCarrito, setEnCarrito] = useState(agregado)
    const history = useHistory()
    const MySwal = withReactContent(Swal)


    var input = {
        id,
        nombre,
        descripcionCorta,
        precio,
        multimedia,
        stock,
    };


    const handleOnclik = (game) => {
        dispatch(addToShoppingCart(game, perfil, autenticado))
        setEnCarrito(true)
        MySwal.fire({
            toast: true,
            title: 'Producto añadido al carrito',
            icon: 'success',
            timer: 2000,
            position: 'top-end',
            showConfirmButton: false,

        })
        //alert('el producto fue agregado al carrito');

        return
    }

    const irAlCarrito = () => {
        history.push('/carrito')
    }

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
                dispatch(quitarProducto(id, orderId, autenticado))
                setEnCarrito(false)
            }
        })
    }

    return ( /* nos va a devolver nuestro componente --*/

        <div className="container-card">

            <div className="card" >

                <img className="imagen-card" src={multimedia && multimedia[0].url}></img>


                <div className="contenedor-datos-cards">


                    <Link to={`/producto/${id}`}> {/* el id me lo traje por props, mediante el template */}
                        <h4>{nombre}</h4>
                    </Link>
    
                    <p>{`${input.descripcionCorta}...`}</p>
                    {/* <p>$ {input.precio}</p> */}

                    { enCarrito ? 
                        <div className='producto-agregado'>
                            <button className='boton-quitar' type="button" onClick={removeProduct}> <MdRemoveShoppingCart/> Quitar </button>
                            <button className='boton-ir-carrito' type="button" onClick={irAlCarrito}>Ir al carrito</button>
                            <span> {<AiFillCheckCircle />} Producto añadido </span>
                        </div> : 
                        input.stock > 0 ? <div>
                        <button className='comprar-producto' type="button" onClick={() => handleOnclik(input)}>Añadir al carrito</button> </div>

                        : <button className='comprar-producto' type="button" >Producto no disponible</button> }

                </div>
            </div>





        </div>


    )
}


export default ProductCard