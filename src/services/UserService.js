import User from "./User";


class UserService {
    constructor() {
        this.loggedInUser = null;
        this.cartItems = [];
    }

    setUser(user) {
        var signedUpUser = new User(user.name, user.email, user.password, user.address);
        localStorage.setItem("loggedInUser", JSON.stringify(signedUpUser));
    }

    getUser() {
        return this.loggedInUser;
    }

    signOutUser(){
        this.loggedInUser = null;
    }

    checkUser(loginUser) {
        console.log(loginUser);
        var signedUpUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (signedUpUser === null || loginUser.email != signedUpUser.email) {
            return "User Does Not Exists. Sign Up First!"
        }
        else if (loginUser.password != signedUpUser.password) {
            return "Wrong Creds!";
        }
        console.log("Checked!")
        this.loggedInUser = signedUpUser;
        return "Success";
    }

    getCartItems() {
        return this.cartItems
    }

    setCartItem(item) {
        this.cartItems.push(item);
    }

}

export default new UserService();