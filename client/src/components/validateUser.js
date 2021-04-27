export default function validateUser(input) {
    let errors = {};

    if (!input.username) {
        errors.username = "el usuario es requerido"
    }
    
    if (!input.password) {
        errors.password = "la contraseña es requerida"
    }
    if (!input.email) {
        errors.email = "el e-mail es requerido"
    }  
    else if (!/^\S+@\S+\.\S+$/.test(input.email)) {
        errors.email = 'Email invalido ';
      }

    return errors; //
};

///^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(campo.value)