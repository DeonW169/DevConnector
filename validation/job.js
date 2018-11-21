const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateJobInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, {
            min: 40
        })) {
        errors.text = 'Description must be between min 40 characters';
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};