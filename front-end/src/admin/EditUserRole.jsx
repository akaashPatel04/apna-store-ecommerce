import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@chakra-ui/react";
import SideBar from "./Sidebar";
import { getAllUsers } from "../redux/adminSlice";
import { useNavigate, useParams } from "react-router-dom";
import { MdPerson, MdMail } from "react-icons/md";
import axios from "axios";
import { server } from "..";

const EditUserRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { users } = useSelector((state) => state.admin);

  const user = users && users.find((i) => i._id === id);
  const [role, setRole] = useState("");

  const updateUserSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${server}/user/admin/${user._id}`,
        { role },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(getAllUsers(data.data));
      toast.success("User Updated Successfully");
      navigate("/admin/users");
    } catch (error) {
      toast.error(error.response.data.message || "Something went Wrong!");
    }
  };

  return (
    <>
      {user && (
        <div className="container">
          <SideBar />
          <div className="newProductContainer">
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>
              <img
                className="editUserRoleImageAdmin"
                src={user.avatar}
                alt=""
              />
              <div>
                <MdPerson />
                <input
                  type="text"
                  placeholder="Name"
                  value={user.name}
                  disabled
                />
              </div>
              <div>
                <MdMail />
                <input
                  type="email"
                  placeholder="Email"
                  value={user.email}
                  disabled
                />
              </div>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <Button id="createProductBtn" type="submit">
                Update
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditUserRole;
