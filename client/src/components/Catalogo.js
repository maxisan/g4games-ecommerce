import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard'
//import cod from '../img/cod.jpeg'
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getAllCategories, resetFilter, getShoppingCart } from '../Redux/actions'
import ListaCategorias from './ListaCategorias';


const Catalogo = () => {

        const {products, filters, categories, carrito, perfil, autenticado} = useSelector(state => state);
        const dispatch = useDispatch()
        useEffect(() => {
                if (!filters.isFiltered) {
                        dispatch(getAllProducts());
                        dispatch(getAllCategories())
                }
                dispatch(getShoppingCart(perfil.id, autenticado))

        }, [filters.isFiltered])


        return (
                <div>
                        {/*Acá va el cartelito de filtro*/}
                        <div className='lista-categorias'>
                                <div class="logo-categorias">
                                        <h5 > Estas viendo {filters.category ? filters.category : 'todos los productos'}</h5>
                                </div>
                                <div className='estas'>
                                </div>
                                <ul className="menu_items">
                                        {categories.map(oneCategorie =>
                                                <li className="b">
                                                        <ListaCategorias 
                                                                nombre={oneCategorie.nombre}

                                                        />
                                                </li>

                                        )}
                                        <div className="separador-botones-editCategoryList" />
                                        <submit type="button" class="btn-negro-cruz" value="Reset" onClick={() => dispatch(resetFilter())}><i class="fas fa-times"></i></submit>
                                </ul>
                        </div>
                        <div className='DivGeneral'>

                                <div className="lista-cards">

                                        {products.map(oneProduct => {
                                                return <ProductCard
                                                        key={oneProduct.id}
                                                        nombre={oneProduct.nombre}
                                                        multimedia={oneProduct.multimedia}
                                                        descripcion={oneProduct.descripcion}
                                                        descripcionCorta={oneProduct.descripcionCorta}
                                                        precio={oneProduct.precio}
                                                        id={oneProduct.id}
                                                        stock={oneProduct.stock}
                                                        agregado={carrito.reduce((ec, g, i) => {
                                                                return (g.id === oneProduct.id) || ec
                                                        }, false)}
                                                        orderId={oneProduct.orders && oneProduct.orders[0].id}
                                                />
                                        })}
                                </div>

                        </div>

                </div>
        )
};


export default Catalogo