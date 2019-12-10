const validator = require('validator');
const isEmpty = require('../validation/is-empty');


const validateCategoryInput = data => {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';

    if(!validator.isLength(data.title, { min: 2, max: 30 })) {
        errors.title = 'הכותרת חייבת להכיל בין 2-30 תווים';
    }

    if(validator.isEmpty(data.title)) {
        errors.title = 'כותרת היא שדה חובה';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateCategoryInput;