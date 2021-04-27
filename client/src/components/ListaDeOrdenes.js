import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import S from './css/styles.css'
import { getOrders, getOrder, editOrder } from '../Redux/actions'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Select from 'react-select';
import MenuAdm from './MenuAdm'

const selectOrder = {
  option: provided => ({
    ...provided,
    color: 'black'
  }),
  control: provided => ({
    ...provided,
    color: 'white', backgroundColor:'#212529'
  }),
  singleValue: provided => ({
    ...provided,
    color: 'white'
  })
}

const selectState = {
  option: provided => ({
    ...provided,
    color: 'purple'
  }),
  control: provided => ({
    ...provided,
    color: 'black', backgroundColor:'#060708'
  }),
  singleValue: provided => ({
    ...provided,
    color: 'black'
  })
}


export function ListaDeOrdenes () {  
  const order = useSelector(state => state.orders);
  const dispatch = useDispatch()

  const [estado, setEstado] = useState('')
  

  function onClick(order){
    console.log(order.id,'user ide')
    dispatch(getOrder(order.id))
  }

  useEffect(() => {
    dispatch(getOrders())        
}, [order.length])  

let estados = ['Vacio', 'En proceso', 'Aprobado', 'Rechazado']
const options = estados.map(c => {
  return { value: c, label: c }
});


  function onChange(selEstados){
      console.log(selEstados)
    setEstado(selEstados.value);
  }


  
/*
setSelect({     //en el use effect
      estado:order.estado,
    })

setSelect({    //en la funcion
      [e.target.value]: e.target.value
    })
*/


  return (
      <div className='lista'> 

      <MenuAdm/>
       <table class="table table-dark table-hover">
      <thead>
      <tr>
        <th scope="col">Detalle</th>
        <th scope="col">E-mail</th>
        <th scope="col" >
           <Select className="blanqueador"   options={options} placeholder="Estados"  name='estados' onChange={onChange} />
                  </th>
                  
              </tr>
            </thead>
            <tbody>
            {order.map((order) => {
                if(order.estado === estado || !estado){
                      return (
                        
              <tr>
              
                <td >
                <button onClick={()=>onClick(order)} type="button" class="btn btn-dark"><Link to={`/order/${order.id}`}>
                  Ver detalle
                  </Link> </button>
                
                </td>
                <td>{order.emailEnvio}</td>
                <td>{order.estado}</td>
                
              </tr>
                      );}
                      })}
            
            
            </tbody>
          
          </table>
              </div>
          );
        
      }
        export default ListaDeOrdenes

        // function estadoOrden(estado){
        //   switch (estado) {
        //     case 'Estado':
        //       input.estado='Estado'
        //       return order.map((order) => {
        //         return order
        //       })
        //       break;
        //       case 'Vacio':
        //         input.estado='Vacio'
        //         return order.map((order) => {
        //           if(estado === "Vacio")
        //          return order
        //         })
        //         break;
        //       case 'En proceso':
        //         input.estado='En proceso'
        //         return order.map((order) => {
        //           if(estado === "En proceso")
        //          return order
        //         })
        //         break;
        //       case 'Aprobado':
        //         input.estado='Aprobado'
        //         return order.map((order) => {
        //           if(estado === "Aprobado")
        //          return order
        //         })
        //         break;
        //       case 'Rechazado':
        //         input.estado='Rechazado'
        //         return order.map((order) => {
        //           if(estado === "Rechazado")
        //          return order
        //         })
        //         break;
        //     default:
        //       break;
        //   }
        //   }