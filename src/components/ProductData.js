import React from 'react';
import ProductService from '../services/ProductService';
import ProductCard from './ProductCard';
import './ProductData.css'

class ProductData extends React.Component {
    constructor(props) {
        console.log("In constructor of ProductTable");
        super(props);
        this.state = {
            products: [],
            searchProducts: [],
            searchCriteria: "name",
            arrCategory: [],
            uniqueItems: [],
            isCategoryLoading: true,
            isLoading: true
        }
    }

    updateData = (product) => {
        this.props.updateData(product);
    }

    deleteProduct = (product) => {
        ProductService.deleteProduct(product);
        this.setState({
            ...this.state,
        })
    }

    fetchAllFromAPI() {
        console.log("Fetching Data");
        ProductService.getAllProducts().then((res) => {
            // console.log(res.data.products[0].images[0]);
            this.setState({
                ...this.state,
                products: res.data.products,
                searchProducts: res.data.products,
                arrCategory: res.data.products.map(p => p.category),
                uniqueItems: this.state.arrCategory.filter((element, index) => this.state.arrCategory.indexOf(element) === index),
                isLoading: false
            })
            // this.loadCat(uniqueItems);
            // const uniqueItems = this.state.arrCategory.filter((element, index) => this.state.arrCategory.indexOf(element) === index);
            // this.loadCat(uniqueItems)
        }).catch();
    }

    loadCat(uniqueItems) {
        this.setState({
            ...this.state,
            arrCategory: uniqueItems
        }, () => {
            this.setState({
                ...this.state,
                isLoading: false
            })
        })
    }

    componentDidMount() {
        console.log("ProductTable component Mounted");
        this.fetchAllFromAPI()
    }

    setSearchProductsToDefault() {
        this.setState({
            ...this.state,
            searchProducts: [...this.state.products]
        });
    }


    searchProduct = (searchText) => {
        var searchCriteria = this.state.searchCriteria;
        var searchProducts = [];
        if (searchCriteria === "name") {
            searchProducts = this.state.products.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
        }
        else if (searchCriteria === "price") {

            searchProducts = this.state.products.filter(product => product.price >= searchText);
        }
        else if (searchCriteria === "qty") {
            searchProducts = this.state.products.filter(product => product.stock >= parseFloat(searchText));
        }
        if (searchProducts.length === 0 && searchText.length === 0) {
            searchProducts = this.state.products;
        }
        return searchProducts;
    }

    handleSearch = (e) => {
        this.setState({
            ...this.state,
            searchProducts: this.searchProduct(e.target.value)
        });
    }

    handleCriteria = (e) => {
        this.setState({
            ...this.state,
            searchCriteria: e.target.value
        });
    }

    handleFilter(target) {
        for (var i = 0; i < this.state.uniqueItems.length; i++) {
            if (this.state.uniqueItems[i] === target) {
                this.setState({
                    ...this.state,
                    searchProducts: this.state.products.filter((product) => product.category === target)
                });
                break;
            }
        }
    }

    handleSort(target) {
        function compare(a, b) {
            return a - b;
        }
        if (target === 'priceAsc') {
            this.setState({
                ...this.state,
                searchProducts: this.state.searchProducts.sort((p1, p2) => compare(p1.price, p2.price))
            });
        }
        else if (target === 'priceDesc') {
            this.setState({
                ...this.state,
                searchProducts: this.state.searchProducts.sort((p1, p2) => compare(p2.price, p1.price))
            });
        }
        else if (target === 'qty') {
            this.setState({
                ...this.state,
                searchProducts: this.state.searchProducts.sort((p1, p2) => compare(p2.stock, p1.stock))
            });
        }
    }

    handleSelection = (e) => {

        if (e.target.value === 'default') {
            this.setSearchProductsToDefault();
        }
        else if (e.target.name === "filterCriteria") {
            this.handleFilter(e.target.value);
        }
        else if (e.target.name === "sortCriteria") {
            this.handleSort(e.target.value);
        }
        // e.target.name === 'filterCriteria' ? e.target.value === 'default' ? this.setSearchProductsToDefault() : this.handleFilter(e.target.value) : e.target.value = 'default';
    }

    render() {
        return (
            <>
                {
                    this.state.isLoading ?
                        <p className="h-100 d-flex justify-content-center">
                        <p className='loader '></p>
                        </p>
                        :
                        <div>
                            <h1 className='display-5 text-center'>Products List</h1>
                            <div className="container border bg-white rounded-4">
                                <div className="input-group mt-3 d-flex flex-row justify-content-between">
                                    <div className='d-flex flex-row'>
                                        <div className="form-outline pe-2" data-mdb-input-init>
                                            <input type="search" placeholder='Search' id="form1" readOnly={this.state.searchCriteria === "notSelected"} className="form-control border-dark mb-2" onChange={this.handleSearch} />
                                        </div>
                                        <div>
                                            <select className="form-select border-dark" name='searchCriteria' onChange={this.handleCriteria} aria-label="Default select example" >
                                                <option name='searchCriteria' value="name">Name</option>
                                                <option name='searchCriteria' value="price">Price</option>
                                                <option name='searchCriteria' value="qty">Quantity</option>
                                            </select>
                                        </div>
                                    </div>


                                    <div className='d-flex flex-row'>
                                        <div className="form-outline pe-2" data-mdb-input-init>
                                            <select className="form-select border-dark" aria-label='filterlabel' name='filterCriteria' onChange={this.handleSelection}>
                                                <option name='filterCriteria' value="default">Filter By</option>
                                                <option name="filterCriteria" value="smartphones">Smartphones</option>
                                                <option name="filterCriteria" value="laptops">Laptops</option>
                                                <option name="filterCriteria" value="fragrances">Fragrances</option>
                                                <option name="filterCriteria" value="skincare">Skincare</option>

                                                <option name="filterCriteria" value="groceries">Groceries</option>
                                                <option name="filterCriteria" value="home-decoration">Home-decoration</option>
                                                {/* {
                                                    this.state.uniqueItems.map((category, index) => <option key={index+1} name='filterCriteria' value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                                                    )
                                                } */}
                                            </select>
                                        </div>
                                        <div>
                                            <select className="form-select border-dark" name='sortCriteria' onChange={this.handleSelection}>
                                                <option name='sortCriteria' value="default">Sort By</option>
                                                <option name='sortCriteria' value="priceAsc">Price-Low-to-High</option>
                                                <option name='sortCriteria' value="priceDesc">Price-High-to-Low</option>
                                                <option name='sortCriteria' value="qty">Quantity</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    {
                                        this.state.searchProducts.map((product, index) =>
                                            <div className='col-sm-6 col-md-4' >
                                                <ProductCard key={index} product={product}></ProductCard>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                }
            </>
        )
    }

}

export default ProductData;
