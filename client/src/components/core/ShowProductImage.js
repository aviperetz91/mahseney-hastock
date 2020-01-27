import React from 'react';
import { API } from '../../config';

const ShowProductImage = ({productId}) => (
    <img
        src={`${API}/product/photo/${productId}`}
        style={{alignSelf:"center", maxHeight: "70%", maxWidth: "70%" }}
    ></img>
)

export default ShowProductImage;