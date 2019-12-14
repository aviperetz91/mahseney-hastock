import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/authActions';


const Register = props => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
    })

    const { name, email, password, confirm } = values;
    
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const [emailIsValid, setEmailIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if(isAuthenticated) {
            props.history.replace('/');
        }
    }, [isAuthenticated, props.history])

    const changeHandler = field => {
        return event => {
            setSuccess(false);
            setErrors({...errors, [field]: ''});
            if(field === 'email') {
                const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                if(!reg.test(event.target.value)) {
                    setEmailIsValid(false);
                }
                else{
                    setEmailIsValid(true);
                }
            }
            if(field === 'password') {
                if(event.target.value.length < 6 || event.target.value.length > 12 ) {
                    setPasswordIsValid(false);
                }
                else{
                    setPasswordIsValid(true);
                }
            }
            setValues({...values, [field]: event.target.value})
        }   
    }

    const submitHandler = event => {
        event.preventDefault();
        dispatch(authActions.register({name, email, password, confirm}))
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

    const showForm = (
        <div className="container d-flex justify-content-center">
            <form className="col-sm-12 col-md-6 col-lg-5">
                <div className="form-group">
                    <input 
                        className={classnames('form-control mt-3', {
                            'is-invalid' : errors.name
                        })} 
                        type="text"
                        placeholder="שם מלא" 
                        value={name}
                        onChange={changeHandler('name')}    
                    />
                    { errors.name ?
                        <div className="invalid-feedback"> {errors.name} </div>
                    : null } 
                </div>
                <div className="form-group">
                    <input  
                        className={classnames('form-control', {
                            'is-invalid' : errors.email
                        })}
                        type="email" 
                        placeholder="כתובת מייל" 
                        value={email}
                        onChange={changeHandler('email')}    
                    />
                    { errors.email ?
                        <div className="invalid-feedback"> {errors.email} </div>
                    : null } 
                    { !emailIsValid && !errors.email ?
                    <small className="text-muted p-2" >
                      כתובת חוקית, למשל - username@gmail.com
                    </small> : null }
                </div>
                <div className="form-group">
                    <input
                        className={classnames('form-control', {
                            'is-invalid' : errors.password
                        })}
                        type="password" 
                        placeholder="סיסמא" 
                        value={password}
                        onChange={changeHandler('password')}
                    />
                    { errors.password ?
                        <div className="invalid-feedback"> {errors.password} </div>
                    : null } 
                    { !passwordIsValid && !errors.password ?
                    <small className="text-muted p-2" >
                    הסיסמא צריכה להכיל בין 6-12 תווים
                    </small> : null }
                </div>
                <div className="form-group">
                    <input
                        className={classnames('form-control', {
                            'is-invalid' : errors.confirm
                        })}
                        type="password" 
                        placeholder="אמת סיסמא" 
                        value={confirm}
                        onChange={changeHandler('confirm')}    
                    />
                    { errors.confirm ?
                        <div className="invalid-feedback"> {errors.confirm} </div>
                    : null } 
                </div>
                <div className="mt-3">
                    <button className="btn btn-danger btn-block" onClick={submitHandler}>
                        הרשם
                    </button>
                </div>
            </form>
        </div>
    )
        
    
    return (
        <div className="container w-70 pt-3">
            <div className="d-flex justify-content-center align-items-cener">
                <h1 className="display-5 text-dark font-weight-bold">הרשמה</h1>
            </div>
            <hr />
            { success ?
            <div className="alert alert-success alert-dismissible fade show" role="alert">
            נרשמת בהצלחה! <Link className="alert-link" to='/login'>לחץ כאן</Link> כדי להתחבר.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div> 
             : null }
            {showForm}
        </div>
    )
}

export default withRouter(Register);