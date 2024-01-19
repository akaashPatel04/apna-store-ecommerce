import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/admin/Dashboard.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getAllProducts, getAllUsers } from "../redux/adminSlice";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { server } from "..";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [totalAmmount, setTotalAmmount] = useState("");
  const [productCount, setProductCount] = useState("");
  const [userCount, setUserCount] = useState("");
  const [orderCount, setOrderCount] = useState("");

  const [date, setDate] = useState([]);
  const [ammount, setAmmount] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userDate, setUserDate] = useState([]);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user._id || user.role !== "admin") {
      return;
    }

    //ORDER DATA
    const fetchOrderData = async () => {
      try {
        const { data } = await axios.get(`${server}/order/admin/allOrders`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        dispatch(getAllOrders(data.orders));
        setTotalAmmount(data.totalAmount);
        setOrderCount(data.count);

        setDate(
          data.orders.map((e) => new Date(e.paidAt).toLocaleDateString())
        );
        setAmmount(data.orders.map((e) => e.totalPrice));
      } catch (error) {
        toast.error(error.response.data || "Something went Wrong");
      }
    };
    fetchOrderData();

    //--------------------------------------------------------
    //PRODUCT DATA
    const fetchProductrData = async () => {
      try {
        const { data } = await axios.get(`${server}/product/admin/all`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        dispatch(getAllProducts(data.data));
        setProductCount(data.count);
      } catch (error) {
        toast.error(error.response.data.message || "Something went Wrong");
      }
    };
    fetchProductrData();

    //--------------------------------------------------------
    //USER DATA
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`${server}/user/admin/all`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        dispatch(getAllUsers(data.data));
        setUserCount(data.count);
        setUserData(data.data.map((e) => 1));
        setUserDate(
          data.data.map((e) => new Date(e.createdAt).toLocaleDateString())
        );
      } catch (error) {
        toast.error(error.response.data.message || "Something went Wrong");
      }
    };
    fetchUserData();
  }, []);

  const ammountDataChart = {
    labels: date,
    datasets: [
      {
        label: "Total Sales",
        data: ammount,
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgba(255,99,132,0.5 )",
      },
    ],
  };

  const userDataChart = {
    labels: userDate,
    datasets: [
      {
        label: "Users",
        data: userData,
        borderColor: "rgb(132,99,255)",
        backgroundColor: "rgba(132,99,255,0.5 )",
      },
    ],
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="dashboard">
        <h1>Dashboard</h1>
        <h4>Total Amount ₹ {totalAmmount}</h4>
        <div className="circles">
          <div>
            <Link to={"/admin/products"}>
              <span>Products</span>
              <span>{productCount && productCount}</span>
            </Link>
          </div>
          <div>
            <Link to={"/admin/orders"}>
              <span>Orders</span>
              <span>{orderCount && orderCount}</span>
            </Link>
          </div>
          <div>
            <Link to={"/admin/users"}>
              <span>Users</span>
              <span>{userCount && userCount}</span>
            </Link>
          </div>
        </div>
        <div className="chartContainer">
          <Line className="chart" data={ammountDataChart} />
          <Line className="chart" data={userDataChart} />
        </div>
        <div className="doughnutContainer"></div>
      </div>
    </div>
  );
};

export default Dashboard;
