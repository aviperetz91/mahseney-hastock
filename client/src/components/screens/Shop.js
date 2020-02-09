import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../core/Card';
import pricesRange from '../../constants/prices';

const Shop = () => {
    const categories = useSelector(state => state.categories.categories)
    const products = useSelector(state => state.products.products);
    const [filters, setFilters] = useState({
        categoryId: "0",
        priceId: "0",
    })

    const displayRange = (price) => {
        if (price._id > 0) {
            return <div> <i className="fas fa-shekel-sign"></i> {price.name} </div>
        } else {
            return <div> {price.name} </div>
        }
    }

    const filterHandler = () => {
        // debugger;
        let byCategory = [...products];
        let byPrice = [];
        
        if (filters.categoryId === "0") {
            byCategory = [...products];
        }
        else {
            byCategory = products.filter((product) => product.category._id === filters.categoryId);
        }

        switch (filters.priceId) {
            case "0":
                byPrice = [...byCategory];
                break;
            case "1":
                byPrice = byCategory.filter((product => product.price > 0 && product.price <= 19.99));
                break;
            case "2":
                byPrice = byCategory.filter((product => product.price > 19.99 && product.price <= 49.99));
                break;
            case "3":
                byPrice = byCategory.filter((product => product.price > 49.99 && product.price <= 99.99));
                break;
            case "4":
                byPrice = byCategory.filter((product => product.price > 99.99 && product.price <= 199.99));
                break;
            case "5":
                byPrice = byCategory.filter((product => product.price > 199.99));
                break;
            default:
                break;
        }
        return byPrice;
    }

    return (
        <div className="p-3 row m-0">
            <div className="col-sm-12 col-md-3 col-lg-2 pl-5">
                <div className="font-weight-bold mb-2">סינון לפי קטגוריה</div>
                {categories.map(category => (
                    <div className="list-unstyled" key={category._id}>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="category"
                                id={category._id}
                                onChange={() => setFilters({...filters, categoryId: category._id})}
                            ></input>
                            <label className="form-check-label" htmlFor={category._id}>
                                {category.title}
                            </label>
                        </div>
                    </div>
                ))}
                <div className="font-weight-bold mt-3 mb-2">סינון לפי מחיר</div>
                {pricesRange.map(price => (
                    <div className="list-unstyled" key={price._id}>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="price"
                                id={price._id}
                                onChange={() => setFilters({...filters, priceId: price._id})}
                            ></input>
                            <label className="form-check-label" htmlFor={price._id}>
                                {displayRange(price)}
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <div className="col-sm-0 col-md-9 col-lg-10">
                {/* {JSON.stringify(filters, null, 2)} */}
                <div className="row">
                    {filterHandler().map(product => (
                        <div key={product._id} className="mb-3 col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2">
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