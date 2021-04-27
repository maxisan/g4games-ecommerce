import React from 'react';
import EditCategoryList from './EditCategoryList'
import cod from '../img/cod.jpeg'
import Footer from './Footer'
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch, useEffect } from 'react-redux';

import MenuAdm from './MenuAdm'

const EditCategory = () => {  //aca es donde me tengo que traer las cosas y con un boton voy al formulario mdiante link..


        const categories = useSelector(state => state.categories);


        return (
                <div className="spacer-four">
                        <MenuAdm />
                        <div className="edit-category">

                                <h1 className="titulo-categorias">Categorías</h1> {/* aca cuando ande mi base de datos tengo que hacer el map */}
                                {categories.map(oneCategory => {
                                        return (
                                        
                                        
                                        <EditCategoryList
                                                nombre={oneCategory.nombre}
                                                descripcion={oneCategory.descripcion}
                                                id={oneCategory.id}

                                        />
                                        )

                                }
                                )}
                        </div>
                </div>
        )
};


export default EditCategory; 