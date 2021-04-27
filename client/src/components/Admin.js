import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { getOrders, getAllCategories, getAllUsers } from '../Redux/actions'
import FormCategorias from './FormCategorias'
import FormProducto from './FormProducto'
import S from './css/styles.css'

import MenuAdm from './MenuAdm'



function Admin() {
  const order = useSelector(state => state.orders);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers());
  }, [])

  function onClick() {

    dispatch(getOrders())

  }
  function onClick1() {

    dispatch(getAllCategories())

  }
  function onClick2() {

    dispatch(getAllUsers())

  }
  return (

    <div className="spacer">
      
      <MenuAdm />
      <div className="funciones-adm">
        <h3>Funciones de administrador</h3>
      </div>
    </div>
  )
}

export default Admin