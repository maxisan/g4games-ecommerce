export default function validateCategorias(input) {
    let errors = {};//defino un objeto vacio

    if (!input.nombre) { //si no existe dentro del input la propiedad nombre
        errors.nombre = "el nombre es requerido" //la propiedad del objeto error lo seteo con este str.
    }
    
    if (!input.descripcion) {//si no existe dentro del input la propiedad descripcion
        errors.descripcion = "la descripcion es requerida"//la propiedad del objeto descripcion la seteo con str.
    }
    
    return errors;//devuelvo el objeto donde seteamos los errores.
};