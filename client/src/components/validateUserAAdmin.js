export default function validateUserAAdmin(input) {
    let errors = {};

    if (!input.id) {
        errors.id = "el ID es requerido"
    }

    return errors;
};
