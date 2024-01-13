import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductService from '../services/ProductService';
import './ProductDetails.css'


const ProductDetails = () => {

  const props = useParams();
  const [product, setData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);

  const fetchInfo = () => {
    console.log("Fetching product details...");
    ProductService.getProductById(props.id).then((res) => {
      setData(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  };


  const deleteProduct = () => {
    if (window.confirm("Sure to Delete this Product!")) {
      ProductService.deleteProduct(props.id);
      alert("Product deleted successfully!");
      navigate('/product');
    }
  }


  const changeImage = (event, index) => {
    setImageIndex(index);
  }

  useEffect(() => {
    // console.log("j")
    fetchInfo();
  }, []);



  return (
    <div>

      {
        isLoading ?
          <div className = "text-center">
            <div className = "spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
              <span className = "visually-hidden">Loading...</span>
            </div>
          </div>
          :
          <div>
            <h1 className='display-5 text-center mb-0' >Product Details</h1> <br /><br />
            <div className='container-fluid bg-light border pt-5 pb-5 p-3 '>
              <div className='row'>
                <div className='col-sm-12 col-md-1'>
                  {
                    isLoading ? "" :
                      product.images.map((image, index) => <button key={index} className='border-0 bg-light' onClick={event => changeImage(event, index)}>
                        <img src={isLoading ? "" : image} alt='' height={80} width={80} className=' img-thumbnail  pb-3 me-3 rounded'></img>
                      </button>)
                  }
                </div>
                <div className='col-md-5 d-flex flex-column   ' >
                  <img className='img-fluid image-container mb-5 ' id='mainImage ' src={isLoading ? "" : product.images[imageIndex]} style={{aspectRatio:"4.5/3"}} alt='' ></img>
                  <div className='d-flex flex-row flex-wrap justify-content-center'>
                    <button className='btn btn-success btn-lg mb-2 jesh'>Buy Now</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className='btn btn-warning btn-lg mb-2' >Add to Cart</button>
                  </div>
                </div>
                <div className='col-md-6 content-container'>
                  <h1>{product.title}</h1>
                  <h5> ₹{product.price} /-</h5>
                  <div>Stock: {product.stock}</div>
                  <div>Description: {product.description}</div>
                </div>
              </div>
            </div>
          </div>

      }
    </div>
  )
}

export default ProductDetails;
