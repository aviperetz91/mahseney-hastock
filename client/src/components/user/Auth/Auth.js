import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const Register = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(false);

    const emailChangeHandler = event => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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

    const registerForm = () => (
        <Container style={{display: 'flex', justifyContent: 'center'}}>
            <Form style={{width: 350, paddingTop: 24}}>
                <Form.Group>
                    <Form.Control
                        style={{padding: 20, fontSize: 18}} 
                        type="email" 
                        placeholder="כתובת מייל" 
                        value={email}
                        onChange={(event) => emailChangeHandler(event)}    
                    />
                    { !emailIsValid && isSignup ?
                    <Form.Text style={{fontStyle: 'italic', padding: 5}} className="text-muted">
                    אנא הזן כתובת חוקית, למשל - username@gmail.com
                    </Form.Text> : null }
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        style={{padding: 20, fontSize: 18}} 
                        type="password" 
                        placeholder="סיסמא" 
                        value={password}
                        onChange={(event) => passwordChangeHandler(event)}
                    />
                    { !passwordIsValid && isSignup ?
                    <Form.Text style={{fontStyle: 'italic', padding: 5}} className="text-muted">
                    הסיסמא צריכה להכיל בין 6-12 תווים
                     </Form.Text> : null }
                </Form.Group>
                <div style={{marginTop: 30}}>
                    <Button 
                        style={{boxShadow: 'none', padding: 7}} 
                        variant="danger" 
                        block
                    >
                        {isSignup ? 'הרשם' : 'התחבר'}
                    </Button>
                    <Button
                        style={{boxShadow: 'none', padding: 7}} 
                        variant="warning"
                        block
                        onClick={(e) => {
                            e.preventDefault();
                            const toggle = !isSignup;
                            setIsSignup(toggle);
                        }}
                    >
                        {isSignup ? 'רשום? עבור למצב התחברות' : 'משתמש חדש? עבור למצב הרשמה'}
                    </Button>
                </div>
            </Form>
        </Container>
    )

    return (
        <Container style={{paddingTop: 24}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h1 style={{fontWeight: '600', color: '#232323', fontSize: 40}}>כניסה למערכת</h1>
            </div>
            <hr />
            {registerForm()} 
        </Container>
    )
}

export default Register;




// import React, { useState } from 'react';

// const Register = () => {
//     const [isSignup, setIsSignup] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const registerForm = () => (
//         <div style={{display: 'flex', justifyContent:'center', padding: 32 }}>
//             <form style={{width: 350}}>
//                 <div style={{display: 'block'}} className="form-group">
//                     <input type="text" className="form-control" id="InputName" placeholder="שם מלא"/>
//                 </div>
//                 <div style={{display: 'block'}} className="form-group">
//                     <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="כתובת חוקית"/>
//                     <small id="emailHelp" className="form-text text-muted">אנא הזן כתובת חוקית, למשל - username@gmail.com</small>
//                 </div>
//                 <div style={{display: 'block'}} className="form-group">
//                     <input type="password" className="form-control" id="inputPassword" placeholder="סיסמא"/>
//                     <small id="emailHelp" className="form-text text-muted">הסיסמא צריכה להכיל 6-12 תווים.</small>
//                 </div>
//                 <button type="submit" className="btn btn-danger btn-block">
//                     {isSignup ? 'הרשם' : 'התחבר'}
//                 </button>
//                 <button style={{outline: 'none'}} onClick={(e) => {
//                     e.preventDefault();
//                     const toggle = !isSignup;
//                     setIsSignup(toggle);
//                 }} 
//                 className="btn btn-warning btn-block">
//                     {isSignup ? 'רשום? עבור למצב התחברות' : 'משתמש חדש? עבור למצב הרשמה'} 
//                 </button>
//             </form>
//         </div>
//     )

//     return (
//         <div>
//             {registerForm()} 
//         </div>
//     )
// }

// export default Register;