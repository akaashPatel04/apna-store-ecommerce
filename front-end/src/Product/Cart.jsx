import { useSelector, useDispatch } from "react-redux";
import CartItemCard from "./CartItemCard";
import "../styles/product/CartPage.css";
import { cartAction } from "../redux/cartSlice";
import { BiCart } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItem } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartFunc = (prod) => {
    if (prod.stock == prod.quantity) {
      toast.error("Item out of Stock");
      return;
    }
    let prev = JSON.parse(localStorage.getItem("cartItem"));
    const item = prev.find((i) => i.product === prod.product);
    item.quantity = item.quantity + 1;
    prev = prev.map((i) => (i.product === item.product ? item : i));
    dispatch(cartAction(prev));
  };

  const removeItemFunc = (prod) => {
    if (prod.quantity == 1) {
      return;
    }

    let prev = JSON.parse(localStorage.getItem("cartItem"));
    const item = prev.find((i) => i.product === prod.product);
    item.quantity = item.quantity - 1;
    prev = prev.map((i) => (i.product === item.product ? item : i));
    dispatch(cartAction(prev));
  };

  const checkoutHandler = () => {
    if (user) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="cartPage">
      {cartItem && cartItem.length > 0 ? (
        <>
          <div className="cartHeader">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>

          {cartItem &&
            cartItem.map((prod) => (
              <div className="cartContainer" key={prod.product}>
                <CartItemCard prod={prod} key={prod.product} />
                <div className="cartInput">
                  <button onClick={() => removeItemFunc(prod)}>-</button>
                  <input type="number" value={prod.quantity} readOnly />
                  <button onClick={() => addToCartFunc(prod)}>+</button>
                </div>
                <p className="cartSubtotal">{`₹${
                  prod.price * prod.quantity
                }`}</p>
              </div>
            ))}
          <div className="cartGrossProfit">
            <div></div>
            <div className="cartGrossProfitBox">
              <p>Gross Total</p>
              <p>{`₹${cartItem.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}`}</p>
            </div>
            <div></div>
            <div className="checkOutBtn">
              <button onClick={checkoutHandler}>Check Out</button>
            </div>
          </div>
        </>
      ) : (
        <div className="noItem">
          <p>Cart is Empty</p>
          <BiCart />
          <Link to={"/search"}>
            <button className="noItemBtn">Shop Now</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
