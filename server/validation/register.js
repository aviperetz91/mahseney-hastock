const validator = require('validator');
const isEmpty = require('../validation/is-empty');


const validateRegisterInput = data => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirm = !isEmpty(data.confirm) ? data.confirm : '';

    if(!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'השם יכול להכיל בין 2-30 תווים';
    }

    if(validator.isEmpty(data.name)) {
        errors.name = 'שם הוא שדה חובה';
    }

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

    if(!validator.equals(data.password, data.confirm)) {
        errors.confirm = 'הסיסמאות חייבות להתאים';
    }

    if(validator.isEmpty(data.confirm)) {
        errors.confirm = 'אימות סיסמא הוא שדה חובה';
    }

    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateRegisterInput;