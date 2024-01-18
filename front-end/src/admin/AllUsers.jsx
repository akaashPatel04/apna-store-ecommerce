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
import { getAllUsers } from "../redux/adminSlice";

const AllUsers = () => {
  const { users } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const totalAdmins = users && users.filter((i) => i.role == "admin");

  const userDeleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/user/admin/${id}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      toast.success("User Deleted");
      dispatch(getAllUsers(data.data));
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <Sidebar />
      {users && users.length > 0 && (
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
              All Users
            </Heading>
            <Text mb={"2vmax"} fontWeight={"bold"}>
              Admins : {totalAdmins.length} out of {users.length}
            </Text>
            <Table w={"100%"} variant="striped">
              <Thead w={"100%"}>
                <Tr display={"flex"} w={"100%"}>
                  <Th fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]} flex={"2"}>
                    User ID
                  </Th>
                  <Th fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]} flex={"1"}>
                    Name
                  </Th>
                  <Th
                    fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                    flex={"0.5"}
                  >
                    Role
                  </Th>
                  <Th
                    fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                    flex={"0.5"}
                  >
                    Joined On
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
                {users.map((item, index) => {
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
                      >
                        {item.name}
                      </Td>
                      <Td
                        fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                        color={"#888"}
                        flex={"0.5"}
                      >
                        {item.role === "admin" ? "Seller" : "User"}
                      </Td>
                      <Td
                        fontSize={["3.25vmax", "2.5vmax", "1.5vmax"]}
                        color={"#888"}
                        flex={"0.5"}
                      >
                        {item.createdAt.split("T")[0]}
                      </Td>
                      <Td
                        display={"flex"}
                        gap={"0.5vmax"}
                        fontSize={"3xl"}
                        flex={"0.5"}
                      >
                        <Link to={`/admin/user/edit/${item._id}`}>
                          <BiEdit color="green" />
                        </Link>
                        <Link onClick={() => userDeleteHandler(item._id)}>
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

export default AllUsers;
