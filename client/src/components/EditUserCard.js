import React, { useEffect }from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { deleteUser, getAllUsers, resetPassword } from '../Redux/actions'




function EditUserCard({ id, username, password, estadoUser, email, rol }) {
    const dispatch = useDispatch();
    
    const handleOnClick1 = (id) => {
        dispatch(deleteUser(id))
        alert('Usuario eliminado')
        dispatch(getAllUsers())
    }

    const handleOnClick2 = (id) => {
        dispatch(resetPassword(id))
        alert('Pedido realizado')
        dispatch(getAllUsers())
    }
   
    return (

        <div className="container-card-catalog">

            <div className="" >

                <div>
                <p>{username}</p>
                <p>Email: {email}</p>
                <p>Estado User: {estadoUser}</p>
                <p>Rol: {rol}</p>
                <p>ID: {id}</p>
                </div>
                <div>
                <button type="button" className="btn-negro" onClick = {() => handleOnClick2(id)} >Reset Password</button>
                <button type="button" className="btn-negro" onClick = {() => handleOnClick1(id)} >Eliminar usuario</button>
                </div>
            </div>



        </div>


    )
}


export default EditUserCard
