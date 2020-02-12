import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as authActions from '../../store/actions/authActions';

// import logo from '../../images/logo.jpg';
import logo_big from '../../images/logo_big.jpg';
import { FaBars } from 'react-icons/fa';
import colors from '../../constants/colors';


const isActive = (history, path) => {
    const style = {
        color: '#454545', 
        fontSize: 16, 
        margin: '0 15px',
        padding: '6px 5px',
        fontWeight: 'bold'
    }
    if(history.location.pathname === path) {
        style.borderBottom = '2px solid #c3262f';
        return style;
    }
    else {
        return style;
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
                <Link style={isActive(props.history, '/login')} className="nav-link" to='/login' data-toggle="collapse" data-target="#navbarSupportedContent">התחברות</Link>
            </li>
            <li className="nav-item">
                <Link style={isActive(props.history, '/register')} className="nav-link" to='/register' data-toggle="collapse" data-target="#navbarSupportedContent">הרשמה</Link>
            </li> 
        </ul>
    )

    if(isAuthenticated) {
        authLinks = (
            <ul className="navbar-nav">   
                <li className="nav-item">
                    <span className="nav-link" style={isActive(props.history, '/login')} onClick={logoutHandler}>
                        {/* מחובר/ת בתור <span style={{textDecoration: 'underline'}}>{user.name}</span>,  */}
                        <span style={{cursor: 'pointer'}} data-toggle="collapse" data-target="#navbarSupportedContent"> התנתק </span>
                    </span>
                </li> 
            </ul> 
        )
    }

    return (
        <nav style={{backgroundColor: "white", paddingTop: 4, paddingBottom: 4}} className="navbar navbar-expand-lg navbar-light container">
            <a className="navbar-brand media" href="/">
                <img src={logo_big} style={{width: 150}} alt="logo"></img>
            </a>
            <button style={{borderColor: 'transparent'}} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <FaBars size={25} color='white'/>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link style={isActive(props.history, '/')} className="nav-link" to='/' data-toggle="collapse" data-target="#navbarSupportedContent">ראשי <span className="sr-only"></span></Link>
                    </li>
                    { isAuthenticated && user.role === 1 ?
                    <li className="nav-item">
                        <Link style={isActive(props.history, '/admin/dashboard')} className="nav-link" to='/admin/dashboard' data-toggle="collapse" data-target="#navbarSupportedContent"> תפריט ניהול </Link>
                    </li> : null }
                    { isAuthenticated && user.role === 0 ? 
                    <li className="nav-item">
                        <Link style={isActive(props.history, '/user/dashboard')} className="nav-link" to='/user/dashboard' data-toggle="collapse" data-target="#navbarSupportedContent"> חשבון </Link>
                    </li> : null }
                    <li className="nav-item">
                        <Link style={isActive(props.history, '/shop')} className="nav-link" to='/shop' data-toggle="collapse" data-target="#navbarSupportedContent"> חנות </Link>
                    </li> 
                </ul>
                {authLinks}
            </div>
        </nav>
    )
}


export default withRouter(Toolbar);
