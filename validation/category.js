const validator = require('validator');
const isEmpty = require('../validation/is-empty');


const validateCategoryInput = data => {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';

    if(!validator.isLength(data.title, { min: 2, max: 30 })) {
        errors.title = 'Title must be between 2 and 30 characters';
    }

    if(validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateCategoryInput;