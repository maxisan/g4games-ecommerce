import React, {useEffect} from 'react'
import {useDispatch,useSelector } from 'react-redux'
import Carrusel from './Carrusel'
import Catalogo from './Catalogo.js'
import {autenticationValidate} from '../Redux/actions'

const Home = () => {
    
    const dispatch = useDispatch()
    const autenticado = useSelector(state => state.autenticado);
    
useEffect(() => {
console.log("lo recibo asi", autenticado)
dispatch(autenticationValidate())
console.log("lo recibo asi", autenticado)
}, [autenticado]) ////
    
    
    
    
    
    return (
      <div>
            <Carrusel />
            <Catalogo />
        </div>
    )
}

export default Home