class User {
    constructor() {
        this.name = "";
        this.email = "";
        this.password = "";
        this.address = "";
        this.cartItems = [];
    }

    setUser(user) {
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.address = user.address
    }

    getCartItems() {
        return this.cartItems
    }

    setCartItem(item) {
        this.cartItems.push(item);
    }

}

export default new User();