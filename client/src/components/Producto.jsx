import React from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {getProduct, addToShoppingCart, editTotalOrder} from '../Redux/actions'
import {useEffect} from 'react';
import Reviews from './Reviews'
// const titulo = "Call Of Duty"

// const descripcion = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
// const precio = "$960"
// const precio1 = "USD$4.OO"
// const id = 1

const Producto = () => {
    const {id} = useParams() //mediante params capturo, lo que pasan por parametro en la ruta

    const producto = useSelector(state => state.producto);//me triago lo que vale el estado de redux
    const reviews = useSelector(state => state.reviews)

    const categories = useSelector(state => state.categories)
    const orden = useSelector(state => state.orders)
    const dispatch = useDispatch()// dispacho acciones
        useEffect(() => { //funciona cuando se redenriza 
        dispatch(getProduct(id));//cuando se renderiza hago un dispatch de mi funcion creadora pasandole id por parametro. 
    },[producto.id] )
    const {autenticado, perfil} = useSelector(state => state)


    var gameId = {
    gameId : id,
    }
    var contador=0;
    var acumulador=0;
    var promedio=0;

    reviews.forEach(element => {
        contador++;
        console.log("elemento", element.opinion)
        acumulador = acumulador + element.puntaje; 
        console.log("acumulador", acumulador);
        promedio = acumulador/contador;
        console.log("promedio", promedio)
        return promedio;
    });
    

   

    const handleOnclik = (gameId) => {
    console.log('este es el handle con id', gameId);
    alert('el producto fue agregado al carrito');
    console.log('afuera',orden)
    dispatch(addToShoppingCart(producto, perfil, autenticado))
    }
return (

<div className="spacer-producto">

    <div className="contenedor-imagen-producto">
    <img src={producto.multimedia && producto.multimedia[1].url} className='img-producto' />

        <div className="texto-producto">
        <h1>{producto.nombre}</h1>
        <p>{producto.descripcion}</p>
        {producto.stock > 0 ? <div>
        <button className='comprar-producto'type="button" className="btn-negro-compra" onClick={()=>handleOnclik(gameId)}><i class="fas fa-shopping-cart"></i>    Añadir al carrito</button> </div>
        :
        <button className='comprar-producto' type="button" className="btn-negro-compra" >Producto no disponible</button>
    }
        </div>
    </div>

    <div className="especificaciones-producto">
        <div className="hijo1-producto">
        <ul>
        <li><i class="fas fa-genderless"></i> Categoria</li>
        <p className="p-producto">{categories.nombre}</p>
        <li><i class="far fa-calendar-alt"></i> Fecha de lanzamiento</li>
        <p className="p-producto">{producto.fechaLanzamiento}</p>
        </ul>
        </div>
    <div className="hijo2-producto">
        <ul>
        <li><i class="fab fa-magento"></i> Clasificación</li>
        <p className="p-producto">{producto.clasificacion}</p>
        <li><i class="fas fa-cogs"></i> Desarrollador</li>
        <p className="p-producto">{producto.desarrollador}</p>
        <li><i class="fas fa-star"></i> Promedio Reviews</li>
        <p className="p-producto">{promedio.toFixed(2)}</p>

        </ul>
       

        {/* renderizamos otro componente que se componente resiva todas los comentarios ... Presentacional  */}

        <Reviews
         id={id}
        />

        
    </div>






    </div>

    </div>
)

}

export default Producto

