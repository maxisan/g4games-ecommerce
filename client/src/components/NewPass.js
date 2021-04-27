import React, { useState, useEffect } from 'react';
import validateResetPass from './ValidateResetPass';
import { useDispatch, useSelector } from 'react-redux';
import { newPassword, logout } from '../Redux/actions';
import { useHistory } from "react-router-dom";


export function ResetPass() {
    const [input, setInput] = useState({
      password: "",
   
    });
  
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const perfil = useSelector(state => state.perfil)
    const history = useHistory();

    useEffect(() => {
        setErrors(validateResetPass(input))
      }, [input, perfil.length])
    
    const onSubmit = (e) => {
      e.preventDefault();
      if (!Object.keys(errors).length) {
        dispatch(newPassword(input, perfil.id));
        dispatch(logout());
        alert('Contraseña actualizada, debes volver a ingresar');
        history.push('/login')
        window.location.reload();

      }
      else {
        alert(Object.values(errors).join("\n"));
      }
      setInput({
        ...input,
        password: "",
        
      })
     
    }

    const onChange = (e) => {
      let newInput = {
        ...input,
        [e.target.name]: e.target.value
      };
      setInput(newInput);
    }

  
    return ( 
          <form onSubmit={onSubmit}>
            
            <br />
              <input className="form-control" id="exampleinputEmail1"   type="password" name="password" placeholder="Ingresar nueva contraseña" onChange={onChange} value={input.password} />
              <button  type="submit" className="btn btn-primary">Actualizar contraseña</button>
            <br />
  
          </form>
    )
  
  };
  
  export default ResetPass;