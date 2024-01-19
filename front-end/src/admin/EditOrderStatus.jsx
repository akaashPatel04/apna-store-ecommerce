import Sidebar from "./Sidebar";
import { useState } from "react";
import { toast } from "react-toastify";
import "../styles/admin/processOrder.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Text } from "@chakra-ui/react";
import { getAllOrders } from "../redux/adminSlice";
import { server } from "..";

const EditOrderStatus = () => {
  const [status, setStatus] = useState("");
  const { orders } = useSelector((state) => state.admin);
  const { users } = useSelector((state) => state.admin);
  const { id } = useParams();
  const order = orders.length > 0 && orders.find((i) => i._id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = users.find((i) => i._id === order.user);

  const updateOrderSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${server}/order/admin/update/${id}`,
        { status },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      toast.success("Order Status Updated");
      dispatch(getAllOrders(data.data));
      navigate("/admin/orders");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };
  return (
    <div className="container">
      <Sidebar />
      <>
        {order && (
          <div
            className="editOrderStatusContainer"
            style={{
              display: order.orderStatus === "Delivered" ? "block" : "grid",
            }}
          >
            <div className="updateOrderPage">
              <div className="confirmshippingArea">
                <Text className="updateOrderHeading">Shipping Info</Text>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{user && user.name}</span>
                  </div>
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

                <Text className="updateOrderHeading">Payment</Text>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.paymentInfo && order.paymentInfo.status === "Paid"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.paymentInfo && order.paymentInfo.status === "Paid"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>
                  <div>
                    <p>Amount:</p>
                    <span> ₹{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>
                <Text className="updateOrderHeading">Order Status</Text>
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
              <div className="confirmCartItems">
                <Text className="updateOrderHeading">Your Cart Items:</Text>
                <div className="cartItem">
                  {order.orderItems.map((item) => (
                    <div key={item.product}>
                      <Link to={`/product/${item.product}`}>
                        <div>
                          <img src={`${server}/${item.image}`} alt="Product" />
                          <p>{item.name}</p>
                        </div>
                      </Link>
                      <div>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/*  */}
            <div
              style={{
                display: order.orderStatus === "Delivered" ? "none" : "block",
              }}
            >
              <form
                className="updateOrderForm"
                onSubmit={updateOrderSubmitHandler}
              >
                <h1>Process Order</h1>
                <div>
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Choose Category</option>
                    {order.orderStatus === "Proccessing" && (
                      <option value="Shipped">Shipped</option>
                    )}
                    {order.orderStatus === "Shipped" && (
                      <option value="Delivered">Delivered</option>
                    )}
                  </select>
                </div>
                <button
                  id="createProductBtn"
                  type="submit"
                  disabled={status === "" ? true : false}
                >
                  Process
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default EditOrderStatus;
