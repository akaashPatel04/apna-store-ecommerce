import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { getAllOrders } from "../redux/adminSlice";

const AllOrders = () => {
  const { orders } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const ordersLeft =
    orders &&
    orders.filter(
      (i) => i.orderStatus == "Proccessing" || i.orderStatus == "Shipped"
    );

  const orderDeleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/order/admin/delete/${id}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      toast.success("Order Removed");
      dispatch(getAllOrders(data.data));
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <Sidebar />
      {orders && orders.length > 0 ? (
        <>
          <TableContainer
            minH={"80vh"}
            w={"95%"}
            mx={"auto"}
            py={"2vmax"}
            position={"relative"}
          >
            <Heading
              fontSize={"5xl"}
              textAlign={"center"}
              mx={"auto"}
              mb={"2vmax"}
            >
              Order List
            </Heading>
            <Text mb={"2vmax"} fontWeight={"bold"}>
              Orders Pending : {ordersLeft.length} out of {orders.length}
            </Text>
            <Table w={"100%"} variant="striped">
              <Thead w={"100%"}>
                <Tr display={"flex"} w={"100%"}>
                  <Th fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]} flex={"2"}>
                    Order ID
                  </Th>
                  <Th fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]} flex={"1"}>
                    Status
                  </Th>
                  <Th
                    fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                    flex={"0.5"}
                  >
                    Items Qty
                  </Th>
                  <Th
                    fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                    flex={"0.5"}
                  >
                    Ammount
                  </Th>
                  <Th
                    fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                    flex={"0.5"}
                  >
                    Edit
                  </Th>
                </Tr>
              </Thead>
              <Tbody w={"100%"}>
                {orders.map((item, index) => {
                  return (
                    <Tr w={"100%"} display={"flex"} key={index}>
                      <Td
                        fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                        color={"#888"}
                        flex={"2"}
                      >
                        {item._id}
                      </Td>
                      <Td
                        fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                        color={"#888"}
                        flex={"1"}
                        className={
                          item.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {item.orderStatus}
                      </Td>
                      <Td
                        className={item.stock === 0 ? "redColor" : "greenColor"}
                        fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                        color={"#888"}
                        flex={"0.5"}
                      >
                        {item.orderItems.length}
                      </Td>
                      <Td
                        fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                        color={"#888"}
                        flex={"0.5"}
                      >
                        {item.totalPrice}
                      </Td>
                      <Td
                        display={"flex"}
                        gap={"0.5vmax"}
                        fontSize={"3xl"}
                        flex={"0.5"}
                      >
                        <Link to={`/admin/order/edit/${item._id}`}>
                          <BiEdit color="green" />
                        </Link>
                        <Link onClick={() => orderDeleteHandler(item._id)}>
                          <AiOutlineDelete color="red" />
                        </Link>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <VStack h={"65vh"} justifyContent={"center"}>
          <Heading fontSize={"5xl"}>NO Orders</Heading>
          <Text>Order List is empty</Text>
          <Link to={"/admin/dashboard"}>
            <button style={{ borderRadius: 0 }} className="submitReview">
              Dashbord
            </button>
          </Link>
        </VStack>
      )}
    </div>
  );
};

export default AllOrders;
