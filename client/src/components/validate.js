export default function validate(input) {
    let errors = {};

    if (!input.nombre) {
        errors.nombre = "el nombre es requerido"
    }
    if (!input.descripcion) {
        errors.descripcion = "la descripcion es requerida"
    }
    if (!input.descripcionCorta) {
        errors.descripcionCorta = "la descripcion corta es requerida"
    }
    if (!input.categorias) {
        errors.categorias = "la categoria es requerida"
    }
    if (!input.keyCode) {
        errors.keyCode = "el Key Code es requerido"
    }
    if (!input.tamanio) {
        errors.tamanio = "el tamaño es requerido"
    } 
    if (!input.precio) {
        errors.precio = "el precio es requerido"
    }
    if (!input.fechaLanzamiento) {
        errors.fechaLanzamiento = "la fecha de lanzamiento es requerida"
    }
    if (!input.clasificacion) {
        errors.clasificacion = "la clasificacion es requerida"
    }
    if (!input.desarrollador) {
        errors.desarrollador = "el desarrollador es requerido"
    }

    return errors;
};
