import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../core/Card';

const Shop = () => {
    const categories = useSelector(state => state.categories.categories)
    const products = useSelector(state => state.products.products);
    const [selected, setSelected] = useState([]);

    const toggleCheckHandler = (category) => {
        // debugger;
        const selectIndex = selected.indexOf(category._id);
        let selectedCategories = [...selected];
        if (selectIndex === -1) {
            selectedCategories.push(category._id);
        }
        else {
            selectedCategories.splice(selectIndex, 1);
        }
        console.log(selectedCategories);
        setSelected(selectedCategories);
    }

    let filtered = [];
    for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < selected.length; j++) {
            if (products[i].category._id === selected[j]) {
                filtered.push(products[i]);
            }
        }
    }

    return (
        <div className="p-3 row">
            <div className="col-sm-12 col-md-12 col-lg-2">
                <div className="font-weight-bold mb-2">סינון לפי קטגוריה</div>
                {categories.map(category => (
                    <div className="list-unstyled" key={category._id}>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="category"
                                id={category._id}               
                                onChange={() => toggleCheckHandler(category)}
                            ></input>
                            <label className="form-check-label" htmlFor={category._id}>
                                {category.title}
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <div className="col-sm-0 col-md-0 col-lg-10">
                <div className="row">
                    {filtered.map(product => (
                        <div key={product._id} className="mb-3 col-sm-6 col-md-4 col-lg-3">
                            <Card
                                _id={product._id}
                                price={product.price}
                                title={product.title}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Shop;
