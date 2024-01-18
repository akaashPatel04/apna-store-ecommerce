import { Link } from "react-router-dom";
import "../styles/product/CartItemCard.css";
import { useDispatch } from "react-redux";
import { cartAction } from "../redux/cartSlice";

const CartItemCard = ({ prod }) => {
  const dispatch = useDispatch();

  const removeItemFunc = (prod) => {
    let prev = JSON.parse(localStorage.getItem("cartItem"));
    prev = prev.filter((i) => (i.product === prod.product ? null : i));
    dispatch(cartAction(prev));
  };
  return (
    <div className="CartItemCard">
      <img
        src={prod.image && `http://localhost:5000/${prod.image}`}
        alt="product"
      />
      <div>
        <Link to={`/product/${prod.product}`}>{prod.name}</Link>
        <span>{`Price: ₹${prod.price}`}</span>
        <p onClick={() => removeItemFunc(prod)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
