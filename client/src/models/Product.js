class Product {
    constructor(category, id, title, description, photo, price, quantity, sold, shipping, createdAt, updatedAt) {
        this.category = category;
        this._id = id;
        this.title = title;
        this.description = description;
        this.photo = photo;
        this.price = price;
        this.quantity = quantity;
        this.sold = sold;
        this.shipping = shipping;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
} 

export default Product;