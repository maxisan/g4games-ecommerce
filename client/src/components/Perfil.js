import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/actions';
import { useHistory } from "react-router-dom";

import styles from "./css/styles.css"
const Perfil = () => {

  const perfil = useSelector(state => state.perfil);
  const historial = useSelector(state => state.historial);
  const dispatch = useDispatch();
  const history = useHistory();


  function onClick(e) {
    dispatch(logout())
    window.location.reload();
  }


  let numOrden = 0;


  return (

    <div className='spacer'>


      <div class="card-body" >
        <h5 class="card-title">Usuario: {perfil.username}</h5>
        <h5 class="card-title">E-mail: {perfil.email}</h5>
        {console.log(perfil)}
        <button className="btn-negro" onClick={onClick}>Cerrar sesión</button>
      </div>

      {historial && historial.length > 0 ?
        <div class="card-body2" >

          {historial.map(historial => {
            numOrden++
            console.log('historial', historial);
            return (
              <div>
                <h4><b><u>Orden n°{numOrden} </u></b></h4>
                <h5 ><b>Estado: </b>{historial.estado}</h5>
                { historial.products && historial.products.length > 0 ?
                  <div>
                    <h5 ><b>Productos: </b></h5>
                    {historial.products.map((producto) => {
                      return <div ><li>{producto.nombre} (${producto.precio}) ({producto.productorders.cantidad} unidad/es)</li></div>
                    })}
                  </div>
                  : null
                }
                <h5>Total: ${historial.total} </h5>
              </div>
            )
          })}
        </div> : null}
    </div>
  )
}


export default Perfil;

