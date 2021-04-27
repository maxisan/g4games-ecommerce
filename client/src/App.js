
import React from 'react'

import { /////
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { useSelector } from 'react-redux';
//importación de las rutas
import EditFormCategory from './components/EditFormCategory'
import Home from './components/Home';
import Search from './components/Search';
import OpenMenu from './components/OpenMenu';
import Carrito from './components/Carrito';
import Producto from './components/Producto';
import FormUsuario from './components/FormUsuario';
import NavBar from './components/NavBar';
import NavBarLogged from './components/NavBarLogged';
import NavBarNoLogged from './components/NavBarNoLogged';
import Footer from './components/Footer';
import ProductosSearch from './components/ProductosSearch';
import FiltroProductsByCategory from './components/FiltroProductsByCategory'
import Login from './components/Login'
import Catalogo from './components/Catalogo'
import Admin from './components/Admin'
import EditCategory from './components/EditCategory'
import FormCategorias from './components/FormCategorias'
import ListaDeOrdenes from './components/ListaDeOrdenes';
import EditCatalog from './components/EditCatalog';
import EditFormProducto from './components/EditFormProduct';
import Orden from './components/Orden'
import SelectImages from './components/multimedia/SelectImages'
import FormProducto from './components/FormProducto'
import ComponenteFormCategoria from './components/ComponenteFormCategoria';
import EditListUsers from './components/EditListUsers';
import Perfil from './components/Perfil';
import UserAAdmin from './components/UserAAdmin';
import NewPass from './components/NewPass';

import VerificarCarritos from './components/VerificarCarritos';

import Intermedio from './components/Intermedio.js';
import CheckOut from './components/Checkout'

import UploadImageForm from './components/multimedia/UploadImageForm'
import EditImageForm from './components/multimedia/EditImageForm'


//importación de las img del nav
//import lupa from './img/lupa.png'
//import carrito from './img/carrito.png'
//import menu from './img/menu.png'


//importación de hoja de estilos css
/* import styles from './components/css/styles.css' */



function App() {
  const autenticado = useSelector(state => state.autenticado);
  const perfil = useSelector(state => state.perfil);
  return (

    // <Router>
    //   <body className = "degrade-fondo">
    //     <Switch>
    //       <Route path="/" component={NavBar} /> 
    //       <Route exact path="/" component={Home} />
    //       <Route exact path="/carrito" component={Carrito} />
    //       <Route exact path="/openMenu" component={OpenMenu} />
    //       <Route exact path="/producto" component={Producto} /> {/* revisar catalogo */}
    //       <Route exact path="/formularioProducto" component={FormProducto} />
    //       <Route exact path="/FormCategorias" component={FormCategorias} />
    //       <Route exact path="/products/:id" component={Producto.id} />
    //     </Switch>
    //   </body>
    // </Router>

    <Router>
      <body className = "degrade-fondo">


     {autenticado === false ? <Route path="/" component={NavBarNoLogged} /> : <Redirect to="/" />}
      {autenticado === true && perfil.rol ==="usuario"? <Route path="/" component={NavBarLogged} /> : <Redirect to="/" />}
      {perfil && perfil.rol === "admin" ? <Route path="/" component ={NavBar} /> : <Redirect to="/" />}    
        {/* lo mutie porque no me funciona bien sino */}




        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/catalogo" component={Catalogo} />
        <Route exact path="/carrito" component={Carrito} />
        <Route exact path="/openMenu" component={OpenMenu} />
        <Route exact path="/producto" component={Producto} /> {/* esto hay que sacarlo despues */}
        <Route exact path="/formUsuario" component={FormUsuario} /> 
        <Route exact path="/validacion" component={Intermedio}/>
        <Route exact path="/checkout" component={CheckOut} />
       
          <Route exact path="/checkout">
          {autenticado===true? <Redirect to="/checkout"/>:  <Redirect to="/login"/>}
        </Route>   
 
        <Route exact path="/admin" component={Admin} />     
        <Route exact path="/admin/listaDeOrdenes" component={ListaDeOrdenes} />
        <Route exact path="/admin/EditCatalog" component={EditCatalog} />
        <Route exact path="/admin/EditFormCategory/:id" component={EditFormCategory} />
        <Route exact path="/admin/EditCategory" component={EditCategory} />
        <Route exact path="/admin/EditFormProducto/:id" component={EditFormProducto} />
       
        <Route exact path="/formproducto" component={FormProducto} />
        <Route exact path="/formcategoria" component={ComponenteFormCategoria} />
        <Route exact path="/FormCategorias" component={FormCategorias} />
        <Route exact path="/admin/NuevoAdmin" component={UserAAdmin} />
      
        <Route exact path="/newPass/:id" component={NewPass} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/perfil" component={Perfil} />
        <Route exact path="/admin/EditUser" component={EditListUsers} />
        <Route exact path="/admin/FormProducto" component={FormProducto} />
        <Route exact path="/admin/FormCategorias" component={FormCategorias} />
      
        <Route exact path="/order/:id" component={Orden} />     
        <Route exact path="/producto/:id" component={Producto} />
        <Route exact path='/productoSearch' component={ProductosSearch} />
        <Route exact path='/producto/categoria/:nombre' component={FiltroProductsByCategory} />
        {/* <Route exact path='' component={FiltroProductsByCategory} /> */}

        {/**Rutas de la galería */}
        <Route exact path='/galeria/images/select' component={SelectImages} />
        <Route exact path='/galeria/add' component={UploadImageForm} />
        <Route exact path='/galeria/edit/:id' component={EditImageForm} />


      
        <Route exact path='/login/verificarcarritos' component={VerificarCarritos} />
        <Route path="/" component={Footer} /> 

       <Route exact path="/perfil">
          {autenticado===true? <Redirect to="/perfil"/>:  <Redirect to="/login"/>}
          {console.log('perfil',autenticado)}
        </Route> 

        <Route path="/admin">
          {perfil && perfil.rol === 'admin' ? <Redirect to="/admin"/> :  <Redirect to="/"/>}
         
        </Route> 

         <Route path="/checkout">
          {autenticado===true ? <Redirect to="/checkout"/> :  <Redirect to="/login"/>}
         
        </Route>  

        <Route exact path="/admin/formProducto">
          {perfil && perfil.rol==='admin'? <Redirect to="/admin/formProducto"/>:  <Redirect to="/"/>}
         
        </Route> 
        <Route exact path="/admin/formCategorias">
          {perfil && perfil.rol==='admin'? <Redirect to="/admin/formCategorias"/>:  <Redirect to="/"/>}
         
        </Route> 
        <Route exact path="/admin/editUser">
          {perfil && perfil.rol==='admin'? <Redirect to="/admin/editUser"/>:  <Redirect to="/"/>}
         
        </Route> 
        <Route exact path="/admin/listaDeOrdenes">
          {perfil && perfil.rol==='admin'? <Redirect to="/admin/listaDeOrdenes"/>:  <Redirect to="/"/>}
         
        </Route> 
        <Route path="/admin/EditCatalog">
          {perfil && perfil.rol==='admin'? <Redirect to="/admin/EditCatalog"/>:  <Redirect to="/"/>}
         
        </Route>
        <Route path="/admin/EditFormCategory/:id">
          {perfil && perfil.rol==='admin'? <Redirect to="/admin/EditFormCategory/:id"/>:  <Redirect to="/"/>}
         
        </Route>
        <Route path="/admin/EditFormProducto/:id">
          {perfil && perfil.rol==='admin'? <Redirect to="/admin/EditFormProducto/:id"/>:  <Redirect to="/"/>}
         
        </Route> 
      </body>
    </Router>



  );
}

export default App;
//<Route exact path="/products/:id" component={Producto.id}/>