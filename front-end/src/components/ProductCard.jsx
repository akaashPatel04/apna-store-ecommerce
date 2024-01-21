import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "../styles/components/productCard.css";

const ProductCard = ({ product }) => {
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.image} alt="product" />
      <p>{product.name}</p>
      <div>
        <ReactStars
          edit={false}
          color="rgb(50, 50, 50)"
          activeColor="rgb(250,200,50)"
          value={product.ratings}
          isHalf={true}
          size={window.innerWidth > 600 ? 25 : 20}
        />{" "}
        <span>({product.numOfReviews} Reviews)</span>
      </div>
      <span>₹{product.price}</span>
    </Link>
  );
};

export default ProductCard;
