import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../styles/product/MySingleOrder.css";
import { useParams } from "react-router-dom";
import { server } from "..";

const MySingleOrder = () => {
  const [order, setOrder] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data } = await axios.get(`${server}/order/my/${id}`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setOrder(data.order);
      } catch (error) {
        toast.error(error.response.data.message || "Something went Wrong");
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <>
      {order && (
        <div className="orderDetailsPage">
          <div className="orderDetailsContainer">
            <Text className="h1">Order #{order._id}</Text>
            <Text>Shipping Info</Text>
            <div className="orderDetailsContainerBox">
              <div>
                <p>Phone:</p>
                <span>{order.shipingDetail.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>
                  {`${order.shipingDetail.address}, ${order.shipingDetail.city}, ${order.shipingDetail.state}, ${order.shipingDetail.pinCode}, ${order.shipingDetail.country}`}
                </span>
              </div>
            </div>
            <Text>Payment</Text>
            <div className="orderDetailsContainerBox">
              <div>
                <p className="greenColor">PAID</p>
              </div>
              <div>
                <p>Amount:</p>
                <span>₹ {order.totalPrice}</span>
              </div>
            </div>

            <Text>Order Status</Text>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order.orderStatus === "Delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order.orderStatus}
                </p>
              </div>
            </div>
          </div>

          <div className="orderDetailsCartItems">
            <Text>Order Items:</Text>
            <div className="orderDetailsCartItemsContainer">
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <div key={item.product}>
                    <Link to={`/product/${item.product}`}>
                      <img src={item.image} alt="Product" />
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MySingleOrder;
