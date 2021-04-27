export default function validateReview(input) {
    let errors = {};

    if (!input.puntaje) {
        errors.puntaje = "el puntaje es requerido"
    }
    
    if (!input.opinion) {
        errors.opinion = "la opinión es requerida"
    }

    return errors;
};