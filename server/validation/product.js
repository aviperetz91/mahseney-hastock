const validator = require('validator');
const isEmpty = require('../validation/is-empty');


const validateProductInput = (data, file) => {
    let errors = {};

    data.category = !isEmpty(data.category) ? data.category : '';
    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.price = !isEmpty(data.price) ? data.price : '';
    data.quantity = !isEmpty(data.quantity) ? data.quantity : '';
    data.shipping = !isEmpty(data.shipping) ? data.shipping : '';


    if(isEmpty(file)) {
        errors.photo = 'חובה לבחור תמונה';
    }

    if(validator.isEmpty(data.category)) {
        errors.category = 'חובה לבחור קטגוריה';
    }

    if(!validator.isLength(data.title, { min: 2, max: 30 })) {
        errors.title = 'שם המוצר חייב להכיל בין 2-30 תווים';
    }

    if(validator.isEmpty(data.title)) {
        errors.title = 'שם מוצר הוא שדה חובה';
    }

    if(!validator.isLength(data.description, { min: 0, max: 200 })) {
        errors.description = 'תיאור המוצר לא יכול להכיל יותר מ - 200 תווים';
    }

    if(!validator.isNumeric(data.price)) {
        errors.price = 'שדה זה חייב להכיל מספר';
    }
    
    if(validator.isEmpty(data.price)) {
        errors.price = 'מחיר הוא שדה חובה';
    }

    if(!validator.isNumeric(data.quantity)) {
        errors.quantity = 'שדה זה חייב להכיל מספר';
    }
    
    if(validator.isEmpty(data.quantity)) {
        errors.quantity = 'כמות הוא שדה חובה';
    }

    if(validator.isEmpty(data.shipping)) {
        errors.shipping = 'חובה לבחור אם קיים משלוח או לא';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateProductInput;