import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addToShoppingCart, clearShoppingCart } from '../Redux/actions';

const VerificarCarritos = function () {

    const {autenticado, perfil, carrito} = useSelector(estado => estado)
    const dispatch = useDispatch()
    const userId = perfil.id;
    const history = useHistory()

    useEffect(() => {
        fetch(`http://localhost:3001/user/${userId}/items`)
        .then(response => response.json())
        .then(async carrito => {
            const carritoLocal = JSON.parse(localStorage.getItem('carrito'))
            if (carrito.length) {
                if (carrito) {
                    dispatch(clearShoppingCart(carrito, autenticado))
                } else {
                    await fetch(`http://localhost:3001/order/${userId}`, {
                        credentials: 'include',
                        method: 'POST'
                    })    
                }
                carritoLocal.forEach(game => {
                    dispatch(addToShoppingCart(game, perfil, autenticado))
                });
                localStorage.removeItem('carrito')    
            
            }
        })
        .catch(err => console.log(err));
        history.push('/perfil')

        return
    },[perfil.id])

    return (
        <div>
            ...
        </div>
    )
}

export default VerificarCarritos