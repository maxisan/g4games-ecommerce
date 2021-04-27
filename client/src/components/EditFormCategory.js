import React, { useState, useEffect } from 'react';
import validateCategorias from './validateCategorias';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getCategory } from '../Redux/actions';
import Select from 'react-select';
import { editCategory } from '../Redux/actions'
import { Link } from "react-router-dom";

export function EditFormCategory(props) { //el estado del formulario esta predefinido una vez que vaya cambiando lo submiteo.
  console.log("acaaaaa", props.location.state)
  const dispatch = useDispatch()
  const category = useSelector(state => state.oneCategory);
  const id = props.match.params.id
  //crear la accion, crear la ruta en el back, estado redux en el reducer.
  //usar un dispatch (props.match.params.id) con la accion que creee, mediante useeffect, tengoo que cambiar el boton que sea un link 

  //const categories = useSelector(state => state.categories); /// traerme el nuevo estado de redux. y le aplico un map 
  useEffect(() => {
    dispatch(getCategory(id))
    /* alert("bienvenidos"); */
    setInput({
      nombre: category.nombre,
      descripcion: category.descripcion,
      id: category.id
    })
  }, [category.id]) // el parametro de corte, no entiendo xq es esta variable 

  const [input, setInput] = React.useState({
    nombre: "",//props.location.state.nombre,
    descripcion: "",
    id: ""
  })
  function onClick1(e) {

    dispatch(getAllCategories())
  }
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
    dispatch(editCategory(input))// dispacho la acccion pasandole como parametro el estado input

    if (errors.nombre || errors.descripcion) {
      alert("campos obligatorios")
    } else {
      alert("Categorias enviadas")

    }
    dispatch(getAllCategories()) //leer de esto..
  }




  return (
    <div className="space">
      <div className="editar-cat-cont">

        <form onSubmit={handleSubmit}>
          <h2 className="titulo-edit-cat">Editar categoría</h2>
          <br />
          <input className="form-control" className="input-cat-edit" onChange={handleInputChange} type="text" name="nombre" placeholder="categoria" value={input.nombre} />
          <br />
          <input className="form-control" className="input-cat-edit" onChange={handleInputChange} type="text" name="descripcion" placeholder="descripcion" value={input.descripcion} />
          <br />
          <div className="btn-organizador">
            <button type="submit" className="btn-negro">Enviar</button>
            <br />
            <Link to="/admin/EditCategory">
              <button type="button" onClick={onClick1} className="btn-negro">Seguir Editando</button>
          </Link>
            </div>
        </form>
      </div>
    </div>

  )

}

export default EditFormCategory;