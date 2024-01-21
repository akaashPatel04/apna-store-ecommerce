import { useState } from "react";
import "../styles/admin/CreateProduct.css";
import { toast } from "react-toastify";
import { Button } from "@chakra-ui/react";
import SideBar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsCashCoin } from "react-icons/bs";
import {
  MdOutlineSpellcheck,
  MdOutlineDescription,
  MdOutlineAccountTree,
  MdOutlineStorage,
} from "react-icons/md";
import { server } from "..";
import Loader from "../components/Loader";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [avatar, setImage] = useState(null);

  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const categories = [
    "Electronics",
    "Footwear",
    "Clothes",
    "Games",
    "Camera",
    "Books",
    "SmartPhones",
    "Groccery",
    "Sports",
    "Furniture",
  ];

  const createProductSubmitHandler = async (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("avatar", avatar);

    try {
      setloading(true);
      await axios.post(`${server}/product/create`, myForm, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });
      setloading(false);
      toast.success("Product Created Successfully");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      setloading(false);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <SideBar />
          <div className="newProductContainer">
            <form
              className="createProductForm"
              onSubmit={createProductSubmitHandler}
            >
              <h1>Create Product</h1>
              <div>
                <MdOutlineSpellcheck />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <BsCashCoin />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <MdOutlineDescription />
                <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                ></textarea>
              </div>
              <div>
                <MdOutlineAccountTree />
                <select onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <MdOutlineStorage />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div id="createProductFormFile">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                />
              </div>
              <Button id="createProductBtn" type="submit">
                Create
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateProduct;
