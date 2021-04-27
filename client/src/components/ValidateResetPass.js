export default function validateResetPass(input) {
    let errors = {};

    if (!input.password) {
        errors.password = "la contraseña es requerida"
    }

    return errors;
};