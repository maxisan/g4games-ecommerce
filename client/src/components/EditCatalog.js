import React from 'react';
import EditProductCard from './EditProductCard'
import cod from '../img/cod.jpeg'
import Footer from './Footer'
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from 'react-redux';

import MenuAdm from './MenuAdm'
const EditCatalog = () => {

        const products = useSelector(state => state.products);

        
        return (
                <div className ="spacer-two"> 
                
                <MenuAdm/>    
                                <div className="lista-cards-editcat">
                                
                                {products.map(oneProduct => {           
                                return <EditProductCard
                                        
                                        nombre={oneProduct.nombre}
                                        fotos={cod}
                                        videos={oneProduct.videos}
                                        descripcion={oneProduct.descripcion}
                                        descripcionCorta={oneProduct.descripcionCorta}
                                        categorias={oneProduct.categorias}
                                        precio={oneProduct.precio}
                                        id={oneProduct.id}
                                        keyCode={oneProduct.keyCode}
                                        tamanio={oneProduct.tamanio}
                                        stock={oneProduct.stock}
                                        
                                />
                               
                                })}
                                </div>
                        

                        </div>
                )
        };


export default EditCatalog;