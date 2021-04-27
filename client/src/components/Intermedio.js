import React from 'react';
import {useEffect,useState} from 'react';
import { useHistory } from "react-router-dom";
import {useDispatch,useSelector } from 'react-redux';



function Intermedio() {

 let autenticado = useSelector(state => state.autenticado);
 const perfil = useSelector(state => state.perfil)
const history = useHistory();
  
useEffect(() => {
        if (autenticado !== true){
            alert("intente de nuevo")
            history.push("/login")
        }
        if (autenticado === true) {
            if(perfil.estadoUser === 'deleted'){
                alert('este usuario ha sido invalidado')
                history.push("/login")
            }
            if(perfil.estadoPassword === 'reset'){
                alert('debe ingresar una contraseña nueva')
                history.push(`newPass/${perfil.id}`)
            }
            else{

                history.push("/login/verificarcarritos")

            }
        }
      }, [autenticado]) 
       



return (
    <div>
        ....
    </div>




)};

export default Intermedio;