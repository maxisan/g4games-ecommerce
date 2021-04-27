import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import SearchBar from './SearchBar';

import { getPerfil, getOrdersById } from '../Redux/actions'

import {useDispatch, useSelector} from 'react-redux'
import {autenticationValidate} from '../Redux/actions'

//logo
import logo from '../img/g4.png'

function NavBarLogged() {
  const dispatch = useDispatch();
  const autenticado = useSelector(state => state.autenticado)

  let order = useSelector(state => state.orders);
  const perfil = useSelector(state => state.perfil);
  


  useEffect(() => {
    console.log('antes: ', autenticado)
    dispatch(autenticationValidate())
    console.log('despues: ', autenticado)
  }, [autenticado])

  const onClick = () => {
    dispatch(getPerfil())

    dispatch(getOrdersById(perfil.id))

  }
  return (
    
    <div>

      <nav className="menu">
        <label className='logo'>
          <Link to="/" className='logo'> <img src={logo} className="logo" /> </Link>
        </label>

        <ul className="menu_items">
          <SearchBar />
          <li>




          </li>
          <li> <Link to="/carrito" className="a" > <i class="fas fa-shopping-cart"></i> </Link></li>

          {/* <li> <Link to="/formularioProducto" className="a" ><i class="fab fa-product-hunt"></i></Link></li> */}

          

          {/* <li> <Link to="/FormCategorias" className="a"> <i class="fas fa-shapes"></i></Link></li> */}

         

          <li onClick={()=> onClick(order.id)}> <Link to="/perfil" className="a"> <i class="fas fa-user"></i></Link></li>

        </ul>

        <span className="btn_menu"  >
          <i class="fas fa-bars"></i>
        </span>

      </nav>

    </div>

  )
}

export default NavBarLogged