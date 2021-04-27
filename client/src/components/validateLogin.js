export default function validateLogin(input) { ///
    let errors = {};//defino un objeto vacio

    if (!input.username) { //si no existe dentro del input la propiedad 
        errors.username = "el usuario es requerido" //la propiedad del objeto error lo seteo con este str.
    }
    
    if (!input.password) {//si no existe dentro del input la propiedad descripcion
        errors.password = "la contraseña es requerida"//la propiedad del objeto descripcion la seteo con str.
    }
    
    return errors;//devuelvo el objeto donde seteamos los errores.
};