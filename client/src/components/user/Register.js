import React, { useState } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { API } from '../../config';

const Register = props => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        errors: {},
        success: false,
        emailIsValid: false,
        passwordIsValid: false
    })

    const { name, email, password, confirm, errors, success, emailIsValid, passwordIsValid } = values;

    const emailChangeHandler = event => {
        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        if(!reg.test(event.target.value)) {
            setValues({...values, emailIsValid: false})
        }
        else{
            setValues({...values, emailIsValid: true})
        }
        setValues({...values, email: event.target.value})
    }

    const passwordChangeHandler = event => {
        if(event.target.value.length < 6 || event.target.value.length > 12 ) {
            setValues({...values, passwordIsValid: false})
        }
        else{
            setValues({...values, passwordIsValid: true})
        }
        setValues({...values, password: event.target.value})
    }

    const submitHandler = event => {
        event.preventDefault();
        signupHandler({name, email, password, confirm})
    }

    const signupHandler = user => {
        return axios.post(`${API}/register`, user)
        .then(response => {
            console.log(response.data);
            setValues({...values, errors: {}, success: true})
        })
        .catch(err => {
            setValues({...values, errors: err.response.data, success: false})
        })
    }

    const showForm = () => (
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
                        onChange={(event) => setValues({...values, name: event.target.value})}    
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
                        onChange={emailChangeHandler}    
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
                        onChange={passwordChangeHandler}
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
                        onChange={(event) => setValues({...values, confirm: event.target.value})}    
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
            {showForm()} 
        </div>
    )
}

export default Register;