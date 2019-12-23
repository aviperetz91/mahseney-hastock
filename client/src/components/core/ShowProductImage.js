import React from 'react';
import { API } from '../../config';

const ShowProductImage = ({productId}) => (
    <img
        src={`${API}/product/photo/${productId}`}
        style={{alignSelf:"center", maxHeight: "80%", maxWidth: "80%" }}
    ></img>
)

export default ShowProductImage;