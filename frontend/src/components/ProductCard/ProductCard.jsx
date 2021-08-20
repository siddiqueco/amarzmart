import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import Rating from "../Rating";
import "./ProductCard.css";
import { addToCart } from '../../actions/cartActions'


const Product = ({ product }) => {
  const [qty, setQty] = useState(1)
  const productId = product._id
  const dispatch= useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product:ProductStock } = productDetails
  
  const addToCartHandler = (e, id) => {
    e.preventDefault()
    setQty(qty + 1)
    dispatch(addToCart(id,qty))
  }


  return (
    <Card
      className="my-2"
      style={{ width: "180px", height: "322px" }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img className="product-img img-fluid" src={product.image} variant="top" />
      </Link>
      <Card.Body className="p-2">
        <Card.Title as="div" className="card-title text-sm">
          <span style={{ display: "block", wordBreak: 'break-all' }}>
            {
              product.name.length > 45 ? `${product.name.substring(0, 45)}...` : product.name
            }
          </span>
        </Card.Title>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={` (${product.numReviews})`}
            color="rgba(45,55,72,1)"
          />
        </Card.Text>
        <div className='price-cart-icon-wrapper'>
          <Card.Text as="h3" style={{ fontSize: "18px" }} className=' product-price'>
            &#2547;{product.price}
          </Card.Text>
          {/* <Card.Text as="div" style={{ fontSize: "18px", display: 'inline-block', float: 'right' }}>
              cart
            </Card.Text> */}
          <button className='btn add-to-cart-button' onClick={(e) => addToCartHandler(e, product._id)} disabled={product.countInStock ==0}>
            <i class="fas fa-cart-plus"></i>        {/*  add to cart ico */}
          </button>
        </div>


      </Card.Body>
    </Card>
  );
};

export default Product;

// <Card className="my-2" style={{ width: "180px", height: "325px" }} card-hover>
//       <Link to={`/product/${product._id}`}>
//         <Card.Img className="product-img" src={product.image} variant="top" />
//       </Link>
//       <Card.Body className='p-2'>
//         <Link to={`/product/${product._id}`}>
//           <Card.Title as="div" className='card-title text-sm'>
//             <span>{product.name.substring(0, 15)}</span>
//           </Card.Title>
//         </Link>
//         <Card.Text as="div">
//           <Rating value={product.rating} text={` (${product.numReviews})`} />
//         </Card.Text>
//         <Card.Text as="h3" style={{ fontSize: "18px" }}>
//           &#2547;{product.price}
//         </Card.Text>
//       </Card.Body>
//     </Card>
