import React, { useState } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { API } from '../../config';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});


    const submitHandler = event => {
        event.preventDefault();
        loginHandler({ email, password })
    }

    const loginHandler = user => {
        return axios.post(`${API}/login`, user)
        .then(response => console.log(response.data))
        .catch(err => setErrors(err.response.data))
    }

    const showForm = () => (
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
                        onChange={(event) => setEmail(event.target.value)}    
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
                        onChange={(event) => setPassword(event.target.value)}
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
            {showForm()} 
        </div>
    )
}

export default Register;