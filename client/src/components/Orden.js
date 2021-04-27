import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import S from './css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { editOrder, getOrder } from '../Redux/actions'
import Select from 'react-select';

export function Orden (props) {  
  
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const order = useSelector(state => state.order);
  
  
  const [input, setInput] = useState('')
  
  

  let estados = ['Vacio', 'En proceso', 'Aprobado', 'Rechazado']
  const options = estados.map(c => {
  return { value: c, label: c }
  
  });
/*
  useEffect(() => {
    console.log('se dispachó')
    
    console.log('se dispachó')
    console.log("q valor es esto",id);
  }, [input])
  */

  function cambiarEstado(selEstados){
    
    console.log("A VER ESTO",selEstados.value)
    
    setInput(
      selEstados.value
    );
    console.log('este el sel estados: ',selEstados.value, id);
    dispatch(editOrder(selEstados.value, id))
    console.log('este el sel estados despues del dispatch: ',selEstados.value, id);
}
  
  
 
return (
    
    <div className='lista'> 
      <table  class="table table-dark table-hover">
        <thead>
          <tr>
          <th>ID del usuario</th>
          <th>ID de la orden</th>
            <th>E-mail</th>
            <th>Estado</th>
            <th>Productos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.map((order) => {
            return (
              <tr key={order.id}  >
                 <td>{order.userId}</td>
                 <td>{order.id}</td>
                 <td>{order.emailEnvio}</td>
                <td> 
                <Select className="blanqueador" options={options} placeholder="Estados" name='estado' onChange={cambiarEstado}/>
                </td>
                <td>{order.products.map((producto)=>{
                  return(
                    <li>{producto.nombre} (${producto.precio}) ({producto.productorders.cantidad} unidad/es)</li>)
                })}</td>
                <td>${order.total}</td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  
  
);
}

export default Orden