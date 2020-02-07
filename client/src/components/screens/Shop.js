import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../core/Card';
import pricesRange from '../../constants/prices';

const Shop = () => {
    const categories = useSelector(state => state.categories.categories)
    const products = useSelector(state => state.products.products);
    const [filtered, setFiltered] = useState([]);
    // let filtered = {
    //     categories: [],
    //     price: []
    // };

    const filterByCategory = categoryId => {
        let byCategory = products.filter(product => {
            return product.category._id === categoryId;
        })
        setFiltered(byCategory)
    }

    const filterByPrice = priceRangeId => {
        console.log(filtered);
        let newfiltered = [];
        switch (priceRangeId) {
            case 0:
                newfiltered = filtered;
                setFiltered(newfiltered);
                break;
            case 1:
                filtered.forEach(product => {
                    if (product.price > 0 && product.price < 19.99) {
                        newfiltered.push(product);
                    }
                })
                setFiltered(newfiltered);
                break;
            case 2:
                filtered.forEach(product => {
                    if (product.price > 19.99 && product.price < 49.99) {
                        newfiltered.push(product)
                    }
                })
                setFiltered(newfiltered);
                break;
            case 3:
                filtered.forEach(product => {
                    if (product.price > 49.99 && product.price < 99.99) {
                        newfiltered.push(product)
                    }
                })
                setFiltered(newfiltered);
                break;
            case 4:
                filtered.forEach(product => {
                    if (product.price > 99.99 && product.price < 199.99) {
                        newfiltered.push(product)
                    }
                })
                setFiltered(newfiltered);
                break;
            case 5:
                filtered.forEach(product => {
                    if (product.price >= 199.99) ;
                })
                setFiltered(newfiltered);
                break;
            default:
                break;
        }
    }


    let displayRange = (range) => {
        if (range._id > 0) {
            return <div> <i className="fas fa-shekel-sign"></i> {range.name} </div>
        } else {
            return <div> {range.name} </div>
        }
    }

    return (
        <div className="p-3 row">
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
                                onChange={() => filterByCategory(category._id)}
                            ></input>
                            <label className="form-check-label" htmlFor={category._id}>
                                {category.title}
                            </label>
                        </div>
                    </div>
                ))}
                <div className="font-weight-bold mt-3 mb-2">סינון לפי מחיר</div>
                {pricesRange.map(range => (
                    <div className="list-unstyled" key={range._id}>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="price"
                                id={range._id}
                                onChange={() => filterByPrice(range._id)}
                            ></input>
                            <label className="form-check-label" htmlFor={range._id}>
                                {displayRange(range)}
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <div className="col-sm-0 col-md-9 col-lg-10">
                <div className="row">
                    {filtered.map(product => (
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




// const toggleCategoryHandler = (category) => {
//     // debugger;
//     const categoryIndex = selectedCategories.indexOf(category._id);
//     let categories = [...selectedCategories];
//     if (categoryIndex === -1) {
//         categories.push(category._id);
//     }
//     else {
//         categories.splice(categoryIndex, 1);
//     }
//     console.log(categories);
//     setSelectedCategories(categories);
//     filterByCategory(categories);
// }