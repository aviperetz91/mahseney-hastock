import React, { useState } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { API } from '../../config';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errors, setErrors] = useState({});

    const [emailIsValid, setEmailIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);

    const emailChangeHandler = event => {
        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        if(!reg.test(event.target.value)) {
            setEmailIsValid(false);
        }
        else{
            setEmailIsValid(true);
        }
        setEmail(event.target.value);
    }

    const passwordChangeHandler = event => {
        if(event.target.value.length < 6 || event.target.value.length > 12 ) {
            setPasswordIsValid(false);
        }
        else{
            setPasswordIsValid(true);
        }
        setPassword(event.target.value);
    }

    const submitHandler = event => {
        event.preventDefault();
        signupHandler({name, email, password, confirm})
    }

    const signupHandler = user => {
        return axios.post(`${API}/register`, user)
        .then(response => console.log(response.data))
        .catch(err => setErrors(err.response.data))
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
                        onChange={(event) => setName(event.target.value)}    
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
                    אנא הזן כתובת חוקית, למשל - username@gmail.com
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
                        onChange={(event) => setConfirm(event.target.value)}    
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
                <h1 className="display-5 text-dark font-weight-bold">כניסה למערכת</h1>
            </div>
            <hr />
            {showForm()} 
        </div>
    )
}

export default Register;