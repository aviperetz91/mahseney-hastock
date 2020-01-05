import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct } from '../../../store/actions/productsActions';
import classnames from 'classnames';


const AddProduct = props => {

    const [productData, setProductData] = useState({  
        title: '',
        description: '',
        photo: '',
        price: '',
        category: '',
        quantity: '',
        shipping: '',
        formData: ''
    })

    const { title, description, price, quantity, formData } = productData;

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const { isAuthenticated, user} = useSelector(state => state.auth);
    const categories = useSelector(state => state.categories.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!isAuthenticated || (isAuthenticated && user.role !== 1)) {
            props.history.replace('/login');
        }
        setProductData({...productData, formData: new FormData()})
    }, [isAuthenticated, props.history, user.role])

    const changeHandler = field => {
        return event => {
            setSuccess(false);
            setErrors({...errors, [field]: ''});
            const value = field === 'photo' ? event.target.files[0] : event.target.value;
            formData.set(field, value);
            setProductData({...productData, [field]: value})
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        // const product = { photo, category, title, description, price, quantity, shipping }
        dispatch(createProduct(formData, user._id))
        .then(data => {
            if(data._id) {
                setErrors({});
                setSuccess(true);
                setProductData({
                    ...productData,
                    title: '',
                    description: '',
                    photo: '',
                    price: '',
                    category: '',
                    quantity: '',
                    shipping: '',
                })
            }
            else {
                setErrors(data);
                setSuccess(false);
            }
        })
    }

    const newProductForm = (
        <div className="container d-flex justify-content-center">
            <form className="col-sm-12 col-md-6 col-lg-5 mt-3">
                <div className="custom-file">
                    <input
                        style={{cursor: 'pointer' }} 
                        className={classnames('form-control', {
                            'is-invalid' : errors.photo
                        })}
                        type="file"  
                        name="photo"
                        accept="image/*"
                        onChange={changeHandler('photo')}
                    />
                    
                    { errors.photo ?
                        <div className="invalid-feedback"> {errors.photo} </div>
                    : null }
                </div>
                <div className="form-group">
                    <select 
                        className={classnames('form-control mt-3', {
                            'is-invalid' : errors.category
                        })}
                        onChange={changeHandler('category')}
                    >
                        <option>בחר קטגוריה</option>
                        { categories ?
                        categories.map((category, index) => (
                            <option key={index} value={category._id}>
                                {category.title}
                            </option>
                            )
                        ) : null }
                    </select>
                    { errors.category ?
                        <div className="invalid-feedback"> {errors.category} </div>
                    : null }
                </div>
                <div className="form-group">
                    <input 
                        className={classnames('form-control', {
                            'is-invalid' : errors.title
                        })}
                        type="text" 
                        value={title} 
                        placeholder="שם המוצר" 
                        onChange={changeHandler('title')}
                    />
                    { errors.title ?
                        <div className="invalid-feedback"> {errors.title} </div>
                    : null }
                </div>
                <div className="form-group">
                    <textarea 
                        className={classnames('form-control', {
                            'is-invalid' : errors.description
                        })}
                        type="text" 
                        value={description} 
                        placeholder="תיאור המוצר" 
                        onChange={changeHandler('description')}
                    />
                    { errors.description ?
                        <div className="invalid-feedback"> {errors.description} </div>
                    : null }
                </div>
                <div className="form-group">
                    <input 
                        className={classnames('form-control', {
                            'is-invalid' : errors.price
                        })}
                        type="number" 
                        value={price} 
                        placeholder="מחיר המוצר" 
                        onChange={changeHandler('price')}
                    />
                    { errors.price ?
                        <div className="invalid-feedback"> {errors.price} </div>
                    : null }
                </div>
                <div className="form-group">
                    <input 
                        className={classnames('form-control', {
                            'is-invalid' : errors.quantity
                        })}
                        type="number" 
                        value={quantity} 
                        placeholder="כמות במלאי" 
                        onChange={changeHandler('quantity')}
                    />
                    { errors.quantity ?
                        <div className="invalid-feedback"> {errors.quantity} </div>
                    : null }
                </div>
                <div className="form-group">
                    <select
                        className={classnames('form-control', {
                            'is-invalid' : errors.shipping
                        })}
                        onChange={changeHandler('shipping')}
                    >
                        <option>משלוח</option>
                        <option value="1">כן</option>
                        <option value="0">לא</option>
                    </select> 
                    { errors.shipping ?
                        <div className="invalid-feedback"> {errors.shipping} </div>
                    : null }
                </div>
                <button className="btn btn-block btn-danger" onClick={submitHandler}> 
                    הוסף מוצר
                </button>
                {/* <button className="btn btn-block btn-outline-danger" 
                    onClick={(e) => {
                        e.preventDefault()
                        console.log(errors);
                    }}> 
                    בדיקה
                </button> */}
            </form>
        </div>
    )

    return (
        <div className="container w-70 pt-3">
            <div className="d-flex justify-content-center align-items-cener">
                <h1 className="display-5 text-dark font-weight-bold">הוספת מוצר</h1>
            </div>
            <hr />
            { success ? 
            <div className="alert alert-success alert-dismissible fade show" role="alert">
            הוספת את המוצר בהצלחה
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div> 
            : null }
            {newProductForm} 
        </div>
    )
}

export default AddProduct;