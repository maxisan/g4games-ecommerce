import React from 'react';
import ProductCard from './ProductCard'
import cod from '../img/cod.jpeg'
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from 'react-redux';


const FiltroProductoCategoria = () => {

        const products = useSelector(state => state.products);

        return (
                <div>
                        {products.map(oneProduct => <ProductCard
                                titulo={oneProduct.nombre}
                                img={cod}
                                descripcion={oneProduct.descripcion}
                                descripcionCorta={oneProduct.descripcionCorta}
                                precio={oneProduct.precio}
                                id={oneProduct.id}
                        />)}             
                </div>
        )
};


export default FiltroProductoCategoria