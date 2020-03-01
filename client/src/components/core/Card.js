import React, { useState } from 'react';
import ShowProductImage from './ShowProductImage';
import { addItem } from '../../utils/CartLogic';

const Card = ({product}) => {
    // const [redirect, setRedirect] = useState(false);
    
    const showStock = quantity => {
        if (quantity > 0) {
            return  <span className="badge badge-success padge-pill">קיים במלאי</span>
        }
        return  <span className="badge badge-danger badge-pill">אזל במלאי</span>
    }

    const addToCart = () => {
        addItem(product, () => {
            // setRedirect(true);
            console.log("Product added to the cart")
        })
    }

    return (
        <div className="card shadow bg-black rounded" style={{ borderColor: '#ccc' }}>
            <div style={{paddingTop: 1, paddingBottom: 1, fontSize: 15}} className="card-header text-center"> {product.title} </div>
            <ShowProductImage productId={product._id} />
            <div className="text-center">{ showStock(product.quantity) }</div>
            <hr style={{ margin: 0, padding: 0, backgroundColor: '#ccc' }} />
            <div className="card-body" style={{ padding: "15px 1px" }}>
                <h6 className="card-subtitle mb-2 text-center font-weight-bold"> {product.price} <i className="fas fa-shekel-sign"></i></h6>
                <div className="d-flex justify-content-around">
                    <button 
                        style={{fontSize: 13, padding: 3}} 
                        className="btn btn-outline-info btn-sm"
                    >
                        קנה עכשיו
                    </button>
                    <button 
                        style={{fontSize: 13, padding: 3}} 
                        className="btn btn-outline-dark btn-sm"
                        onClick={addToCart}
                    >
                        הוסף לעגלה
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;