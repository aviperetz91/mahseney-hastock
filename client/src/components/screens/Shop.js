import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../core/Card';

const Shop = () => {
    const categories = useSelector(state => state.categories.categories)
    const products = useSelector(state => state.products.products);
    const [selected, setSelected] = useState("");

    let displayProducts = (
        <div>LOADING....</div>
    )

    if(products.length > 0) {
        let filterd = products.filter(product => {
            return product.category.title === selected
        })
        
        displayProducts = (
            // <div className="container">
                <div className="row">
                {filterd.map(product => (
                        <div key={product._id} className="mb-3 col-sm-6 col-md-4 col-lg-3">
                            <Card
                                _id={product._id}
                                price={product.price}
                                title={product.title}
                            />
                        </div>
                ))}
                </div>
            // </div>
        )
    }

    return (
        <div className="p-3 row">
            <div className="col-sm-12 col-md-12 col-lg-2">
                {categories.map(category => (
                    <div className="list-group-item" key={category._id}>
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="radio" name="category"
                                id={category._id} value={category.title}
                                // checked
                                onChange={(e) => {
                                    setSelected(e.target.value)
                                }}
                            ></input>
                            <label className="form-check-label" htmlFor={category._id}>
                                {category.title}
                            </label>
                        </div>
                    </div>
                ))}
            </div>   
            <div className="col-sm-0 col-md-0 col-lg-10">
                {displayProducts}
            </div>
        </div>
    )
}

export default Shop;
