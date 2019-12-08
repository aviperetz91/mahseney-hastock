import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

const AdminDashboard = props => {

    const auth = useSelector(state => state.auth);
    const { isAuthenticated, user} = auth

    useEffect(() => {
        if(!isAuthenticated || (isAuthenticated && user.role !== 1)) {
            props.history.replace('/login');
        }
    }, [isAuthenticated, props.history, user.role])

    const adminLinks = () => (
        <div className="card">
            <h3 className="card-header">אפשרויות</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link" to='/create/category'>צור קטגוריה</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to='/create/product'>הוספת מוצר</Link>
                </li>
            </ul>
        </div>
    )

    const adminInfo = () => (
        <div className="card">
            <h3 className="card-header">פרטי חשבון</h3>
            <ul className="list-group">
                <li className="list-group-item">שם: {user.name} </li>
                <li className="list-group-item">אימייל: {user.email} </li>
                <li className="list-group-item">מנהל</li>
            </ul>
        </div>
    )
    
    return (
        <div>
            <div className="jumbotron jumbotron-fluid p-4">
                <div className="container">
                    <h1 className="display-5"> {user.name} </h1>
                    <p className="lead">פרטי משתמש ואפשרויות ניהול</p>
                </div>
            </div>

            <div className="container">
                <div className="row mb-3">
                    <div className="col-sm-5 col-md-4 col-lg-3 mb-3">
                        {adminLinks()}
                    </div>
                    <div className="col-sm-7 col-md-8 col-lg-9">
                        {adminInfo()}
                    </div>
                </div>   
            </div>
        </div>
    )
}   

export default withRouter(AdminDashboard);