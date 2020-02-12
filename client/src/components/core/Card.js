import React from 'react';
import ShowProductImage from './ShowProductImage';

const Card = props => {
    return (
        <div className="card shadow bg-black rounded" style={{ borderColor: '#ccc' }}>
            <div style={{paddingTop: 1, paddingBottom: 1, fontSize: 15}} className="card-header text-center"> {props.title} </div>
            <ShowProductImage productId={props._id} />
            <hr style={{ margin: 0, padding: 0, backgroundColor: '#ccc' }} />
            <div className="card-body" style={{ padding: 3, paddingTop: 15, paddingBottom: 15 }}>
                <h6 className="card-subtitle mb-2 text-center font-weight-bold"> {props.price} <i className="fas fa-shekel-sign"></i></h6>
                <div className="d-flex justify-content-around">
                    <button style={{fontSize: 13, padding: 3}} className="btn btn-outline-danger btn-sm">קנה עכשיו</button>
                    <button style={{fontSize: 13, padding: 3}} className="btn btn-outline-secondary btn-sm">הוסף לעגלה</button>
                </div>
            </div>
        </div>
    )
}

export default Card;