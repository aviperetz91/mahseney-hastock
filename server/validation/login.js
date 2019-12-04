const validator = require('validator');
const isEmpty = require('../validation/is-empty');


const validateLoginInput = data => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!validator.isEmail(data.email)) {
        errors.email = 'כתובת מייל לא תקינה';
    }

    if(validator.isEmpty(data.email)) {
        errors.email = 'אימייל הוא שדה חובה';
    }

    if(!validator.isLength(data.password, { min: 6, max: 12 })) {
        errors.password = 'הסיסמא חייבת להכיל בין 6-12 תווים';
    }

    if(validator.isEmpty(data.password)) {
        errors.password = 'סיסמא היא שדה חובה';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateLoginInput;