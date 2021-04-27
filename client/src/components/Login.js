import React, { useState, useEffect } from 'react';
import validateLogin from './validateLogin';
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, login } from '../Redux/actions'
import { useHistory } from "react-router-dom";
import { autenticationValidate } from '../Redux/actions'


const Login = () => {


  const history = useHistory()
  const dispatch = useDispatch()
  let autenticado = useSelector(state => state.autenticado);
  const perfil = useSelector(state => state.perfil);

  const [input, setInput] = useState({
    username: "",
    password: "",

  });
  const [errors, setErrors] = React.useState({})


/* const onClick = () => {
  window.open('http://localhost:3001/auth/github', '_self')
} */


  const onClick2 = () => {
    window.open('http://localhost:3001/auth/google', '_self')
  }

  const handleInputChange = function (e) {

    setErrors(validateLogin({ //validate devuelve un objeto error donde nombre: .. y descripcion temdran el valor del error
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

    dispatch(login(input));
    setTimeout(() => {
      history.push("/validacion")
    }, 500)






    setInput({
      ...input,
      username: "",
      password: ""
    })

  }

  return (
    <div className="spacer">


      <div className="login-box" >

        <h1>Ingresar</h1>

        <form onSubmit={handleSubmit}>

          <div className="textbox">
            <div className="acai">   <i class="fas fa-user"></i></div>
            <input className="holder-login" id="exampleinputEmail1" type="text" name="username" placeholder="Usuario o Email" onChange={handleInputChange} value={input.username} />
            {errors.username && <p className="danger">{errors.username}</p>}
          </div>

          <div className="textbox">
            <div className="acai">   <i class="fas fa-lock"></i> </div>
            <input className="holder-login" id="exampleinputEmail1" type="password" name="password" placeholder="Contraseña" onChange={handleInputChange} value={input.password} />
            {errors.password && <p className="danger">{errors.password}</p>}
          </div>



          <button type="submit" className="btn-register">Ingresar</button>


        </form>
        <div className="organizador-btn">

        {/*  <button type="button" className="btn-github" onClick={() => onClick()} ><i class="fab fa-github"></i> Ingresar con GitHub</button> */}

          <button type="button" className="btn-google" onClick={() => onClick2()} ><i class="fab fa-google"></i> Ingresar con Google</button>

        </div>

      </div>
    </div>




  )
}


export default Login; ////