import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { API } from '../../../config';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    

    const toggleMode = event => {
        event.preventDefault();
        const toggle = !isSignup;
        setIsSignup(toggle);
    }

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
        if(isSignup) {
            signupHandler({name, email, password, confirm})
        }
    }

    const signupHandler = user => {
        axios.post(`${API}/register`, user)
        .then(response => { return response.json()} )
        .catch(err => console.log(err))
    }

    const registerForm = () => (
        <Container style={{display: 'flex', justifyContent: 'center'}}>
            <Form style={{width: 350, paddingTop: 18}}>
                <Form.Group>
                    {isSignup ? 
                    <Form.Control
                        style={{padding: 20, fontSize: 18}} 
                        type="text" 
                        placeholder="שם מלא" 
                        value={name}
                        onChange={(event) => setName(event.target.value)}    
                    /> : null }
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        style={{padding: 20, fontSize: 18}} 
                        type="email" 
                        placeholder="כתובת מייל" 
                        value={email}
                        onChange={emailChangeHandler}    
                    />
                    { !emailIsValid && isSignup ?
                    <Form.Text style={{padding: 5}} className="text-muted">
                    אנא הזן כתובת חוקית, למשל - username@gmail.com
                    </Form.Text> : null }
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        style={{padding: 20, fontSize: 18}} 
                        type="password" 
                        placeholder="סיסמא" 
                        value={password}
                        onChange={passwordChangeHandler}
                    />
                    { !passwordIsValid && isSignup ?
                    <Form.Text style={{padding: 5}} className="text-muted">
                    הסיסמא צריכה להכיל בין 6-12 תווים
                     </Form.Text> : null }
                </Form.Group>
                <Form.Group>
                    {isSignup ? 
                    <Form.Control
                        style={{padding: 20, fontSize: 18}} 
                        type="password" 
                        placeholder="אמת סיסמא" 
                        value={confirm}
                        onChange={(event) => setConfirm(event.target.value)}    
                    /> : null }
                </Form.Group>
                <div style={{marginTop: 30}}>
                    <Button 
                        style={{boxShadow: 'none', padding: 7}} 
                        variant="danger" 
                        block
                        onClick={submitHandler}
                    >
                        {isSignup ? 'הרשם' : 'התחבר'}
                    </Button>
                    <Button
                        style={{boxShadow: 'none', padding: 7}} 
                        variant="warning"
                        block
                        onClick={toggleMode}
                    >
                        {isSignup ? 'רשום? עבור למצב התחברות' : 'משתמש חדש? עבור למצב הרשמה'}
                    </Button>
                </div>
            </Form>
        </Container>
    )

    return (
        <Container style={{paddingTop: 18}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h1 style={{fontWeight: '600', color: '#232323', fontSize: 40}}>כניסה למערכת</h1>
            </div>
            <hr />
            {registerForm()} 
        </Container>
    )
}

export default Register;