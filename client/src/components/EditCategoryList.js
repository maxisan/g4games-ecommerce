import React, { useEffect, useState, useSelector } from 'react'
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from 'react-redux';
import { getAllCategories } from '../Redux/actions';
import { deleteCategory } from '../Redux/actions'

function EditCategoryList({ nombre, descripcion, id }) { //esta va a ser la lista que renderize cada categoria y cada boton (pasa las props que recibe)
    const dispatch = useDispatch();

    const [data, setData] = useState()

    const handleOnClick1 = (id) => {
        console.log(id)
        dispatch(deleteCategory(id))
        alert('categoria eliminada')
        dispatch(getAllCategories())
    }

    return (

        <div className="categoria-relativo" >

            <ul>
                <div>
                    <div className="items-lista-editCategoryList">
                        <div>{nombre}</div> <br />
                        <div>{descripcion}</div> <br />
                        <div>{id}</div> <br />
                    </div>
                    <div className="separador-botones-editCategoryList">
                    <Link to={{
                        pathname: `/admin/EditFormCategory/${id}`,
                        state: { id, nombre, descripcion }
                    }}>
                            <button type="button" className="btn-negro" >Editar categoria</button>
                    </Link>
                        
                        <button type="button" className="btn-negro" onClick={() => handleOnClick1(id)} >Eliminar categoria</button>
                    </div>
                    <div className="separador-two" />
                </div>
            </ul>

        </div>
    )
}

export default EditCategoryList;