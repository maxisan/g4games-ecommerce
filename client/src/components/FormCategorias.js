import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch,  useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { addCategory } from '../Redux/actions'
import validateCategorias from './validateCategorias'
import MenuAdm from './MenuAdm'
import {getAllCategories} from '../Redux/actions'



function FormCategorias(props) {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories)
  const history = useHistory()
 
const [input, setInput] = React.useState({
    nombre: '',
    descripcion: '',
  })
  const [errors, setErrors] = React.useState({})

 
const handleInputChange = function (e) {
    setErrors(validateCategorias({ //validate devuelve un objeto error donde nombre: .. y descripcion temdran el valor del error
      ...input,
      [e.target.name]: e.target.value
    }))

    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = function (e) {
    e.preventDefault();

    if (errors.nombre || errors.descripcion) {
      alert("campos obligatorios")
    } else {
      for (let i = 0; i < categories.length; i++) {
        if(categories[i].nombre === input.nombre) {
          return alert("La categoria ya existe")
        }
      
  }
    dispatch(addCategory(input))
    alert("Categorias enviadas")
    dispatch(getAllCategories())
    return setInput({
      ...input,
      nombre: "",
      descripcion: ""
    })
   
  }
}

  return (

    <div className="spacer-two">
      <MenuAdm />
      <div className="contenedor">

        <form onSubmit={handleSubmit}>
          <div className="ubicador-formulario-categorias">
          <div className="mb-3">

            <input name="nombre" className={errors.nombre && 'danger'} type="text" placeholder="nombre" onChange={handleInputChange} value={input.nombre} className="input-form-producto" id="exampleInputEmail1" aria-describedby="emailHelp" />
            {errors.nombre && <p className="danger">{errors.nombre}</p>} {/* esto se llama renderizado condicional */}

          </div>


          <div className="mb-3"> {/*  */}

            <input name="descripcion" className={errors.descripcion && 'danger'} type="text" placeholder="Descripción" onChange={handleInputChange} value={input.descripcion} className="input-form-producto" id="exampleInputPassword1" />
            {errors.descripcion && <p className="danger">{errors.descripcion}</p>} {/* si existe la propiedad  en el obj de error, me mostrara un parrafo con el error y una clase */}
          <button /* onClick={handleSubmit} */ type="submit" className="btn-enviar-categoria">Enviar</button>
          </div>
          </div>
          <br />
        </form>
      </div>



    </div>

  );
}

export default FormCategorias;