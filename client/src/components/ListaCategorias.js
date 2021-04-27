import React from 'react'
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from 'react-redux'
import {filterProductsByCategory} from '../Redux/actions'

function ListaCategorias({ nombre }) {

    const dispatch = useDispatch();

    return ( 

        <div className="lista-categorias">
            
                    <Link className='link' onClick={()=>dispatch(filterProductsByCategory(nombre))}/*to="/producto/categoria/${nombre}"*/>
                        <h4 className="categorias_items">{nombre}</h4>
                    </Link>
                
            
        </div>
    )
}

export default ListaCategorias