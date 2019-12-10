import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCategory } from '../../store/actions/categoriesActions';
import classnames from 'classnames';


const AddCategory = props => {

    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const { isAuthenticated, user} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!isAuthenticated || (isAuthenticated && user.role !== 1)) {
            props.history.replace('/login');
        }
    }, [isAuthenticated, props.history, user.role])

    const titleChangeHandler = (event) => {
        setErrors({});
        setSuccess(false);
        setTitle(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const category = { title: title }
        dispatch(createCategory(category, user._id))
        .then(data => {
            if(data._id) {
                setErrors({});
                setSuccess(true);
            }
            else {
                setErrors(data);
                setSuccess(false);
            }
        })
    }

    const newCategoryForm = (
        <div className="container d-flex justify-content-center">
            <form className="col-sm-12 col-md-6 col-lg-5 mt-3">
                <div className="form-group">
                    <input 
                        className={classnames('form-control', {
                            'is-invalid' : errors.title
                        })}
                        type="text" 
                        value={title} 
                        placeholder="הזן כותרת" 
                        onChange={titleChangeHandler}
                    />
                    { errors.title ?
                        <div className="invalid-feedback"> {errors.title} </div>
                    : null }
                </div>
                <button className="btn btn-block btn-outline-danger" onClick={submitHandler}> 
                    הוסף קטגוריה
                </button>
            </form>
        </div>
    )

    return (
        <div className="container w-70 pt-3">
            <div className="d-flex justify-content-center align-items-cener">
                <h1 className="display-5 text-dark font-weight-bold">הוסף קטגוריה</h1>
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
            {newCategoryForm} 
        </div>
    )
}

export default AddCategory;