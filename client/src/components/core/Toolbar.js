import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as authActions from '../../store/actions/authActions';

import logo from '../../images/logo.jpg';
import { FaBars } from 'react-icons/fa';
import colors from '../../constants/colors';


const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return { color: 'white', fontWeight: 'bold' }
    }
    else {
        return { color: '#eee' }
    }
}

const Toolbar = props => {

    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const { isAuthenticated, user } = auth;

    const logoutHandler = event => {
        event.preventDefault();
        dispatch(authActions.logout())
    }

    let authLinks = (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link style={isActive(props.history, '/login')} className="nav-link" to='/login'>התחברות</Link>
            </li>
            <li className="nav-item">
                <Link style={isActive(props.history, '/register')} className="nav-link" to='/register'>הרשמה</Link>
            </li> 
        </ul>
    )

    if(isAuthenticated) {
        authLinks = (
            <ul className="navbar-nav">   
                <li className="nav-item">
                    <span className="nav-link" style={{color: '#eee'}} onClick={logoutHandler}>
                        {/* מחובר/ת בתור <span style={{textDecoration: 'underline'}}>{user.name}</span>,  */}
                        <span style={{cursor: 'pointer'}}> התנתק </span>
                    </span>
                </li> 
            </ul> 
        )
    }

    return (
        <nav style={{backgroundColor: colors.main}} className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="/">
                <img src={logo} style={{width: 220}} alt="logo"></img>
            </a>
            <button style={{borderColor: 'transparent'}} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <FaBars size={25} color='white'/>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link style={isActive(props.history, '/')} className="nav-link" to='/'>ראשי <span className="sr-only"></span></Link>
                    </li>
                    <li className="nav-item">
                        <Link style={isActive(props.history, '/user/dashboard')} className="nav-link" to='user/dashboard'> החשבון שלי </Link>
                    </li>
                </ul>
                {authLinks}
            </div>
        </nav>
    )
}


export default withRouter(Toolbar);
