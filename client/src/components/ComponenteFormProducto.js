import React from 'react';
import FormProducto from './FormProducto'
import styles from './css/styles.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function ComponenteFormProducto() {
    return (
        <div >

            <div >
           

                <FormProducto />

            </div>

        </div>
    )
}

export default ComponenteFormProducto