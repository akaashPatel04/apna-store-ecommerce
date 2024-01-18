import { useState } from "react";
import "../styles/admin/CreateProduct.css";
import { toast } from "react-toastify";
import { Button } from "@chakra-ui/react";
import SideBar from "./Sidebar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsCashCoin } from "react-icons/bs";
import {
  MdOutlineSpellcheck,
  MdOutlineDescription,
  MdOutlineAccountTree,
  MdOutlineStorage,
} from "react-icons/md";

const EditProduct = () => {
  const { products } = useSelector((state) => state.admin);
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((i) => i._id === id);

  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? product.price : 0);
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [category, setCategory] = useState(product ? product.category : "");
  const [stock, setStock] = useState(product ? product.stock : 0);
  const [avatar, setImage] = useState(product ? product.image : null);

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

  const updateProductSubmitHandler = async (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("avatar", avatar);

    try {
      await axios.put(`http://localhost:5000/product/${id}`, myForm, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product Updated Successfully");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="container">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Edit Product</h1>
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
                value={price}
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
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="category">Choose Category</option>
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
                value={stock}
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
              Update
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
