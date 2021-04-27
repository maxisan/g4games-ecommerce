import React, { useState, useEffect } from 'react';
import validateUser from './validateUser';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getAllUsers } from '../Redux/actions';
import { useHistory } from 'react-router-dom';




export function AddUser() {
  const [input, setinput] = useState({
    username: "",
    password: "",
    email: "",

  });
  
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const user = useSelector(state => state.users)
    const history = useHistory();


    useEffect(() => {
      dispatch(getAllUsers())
      setErrors(validateUser(input))
      console.log(user)
    }, [input, user.length])
  
     
  
    const onSubmit = (e) => {
      e.preventDefault();
      if (!Object.keys(errors).length) {

        //console.log("estoo es el user", user[0].username,input.username)
        for (let i = 0; i < user.length; i++) {
          if(user[i].username === input.username) {
           return alert("el usuario ya existe")
          }
       } 
    
      }
      else {
        return alert (Object.values(errors).join("\n"));
      }
      
      dispatch(addUser(input))
      alert("usuario creado")
      history.push('/login')
      
      setinput({
        ...input,
        username: "",
        password:"",
        email: ""
      })
     
    }

    
   /* const onSubmit = (e) => {
      e.preventDefault();
      if (Object.keys(errors).length) {
        //console.log("estoo es el user", user[0].username,input.username)
        alert(Object.values(errors).join("\n"));
      }
       else if(!Object.keys(errors).length) {
        for (let i = 0; i < user.length; i++) {
          if(user[i].username === input.username) {
           return alert("el usuario ya existe")
          } else if(user[i].username !== input.username) {
            dispatch(addUser(input))
            alert("usuario creado")
            return  setinput({
              ...input,
              username: "",
              password:"",
              email: ""
            })
       } 
      }
    }
    }  */


const onChange = (e) => {
  let newinput = {
    ...input,
    [e.target.name]: e.target.value
  };
  setinput(newinput);
}


return (
  <div className="spacer">




    <div className="login-box">

      <h1>Crear una cuenta</h1>

      <form onSubmit={onSubmit}>


        <div className="textbox">
          <div className="acai">   <i class="fas fa-user"></i></div>
          <input className="holder-login" type="text" name="username" placeholder="Usuario" required onChange={onChange} value={input.username} />
        </div>


        <div className="textbox">
          <div className="acai">   <i class="fas fa-lock"></i> </div>
          <input className="holder-login" type="password" name="password" placeholder="Contraseña" required onChange={onChange} value={input.password} />
        </div>


        <div className="textbox">
          <div className="acai">   <i class="fas fa-at"></i> </div>
          <input className="holder-login"  name="email" placeholder="E-mail" onChange={onChange} required value={input.email} />
        </div >


        <button type="submit" className="btn-register">Registrarse</button>



      </form>

    </div >

  </div >
)

};

export default AddUser;
