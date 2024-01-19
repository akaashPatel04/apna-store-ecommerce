import { useSelector } from "react-redux";
import "../styles/product/orderPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "..";

const OrderPage = () => {
  const { shippingInfo, cartItem } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const subTotal = cartItem.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  let shippingPrice;
  subTotal < 1000
    ? (shippingPrice = 250)
    : subTotal < 5000
    ? (shippingPrice = 100)
    : (shippingPrice = 0);

  const taxPrice = (subTotal + shippingPrice) * 0.15;
  const totalPrice = subTotal + taxPrice + shippingPrice;

  const orderConfirmHandler = async () => {
    const data = {
      subTotal,
      taxPrice,
      shippingPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    try {
      const { data } = await axios.post(
        `${server}/payment/process`,
        {
          amount: totalPrice,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      navigate("/process/payment", {
        state: data.client_secret,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="orderPage">
      <div>
        <div className="shippingDet">
          <h4 className="heading">Shipping Address</h4>
          <div>
            <p>
              <b>Name : </b>
              {user.name}
            </p>
            <p>
              <b>Phone : </b>
              {shippingInfo.phoneNo}
            </p>
            <p>
              <b>Address : </b>
              {`${shippingInfo.pinCode}, ${shippingInfo.address}, ${shippingInfo.city} ${shippingInfo.state} `}
            </p>
          </div>
        </div>
        <h4 className="heading">Cart Items</h4>
        <div className="cartItem">
          {cartItem &&
            cartItem.length > 0 &&
            cartItem.map((item) => (
              <div key={item.product}>
                <Link to={`/product/${item.product}`}>
                  <div>
                    <img src={`${server}/${item.image}`} alt="Item Image" />
                    <p>{item.name}</p>
                  </div>
                </Link>
                <div>
                  {`${item.price} X ${item.quantity} = `}
                  <b>{item.price * item.quantity}</b>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="order">
        <h4>Order Summary</h4>
        <div className="price">
          <div>
            <p>
              <b>Subtotal : </b>
            </p>
            <p>{subTotal}</p>
          </div>
          <div>
            <p>
              <b>Shipping Charge : </b>
            </p>
            <p>{shippingPrice}</p>
          </div>
          <div>
            <p>
              <b>Tax Ammount : </b>
            </p>
            <p>{taxPrice}</p>
          </div>
        </div>
        <div>
          <p>
            <b>Total : </b>
          </p>
          <p>{totalPrice}</p>
        </div>
        <button onClick={orderConfirmHandler}>Proceed to Pay</button>
      </div>
    </div>
  );
};

export default OrderPage;
