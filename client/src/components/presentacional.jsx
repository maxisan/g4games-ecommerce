import React from 'react';
import ProductCard from 'archivoAxel';



const Producto = ({ nombre, descripcion, precio, stock }) => {

    return (
        <div>
            <ProductCard
                nombre='cod'
                descripcion='juego de tiros'
                precio='$300'
                stock='true'


            />


        </div>
    )

};

export default Producto;


