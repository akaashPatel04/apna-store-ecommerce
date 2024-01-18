import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/product/Shipping.css";
import { toast } from "react-toastify";
import { shippingInfoSave } from "../redux/cartSlice";

const Shipping = () => {
  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const shippingFormHandler = (e) => {
    e.preventDefault();
    if (!address || !city) {
      toast.error("Please fill out all Details");
      return;
    }
    if (pinCode.length !== 6) {
      toast.error("Invalid Pincode");
      return;
    }
    if (phoneNo.length !== 10) {
      toast.error("Phone no must be 10 digits long");
      return;
    }

    dispatch(
      shippingInfoSave({
        address,
        city,
        pinCode,
        phoneNo,
        state: state || "India",
        country: country || "India",
      })
    );
    navigate("/order/confirm");
  };

  return (
    <div className="shippingPage">
      <div className="container">
        <h2 className="shippingHeading">Shipping Details</h2>
        <form>
          <div>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Pincode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Phone"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </div>
          <div>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="India">India</option>
            </select>
          </div>
          <div>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Arunanchal Pradesh">Arunanchal Pradesh</option>
              <option value="Bihar">Bihar</option>
              <option value="Bengal">Bengal</option>
              <option value="Patna">Patna</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Goa">Goa</option>
              <option value="Jammu Kashmi">Jammu Kashmir</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Himanchal Pradesh">Himanchal Pradesh</option>
              <option value="Karnatka">Karnatka</option>
            </select>
          </div>
          <div>
            <input
              type="button"
              onClick={shippingFormHandler}
              value="Proceed"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
