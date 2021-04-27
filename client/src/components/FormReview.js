import React, { useState, useEffect } from 'react';
import validateReview from './ValidateReview';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { addReview } from '../Redux/actions';


export function FormReview({ id }) {
  const [input, setinput] = React.useState({
    puntaje: 0,
    opinion: "",
    id
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const reviews = useSelector(state => state.reviews);
  const autenticado = useSelector(state => state.autenticado);

  useEffect(() => {
    setErrors(validateReview(input))
  }, [input, reviews.length])

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("estoy submiteando")
    if (!Object.keys(errors).length) {
      if (autenticado !== true) {
        alert('debe logearse para dejar una opinion');
        history.push("/login");
      }
      else if (autenticado === true) {
        alert("gracias por su oponion")
        dispatch(addReview(input))
      }
    }
    else {
      alert(Object.values(errors).join("\n"));
    }
    setinput({
      ...input,
      puntaje: "",
      opinion: "",
    })
  }
  const onChange = (e) => {
    let newinput = {
      ...input,
      [e.target.name]: e.target.value
    };
    setinput(newinput);
  }

  const OnClick = (e) => {
    e.preventDefault();
    console.log("estoy entrando")
    console.log("el name vale, ", [e.target.value[0]])

    if (e.target.value && Array.isArray([e.target.value])) {
      setinput({
        ...input,
        puntaje: e.target.value[0],
      })
    }
    else if (e.target.value) {
      setinput({
        ...input,
        puntaje: e.target.value,
      })
    }
    else {
      alert("Ocurrio un error inesperado,Intente de nuevo")
    }
  }
  return (
    <div >
      <div className="contenedor-estrellas" >

        <form onSubmit={onSubmit}>
          <div className="estrellitas">
            <p class="clasificacion">
              <input onClick={OnClick} id="radio1" type="radio" name="estrellas" value="5" />
              <label for="radio1">★</label>
              <input onClick={OnClick} id="radio2" type="radio" name="estrellas" value="4" />
              <label for="radio2">★</label>
              <input onClick={OnClick} id="radio3" type="radio" name="estrellas" value="3" />
              <label for="radio3">★</label>
              <input onClick={OnClick} id="radio4" type="radio" name="estrellas" value="2" />
              <label for="radio4">★</label>
              <input onClick={OnClick} id="radio5" type="radio" name="estrellas" value="1" />
              <label for="radio5">★</label>

            </p>
          </div>
          <div className="opinion">Dejá tu opinión sobre este juego</div>

          <input className="text-estrellas" id="exampleinputEmail1" type="text" name="opinion" placeholder="Escriba su opinión" onChange={onChange} value={input.opinion} />
          <br />
          <button type="submit" className="btn-estrela">Enviar opinión</button>
        </form>
      </div>
    </div>



  )
};
export default FormReview;