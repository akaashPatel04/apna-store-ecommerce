import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import "../styles/user/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUpStart, signUpSuccess, signUpFail } from "../redux/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { MdMail, MdPassword } from "react-icons/md";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signUpStart());
      const { data } = await axios.post(
        "http://localhost:5000/user/login",
        formData
      );
      localStorage.setItem("token", data.token);
      dispatch(signUpSuccess(data.user));
      navigate("/profile");
      toast.success(`Logged in as ${data.user.name}`);
    } catch (error) {
      console.log(error);
      dispatch(signUpFail(error.response.data.message));
      toast.error("Login Failed");
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
        <>
          <div className="LoginContainer">
            <div className="LoginBox">
              <p>LOGIN</p>
              <form className="loginForm" onSubmit={submitHandler}>
                <div className="loginEmail">
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
                <div className="loginPassword">
                  <MdPassword className="InputFormIcon" />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    required
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                  />
                </div>
                <Link to="/register">New to Apna Store?</Link>
                {error && <p className="errorMessage">{error}</p>}
                <input type="submit" value="Login" className="loginBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
