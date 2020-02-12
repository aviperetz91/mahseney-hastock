import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

const UserDashboard = props => {

    const auth = useSelector(state => state.auth);
    const { isAuthenticated, user} = auth

    useEffect(() => {
        if(!isAuthenticated || (isAuthenticated && user.role === 1)) {
            props.history.replace('/login');
        }
    }, [isAuthenticated, props.history, user.role])

    const userLinks = (
        <div className="card">
            <h4 className="card-header">אפשרויות</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link" to='/cart'>העגלה שלי</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to='/profile/update'>עדכון פרופיל</Link>
                </li>
            </ul>
        </div>
    )

    const userInfo = (
        <div className="card">
            <h4 className="card-header">פרטי חשבון</h4>
            <ul className="list-group">
                <li className="list-group-item">שם: {user.name} </li>
                <li className="list-group-item">אימייל: {user.email} </li>
                <li className="list-group-item">משתמש רשום</li>
            </ul>
        </div>
    )

    const ordersHistory = (
        <div className="card">
            <h4 className="card-header">ההזמנות שלי</h4>
            <ul className="list-group">
                <li className="list-group-item">מוצרים...</li>
            </ul>
        </div>
    )
    
    return (
        <div>
            <div className="container">
                <div className="jumbotron jumbotron-fluid p-4 mb-4 rounded">
                    <h1 className="display-5"> {user.name} </h1>
                    <p className="lead">פרטי משתמש ורשימת הזמנות</p>
                </div>
            </div>

            <div className="container">
                <div className="row mb-3">
                    <div className="col-sm-5 col-md-4 col-lg-3 mb-3">
                        {userLinks}
                    </div>
                    <div className="col-sm-7 col-md-8 col-lg-9">
                        {userInfo}
                    </div>
                </div>
                <div className="mb-3">
                    {ordersHistory}
                </div>   
            </div>
        </div>
    )
}   

export default withRouter(UserDashboard);