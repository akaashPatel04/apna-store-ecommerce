import { useState } from "react";
import "../styles/user/Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { removeUser } from "../redux/userSlice";
import { resetShippingInfo, resetCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import profile from "../images/Profile.png";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const deleteHandleToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/user/delete", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(removeUser());
      dispatch(resetShippingInfo());
      dispatch(resetCart());
      navigate("/login");
      toast.success("Account Deleted");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {user && (
        <>
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img
                src={
                  user.avatar ? `http://localhost:5000/${user.avatar}` : profile
                }
                alt="Profile"
              />
              <Link to="/profile/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>12-08-2022</p>
              </div>
              <div>
                <Link to="/order/me">My Orders</Link>
                <Link onClick={deleteHandleToggle}>Delete Account</Link>
              </div>
            </div>
          </div>
          {open && (
            <div className="deleteDailog">
              <div>
                <p>
                  Are you sure, Your complete information would be removed{" "}
                  <b>Permanently</b>
                </p>
                <div>
                  <button type="button" onClick={deleteHandleToggle}>
                    CANCEL
                  </button>
                  <button className="confirm" onClick={handleDelete}>
                    CONFIRM
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
