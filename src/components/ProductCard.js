import Card from 'react-bootstrap/Card';
import './ProductCard.css'
import { NavLink } from 'react-router-dom';

function ProductCard(props) {

  var urlPath = '/product/' + props.product.id;
  return (
    <>
      <NavLink style={{ textDecoration: "none" }} to={urlPath} >
        <Card className='main-card'>
          <Card.Img variant="top" src={props.product.images[0]} width={200} height={320} />
          <Card.Body style={{ backgroundColor: "rgb(240,240,240)" }} >
            <div className='text-primary fw-light' >{props.product.category.charAt(0).toUpperCase() + props.product.category.slice(1)}</div>
            <Card.Title className='main-card-title text-start mb-0 fw-light mb-0 pb-1 fs-5'>{props.product.brand}</Card.Title>
            <Card.Title className='main-card-title text-start lead fw-bold mb-2 mt-0'>{props.product.title}</Card.Title>
            <Card.Text>
              <div className='d-flex justify-content-between'>
                <span className='text-start'>
                  <button className='btn btn-success btn-sm mb-2'>{props.product.rating} ★ </button>
                </span>
                <span className='lead'>
                  <b>₹ {props.product.price}.00/-</b>
                </span>
              </div>
              <span className='text-danger fs-6 lead'>Hurry! Only {props.product.stock} left</span>
            </Card.Text>
            {/* <Button variant="primary" >Update</Button> &nbsp; &nbsp;
          <Button variant="danger" >Delete</Button>
           */}
          </Card.Body>
        </Card>
        <br />
        <br />
      </NavLink>

    </>
  );
}

export default ProductCard;