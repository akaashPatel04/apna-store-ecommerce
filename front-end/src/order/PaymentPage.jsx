import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetCart } from "../redux/cartSlice";
import axios from "axios";
import "../styles/product/PaymentPage.css";

const stripePromise = loadStripe(
  "pk_test_51OXLM2SI05OwvX4jCEtnNAh8i8fs5Kbluxku80HS39H7FvDNwNfikQsiacCpv7wmOFztISiMCgKaU6AswTFeqS1N00K3fWUlpm"
);

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItem } = useSelector((state) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);

  const { shippingPrice, subTotal, taxPrice, totalPrice } = JSON.parse(
    sessionStorage.getItem("orderInfo")
  );
  const billDetail = {
    shippingPrice,
    subTotal,
    taxPrice,
    totalPrice,
  };

  useEffect(() => {
    if (!billDetail) {
      toast.error("Please confirm your Order First");
      navigate("/order/confirm");
    }
  }, []);

  const [orderData, setOrderData] = useState({
    shipingDetail: shippingInfo,
    orderItems: cartItem,
    user: user?._id,
    itemsPrice: billDetail.subTotal,
    taxPrice: billDetail.taxPrice,
    shippingPrice: billDetail.shippingPrice,
    totalPrice: billDetail.totalPrice,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setIsProcessing(false);
    }

    if (true) {
      const paymentInfo = {
        id: "1474981319fdgh6fg5h31jhj78kjhk",
        status: "Proccessing",
      };

      const formData = { ...orderData, paymentInfo };
      const createOrder = async () => {
        try {
          await axios.post("http://localhost:5000/order/create", formData, {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          });
          dispatch(resetCart());
          toast.success("Order Placed Successfully");
          navigate("/order/me");
          setIsProcessing(false);
        } catch (error) {
          setIsProcessing(false);
          toast.error(error.response.data.message || "Something went Wrong");
        }
      };
      createOrder();
    }
  };

  return (
    <div className="paymentContainer">
      <div className="paymentForm">
        <p>Payment Page</p>
        <PaymentElement className="paymentInput" />
        <button
          className="submitButton"
          type="submit"
          disabled={isProcessing}
          onClick={submitHandler}
        >
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const clientSecret = location.state;
  if (!clientSecret) {
    navigate("/shipping");
  }

  return (
    <Elements
      options={{
        clientSecret,
      }}
      stripe={stripePromise}
    >
      <CheckOutForm />
    </Elements>
  );
};

export default PaymentPage;
