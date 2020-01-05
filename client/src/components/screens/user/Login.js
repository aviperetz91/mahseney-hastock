import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import * as authActions from '../../../store/actions/authActions';


const Login = props => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const { email, password } = values;

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


    useEffect(() => {
        if(isAuthenticated) {
            props.history.replace('/');
        }
    }, [isAuthenticated, props.history])

    const emailChangeHandler = event => {
        setErrors({...errors, email: ''});
        setValues({...values, email: event.target.value})
    }

    const passwordChangeHandler = event => {
        setErrors({...errors, password: ''});
        setValues({...values, password: event.target.value})
    }

    const submitHandler = event => {
        event.preventDefault();
        dispatch(authActions.login({ email, password }))
        .then(data => {
            if(data._id) {
                setErrors({});  
            }
            else {
                setErrors(data);
            }
        })
    }

    const showForm = (
        <div className="container d-flex justify-content-center">
            <form className="col-sm-12 col-md-6 col-lg-5">
                <div className="form-group">
                    <input  
                        className={classnames('form-control mt-3', {
                            'is-invalid' : errors.email
                        })}
                        type="email" 
                        placeholder="כתובת מייל" 
                        value={email}
                        onChange={emailChangeHandler}    
                    />
                    { errors.email ?
                        <div className="invalid-feedback"> {errors.email} </div>
                    : null }
                </div>
                <div className="form-group">
                    <input
                        className={classnames('form-control', {
                            'is-invalid' : errors.password
                        })}
                        type="password" 
                        placeholder="סיסמא" 
                        value={password}
                        onChange={passwordChangeHandler}
                    />
                    { errors.password ?
                        <div className="invalid-feedback"> {errors.password} </div>
                    : null }
                </div>
                <div className="mt-3">
                    <button className="btn btn-danger btn-block" onClick={submitHandler}>
                        התחבר
                    </button>
                </div>
            </form>
        </div>
    )

    
    return (
        <div className="container w-70 pt-3">
            <div className="d-flex justify-content-center align-items-cener">
                <h1 className="display-5 text-dark font-weight-bold">התחברות</h1>
            </div>
            <hr />
            {showForm} 
        </div>
    )
}

export default withRouter(Login);