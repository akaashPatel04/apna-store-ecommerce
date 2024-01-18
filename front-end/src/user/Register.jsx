import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import "../styles/user/Register.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { signUpStart, signUpSuccess, signUpFail } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdPerson, MdMail, MdPassword } from "react-icons/md";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const { email, name, password } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.password2) {
        dispatch(signUpFail("Password & Confirm password does'nt match"));
        toast.error("Registeration Failed");
        return;
      }
      dispatch(signUpStart());

      //Form Data
      const myForm = new FormData();
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("avatar", avatar);

      //API Request
      const { data } = await axios.post(
        "http://localhost:5000/user/register",
        myForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(signUpSuccess(data.user));
      localStorage.setItem("token", data.token);
      navigate("/profile");
      toast.success(`Registered as ${data.user.name}`);
    } catch (error) {
      console.log(error);
      toast.error("Registeration Failed");
      dispatch(signUpFail(error.response.data.message));
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
            <p>REGISTER</p>
            <form className="signUpForm" onSubmit={submitHandler}>
              <div className="signUpName">
                <MdPerson className="InputFormIcon" />
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
                <MdMail className="InputFormIcon" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={onChange}
                  name="email"
                />
              </div>
              <div className="signUpPassword">
                <MdPassword className="InputFormIcon" />
                <input
                  type="password"
                  placeholder="Create Password"
                  required
                  value={formData.password}
                  onChange={onChange}
                  name="password"
                />
              </div>
              <div className="signUpPassword">
                <MdPassword className="InputFormIcon" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={formData.password2}
                  onChange={onChange}
                  name="password2"
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
              <Link to="/login">Already a User?</Link>
              <input type="submit" value="Register" className="signUpBtn" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
