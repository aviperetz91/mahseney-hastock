const validator = require('validator');
const isEmpty = require('../validation/is-empty');


const validateProductInput = data => {
    let errors = {};

    data.category = !isEmpty(data.category) ? data.category : '';
    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.price = !isEmpty(data.price) ? data.price : '';
    data.quantity = !isEmpty(data.quantity) ? data.quantity : '';
    data.shipping = !isEmpty(data.shipping) ? data.shipping : '';

    if(validator.isEmpty(data.category)) {
        errors.category = 'Category field is required';
    }

    if(!validator.isLength(data.title, { min: 2, max: 30 })) {
        errors.title = 'Title must be between 2 and 30 characters';
    }

    if(validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if(!validator.isLength(data.description, { min: 6, max: 200 })) {
        errors.description = 'Description must be between 6 and 200 characters';
    }

    if(validator.isEmpty(data.description)) {
        errors.description = 'Description field is required';
    }

    if(!validator.isNumeric(data.price)) {
        errors.price = 'Price must be a number';
    }
    
    if(validator.isEmpty(data.price)) {
        errors.price = 'Price field is required';
    }

    if(!validator.isNumeric(data.quantity)) {
        errors.quantity = 'Quantity must be a number';
    }
    
    if(validator.isEmpty(data.quantity)) {
        errors.quantity = 'Quantity field is required';
    }

    if(validator.isEmpty(data.shipping)) {
        errors.shipping = 'Shipping field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateProductInput;