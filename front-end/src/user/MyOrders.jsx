import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineLink } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorPage from "../components/ErrorPage";
import { server } from "..";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`${server}/order/my`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setOrders(data.orders);
        setError(null);
        setLoading(false);
      } catch (error) {
        toast.error("Something went Wrong");
        setLoading(false);
        setError(true);
      }
    };
    fetchAllOrders();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!error ? (
            <>
              {orders.length > 0 ? (
                <TableContainer
                  minH={"80vh"}
                  w={["95%", "88", "70%"]}
                  mx={"auto"}
                  py={["12vmax", "9vmax", "6vmax"]}
                  position={"relative"}
                >
                  <Table w={"100%"} variant="striped">
                    <TableCaption
                      bottom={"0"}
                      position={"absolute"}
                      fontSize={"3xl"}
                      w={"100%"}
                      color={"white"}
                      bgColor={"tomato"}
                      mx={"auto"}
                    >
                      Order History
                    </TableCaption>
                    <Thead w={"100%"}>
                      <Tr display={"flex"} w={"100%"}>
                        <Th
                          fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                          flex={"2"}
                        >
                          Order Identity Number
                        </Th>
                        <Th
                          fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                          flex={"1"}
                        >
                          Status
                        </Th>
                        <Th
                          fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                          flex={"0.5"}
                        >
                          Qty
                        </Th>
                        <Th
                          fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                          flex={"0.5"}
                        >
                          Amount
                        </Th>
                        <Th
                          fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                          flex={"0.5"}
                        >
                          View
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
                                item.orderStatus === "Proccessing"
                                  ? "redColor"
                                  : "greenColor"
                              }
                            >
                              {item.orderStatus}
                            </Td>
                            <Td
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
                            <Td fontSize={"3xl"} flex={"0.5"}>
                              <Link to={`/order/me/${item._id}`}>
                                <AiOutlineLink />
                              </Link>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              ) : (
                <VStack h={"65vh"} justifyContent={"center"}>
                  <Heading fontSize={"5xl"}>NO Orders</Heading>
                  <Text>Order List is empty</Text>
                  <Link to={"/search"}>
                    <button
                      style={{ borderRadius: 0 }}
                      className="submitReview"
                    >
                      Shop Now
                    </button>
                  </Link>
                </VStack>
              )}
            </>
          ) : (
            <ErrorPage />
          )}
        </>
      )}
    </>
  );
};

export default MyOrders;
