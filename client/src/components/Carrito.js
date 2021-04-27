import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { getShoppingCart, addToShoppingCart } from '../Redux/actions';
import CarritoCard from './CarritoCard'
import EstadoCarrito from './EstadoCarrito';


const Carrito = () => {

    const carrito = useSelector(state => state.carrito);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.perfil);
    const autenticado = useSelector(state => state.autenticado)

    useEffect(() => {
        dispatch(getShoppingCart(userId.id, autenticado))
        console.log("este es el carrito", carrito);
    }, [carrito.length]) //¿Cómo uso useEffect para renderizar el carrito cada vez que haya un cambio?


    return (

        /**  */
        <div className="spacer-four">
            {/* Acá tendría que renderizar un detalle del producto agregado al carrito */}
            {/* también tendría que haber una columna que brinde info sobre la orden*/}

            <div className="ordener">
                <h3 className="titulo-cart">MI CARRITO</h3>
                <div className="absoluto">


                    <div className="relativos4"></div>
                    <div className="limitador"></div>
                    <div className="relativos1">PRODUCTO</div>
                    <div className="relativos2">PRECIO</div>
                    <div className="limitador"></div>
                    <div className="relativos3"></div>

                    <div className="ticket">
                    <EstadoCarrito carrito={carrito} />

                </div>

                </div>
                {carrito.map(juego => {
                    return <CarritoCard key={juego.id}
                        orderId={juego.orders && juego.orders[0].id}
                        userId={userId}
                        id={juego.id}
                        nombre={juego.nombre}
                        descripcionCorta={juego.descripcionCorta}
                        precio={juego.precio}
                        cantidad={(juego.orders && juego.orders[0].productorders.cantidad) || juego.cantidad} //de donde se trae la cantidad en eagerLoading
                        multimedia={juego.multimedia} />
                })}
            </div>

            <div className="absoluto">

                

            </div>

            <div className="separador-botones-editCategoryList"> {/* -- */}
                    
                    </div>

        </div>






    )
}

export default Carrito

/*
const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()


const pintarCards = data => {
console.log(data)
data.forEach(producto => {
templateCard.querySelector('h5').textContent = producto.titulo
templateCard.querySelector('p').textContent = producto.precio
templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl)
templateCard.querySelector('button').dataset.id = producto.id

const clone = templateCard.cloneNode(true)
fragment.appendChild(clone)
})
items.appendChild(fragment);
}
*/