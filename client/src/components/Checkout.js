import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mercadoPago } from '../Redux/actions'
import { Redirect, useHistory } from "react-router-dom";
import { resetCarrito } from '../Redux/actions';
import imgCheck from '../img/checkout.png'
const CheckOut = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const perfil = useSelector(estado => estado.perfil);
  const historial = useSelector(estado => estado.historial);
  const carrito = useSelector(state => state.carrito);
  const autenticado = useSelector(estado => estado.autenticado);
  let order;
  
  
  var cantTotal = carrito.reduce((cant, juego) => {
    if (autenticado && juego.orders) {
        return cant + juego.orders[0].productorders.cantidad
    }
    return cant + juego.cantidad;
    }, 0)
  var impTotal = carrito.reduce((imp, juego) => {
    if (autenticado && juego.orders) {
        return imp + (juego.orders[0].productorders.cantidad * juego.precio)
    }
    return imp + (juego.cantidad * juego.precio);
    }, 0)

  //var total = props.location.state[impTotal];

  var claves = carrito.reduce((ac, el)=>  { return ac + el.nombre +' '+ el.keyCode+' '  }, '');
  console.log("claves", claves);

  var input = {
    total: impTotal,
    carrito : carrito,
    claves: claves,
    perfil: perfil
  }

  console.log("a ver q manda", props);
  
  
  
  //integracion mercado pago !!
  const handleSubmit = (e) => {
    e.preventDefault() ;
    fetch('http://localhost:3001/checkout',
      {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(input),
        mode: 'cors',
        cache: 'default',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
      .then(rse => rse.json())
      .then(json =>
        window.open(json.body.init_point), '_blank', 
        )
        .then(() =>{
        dispatch(resetCarrito()) ;
       history.push('/')})
       
       console.log("entreeeee")
       
  } 
  


  return (

    <div className="space">
      <div className="relativizador">
      <img className="imagen-check" src={imgCheck} />
        <div>
          <div className="orden-numero">FINALIZAR COMPRA</div>
          <div className="estado-orden"></div>
          <div className="lista-prods">
          <h5 >Productos: </h5>
                    {carrito.map((producto) => {
                      return <ul className="lista-lista" ><li> ${producto.precio} | {producto.nombre} ({producto.orders[0].productorders.cantidad} unidad/es)</li></ul>
                    })}
          </div>

          <div className="precio-total">Total: ${impTotal} </div>




        </div>


        <div>
          <form onSubmit={handleSubmit}>

            <button type="submit" name="mercado pago" target='_blank' className="btn-mercadopago" >Pagar con Mercado Pago </button>
            
          </form>
        </div>
      </div>
    </div>
  )





}


export default CheckOut;