export const addItem = (item, next) => {
    let cart = []
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        if(!cart.find(product => product._id === item._id)) {
            cart.push({
                ...item,
                count: 1
            })
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
}