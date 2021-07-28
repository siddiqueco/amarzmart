import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "../Rating";
import "./ProductCard.css";

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className=' my-card'>
      <Card
        className="my-2"
        style={{ width: "180px", height: "322px" }}
      >
        <div className="view overlay">
          <Card.Img className="product-img img-fluid" src={product.image} variant="top" />
        </div>

        <Card.Body className="p-2">
          <Card.Title as="div" className="card-title text-sm">
            <span style={{display:"block", wordBreak: 'break-all'}}>
              {
                product.name.length > 45 ? `${product.name.substring(0,45)}...`: product.name
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
          <Card.Text as="h3" style={{ fontSize: "18px" }}>
            &#2547;{product.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
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
