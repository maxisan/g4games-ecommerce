import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard'
import cod from '../img/cod.jpeg'
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from 'react-redux';

const ProductoSearch = () => {

        const products = useSelector(state => state.search);


        return (

                <div className="spacer-search" >

                        <div className="lista-cards">

                                {products.map(oneProduct => <ProductCard
                                        key={oneProduct.id}
                                        nombre={oneProduct.nombre}
                                        multimedia={oneProduct.multimedia}
                                        descripcion={oneProduct.descripcion}

                                        descripcionCorta={oneProduct.descripcionCorta}
                                        precio={oneProduct.precio}
                                        id={oneProduct.id}
                                        stock={oneProduct.stock}
                                        agregado={products.reduce((ec, g, i) => {
                                                return (g.id === oneProduct.id) || ec
                                        }, false)}
                                        orderId={oneProduct.orders && oneProduct.orders[0].id}
                                        categorias={oneProduct.categorias}
                                        fechaLanzamiento={oneProduct.fechaLanzamiento}
                                        clasificacion={oneProduct.clasificacion}
                                        desarrollador={oneProduct.desarrollador}
                                />)}
                        </div>

                        <div className="separador"></div>
                </div>
        )
};

export default ProductoSearch