import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import logo_big from '../../images/logo_big.jpg';
import Card from '../core/Card';
import Carousel from '../core/Carousel';


const Home = () => {

    const productsBySell = useSelector(state => state.products.productsBySell);
    const productsByArrival = useSelector(state => state.products.productsByArrival);

    return (
        <div>
            <Carousel />
            {/* <div style={{ backgroundColor: "white" }} className="jumbotron jumbotron-fluid pt-5 pb-3 m-0">
                <div className="container">
                    <h3 className="font-weight-bold text-center">
                        ברוכים הבאים למחסני הסטוק - כל מה שצריך לבית!
                    </h3>
                    <hr />
                    <div className="row justify-content-center">
                        <div className="col-sm-12 col-lg-4 text-center">
                            <img style={{ width: 250 }} src={logo_big} alt="logo_big"></img>
                        </div>
                        <div className="col-sm-12 col-lg-8 pt-3">
                            בסניפים של חברת מחסני הסטוק תוכלו למצוא מגוון של מוצרים לצריכה יומיומית למשפחה ולבית במחירים זולים במיוחד. החל מכלי בית, כלי מטבח ואפייה, מוצרים חד פעמיים, ריהוט ואביזרי נוי, צעצועים, מוצרי חשמל, מוצרי ניקיון, טקסטיל לבית, כלי עבודה לבית ולגינה, משחקים לכל הגילאים ועוד... בואו להינות מחווית הקניה במחסני הסטוק שמתחילה בשירות אדיב ומקצועי במתן פתרונות ומענה לכלל הצרכים של הלקוחות בסניף. במחסני הסטוק הדגש הוא על המחיר, אנו מאמינים שכל אחד יוכל למצוא במחסני הסטוק את מבוקשו לפי תקציבו האישי. אנו במחסני הסטוק דואגים לחדש באופן מתמיד ורציף את המוצרים בסניפים בכל המחלקות ובכך שומרים על מגוון עשיר של מוצרי צריכה במחירי סטוק שמאופיינים במחירים זולים ונמוכים במיוחד. מחסני הסטוק - מוצרים גדולים במחירים קטנים!
                        </div>
                    </div>
                </div>
            </div> */}
            <div style={{ paddingTop: 25, paddingBottom: 25 }}>
                <div className="container">
                    <h3 className="font-weight-bold">מוצרים מובילים</h3>
                    {/* <hr style={{ width: 100, height: 1, backgroundColor: "#c3262f" }} /> */}
                    <div className="row justify-content-center mt-4">
                        {productsBySell.map((product => (
                            <div key={product._id} className="mb-3 col-6 col-sm-6 col-md-4 col-lg-2">
                                <Card
                                    _id={product._id}
                                    price={product.price}
                                    title={product.title}
                                />
                            </div>
                        )))}
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: 25, paddingBottom: 25 }}>
                <div className="container">
                    <h3 className="font-weight-bold">חדש בחנות</h3>
                    {/* <hr style={{ width: 100, height: 1, backgroundColor: "#c3262f" }} /> */}
                    <div className="row justify-content-center mt-4">
                        {productsByArrival.map((product => (
                            <div key={product._id} className="mb-3 col-6 col-sm-6 col-md-4 col-lg-2">
                                <Card
                                    _id={product._id}
                                    price={product.price}
                                    title={product.title}
                                />
                            </div>
                        )))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;