import { useState } from "react";
import Loader from "../components/Loader";
import "../styles/user/Register.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { signUpStart, signUpSuccess, signUpFail } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "..";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: user && user.name,
    email: user && user.email,
  });
  const [avatar, setAvatar] = useState(null);

  const { email, name } = formData;

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("avatar", avatar);

      dispatch(signUpStart());
      const { data } = await axios.put(`${server}/user/update`, myForm, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(signUpSuccess(data.user));
      navigate("/profile");
      toast.success("Account details updated succesfully");
    } catch (error) {
      console.log(error);
      dispatch(signUpFail(error.response.data.message));
      toast.error("Something went wrong");
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="SignUpContainer">
          <div className="SignUpBox">
            <p>MY PROFILE</p>
            <form className="signUpForm" onSubmit={updateHandler}>
              <div className="signUpName">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  onChange={onChange}
                  value={formData.name}
                  name="name"
                />
              </div>
              <div className="signUpEmail">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={onChange}
                  name="email"
                />
              </div>
              <div id="registerImage">
                <input
                  type="file"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  accept="image/*"
                />
              </div>
              {error && <p className="errorMessage">{error}</p>}
              <input type="submit" value="Update" className="signUpBtn" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
