import React, {useState} from 'react'
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from 'react-redux';
import { deleteProduct, getAllProducts } from '../Redux/actions'




function EditProductCard({ id, nombre, descripcion, descripcionCorta, categorias, precio, fotos, keyCode, tamanio, stock }) {
    const dispatch = useDispatch();
    
    const handleOnClick1 = (id) => {
        dispatch(deleteProduct(id))
        alert('producto eliminado')
        dispatch(getAllProducts())
    }
   
    return (

        <div className="container-card-catalog">

            <div className="" >

                <img src={fotos} width="50px"></img>
                <h4>{nombre}</h4>
                {stock ?  <div><p>{descripcionCorta}</p>
                <p>Moneda Nacional: {precio}</p> </div>: <h2>'Producto no disponible'</h2> }
                <p>ID: {id}</p>
                <div>
                <Link to={{
                    pathname: `/admin/EditFormProducto/${id}`,
                    state: {id, nombre, descripcion, descripcionCorta, categorias, precio, fotos, keyCode, tamanio, stock}
                    }}>
                <button type="button" className="btn-negro" >Editar producto</button>
                </Link>
                <button type="button" className="btn-negro" onClick = {() => handleOnClick1(id)} >Eliminar producto</button>
                </div>
            </div>



        </div>


    )
}


export default EditProductCard