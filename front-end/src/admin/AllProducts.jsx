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
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllProducts } from "../redux/adminSlice";
import { server } from "..";

const AllProducts = () => {
  const { products } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  let outOfStock = 0;
  products.map((product) => {
    if (product.stock == 0) outOfStock += 1;
  });

  const producDeleteHandler = async (e) => {
    try {
      const { data } = await axios.delete(`${server}/product/${e}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      toast.success("Product Deleted");
      dispatch(getAllProducts(data.data));
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <Sidebar />
      {products && products.length > 0 && (
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
              Product List
            </Heading>
            <Text mb={"2vmax"} fontWeight={"bold"}>
              Out of Stock : {outOfStock} of {products.length}
            </Text>
            <Table w={"100%"} variant="striped">
              <Thead w={"100%"}>
                <Tr display={"flex"} w={"100%"}>
                  <Th fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]} flex={"2"}>
                    Product ID
                  </Th>
                  <Th fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]} flex={"1"}>
                    Name
                  </Th>
                  <Th
                    fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                    flex={"0.5"}
                  >
                    Stock
                  </Th>
                  <Th
                    fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                    flex={"0.5"}
                  >
                    Price
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
                {products.map((item, index) => {
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
                        isTruncated
                      >
                        {item.name}
                      </Td>
                      <Td
                        className={item.stock === 0 ? "redColor" : "greenColor"}
                        fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                        color={"#888"}
                        flex={"0.5"}
                      >
                        {item.stock}
                      </Td>
                      <Td
                        fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                        color={"#888"}
                        flex={"0.5"}
                      >
                        {item.price}
                      </Td>
                      <Td
                        display={"flex"}
                        gap={"0.5vmax"}
                        fontSize={"3xl"}
                        flex={"0.5"}
                      >
                        <Link to={`/admin/product/edit/${item._id}`}>
                          <BiEdit color="green" />
                        </Link>
                        <Link onClick={() => producDeleteHandler(item._id)}>
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
      )}
    </div>
  );
};

export default AllProducts;
