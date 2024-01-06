import axios from 'axios';

const baseUrl = "https://dummyjson.com/products/";

class ProductService {

    getAllProducts() {
        return axios.get(baseUrl);
    }

    getProductById(id) {
        return axios.get(baseUrl+String(id));
    }

}

export default new ProductService();