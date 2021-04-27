import React, { useState, useEffect } from 'react';
import validateUserAAdmin from './validateUserAAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { userAAdmin } from '../Redux/actions';



export function UserAAdmin() {
    const [input, setinput] = useState({ 
    id: "",
   
    });
  
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const nuevoAdmin = useSelector(state => state.nuevoAdmin)

    useEffect(() => {
        setErrors(validateUserAAdmin(input))
      }, [input, nuevoAdmin.length])
    
    const onSubmit = (e) => {
      e.preventDefault();
      if (!Object.keys(errors).length) {
        dispatch(userAAdmin(input.id));
        alert('El usuario ahora es un admin');
        
      }
      else {
        alert(Object.values(errors).join("\n"));
      }
      setinput({
        ...input,
        id: "",
        
      })
     
    }

    const onChange = (e) => {
      let newinput = {
        ...input,
        [e.target.name]: e.target.value
      };
      setinput(newinput);
    }

  
    return ( 
          <form onSubmit={onSubmit}>
            
            <br />
              <input className="form-control" id="exampleinputEmail1"   type="text" name="id" placeholder="Ingrsar ID" onChange={onChange} value={input.id} />
              <button  type="submit" className="btn btn-primary">Hacer admin</button>
            <br />
  
          </form>
    )
  
  };
  
  export default UserAAdmin;