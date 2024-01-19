import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import "../styles/pages/searchPage.css";
import ErrorPage from "../components/ErrorPage";
import "../styles/components/searchbox.css";
import { Heading, VStack } from "@chakra-ui/react";
import { server } from "..";

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

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);

  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMoreProducts, setViewMoreProducts] = useState(false);

  useEffect(() => {
    const searchQuery = `${server}/product/search?searchTerm=${searchTerm}&category=${category}`;
    const fetchData = async () => {
      try {
        setLoading(true);
        setViewMoreProducts(false);
        seterror(null);
        const { data } = await axios.get(searchQuery);
        if (data.data.length > 5) {
          setViewMoreProducts(true);
        }
        setProducts(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        seterror(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTerm, category]);

  const viewMoreProductsFunc = async () => {
    try {
      const noOfProducts = products.length;
      const startIndex = noOfProducts;
      const searchQuery = `${server}/product/search?searchTerm=${searchTerm}&category=${category}&startIndex=${startIndex}`;

      const { data } = await axios.get(searchQuery);

      if (data.data.length < 5) {
        setViewMoreProducts(false);
      }
      setProducts([...products, ...data.data]);
    } catch (error) {
      console.log(error);
      seterror(true);
      setLoading(false);
    }
  };
  return (
    <div className="searchPage">
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorPage />
      ) : (
        <>
          <div className="searchBox">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search a Product"
            />
          </div>
          <div className="main">
            <div className="filterPage">
              <div className="category">
                <p className="categoryHeading">Category</p>
                <ul className="categoryBox">
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      id={`${category} ? tomato : gray`}
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="starFilter"></div>
            </div>
            <h2 className="searchHeading">Products</h2>
            <div className="searchProductContainer">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <VStack h={"45vh"} justifyContent={"center"}>
                  <Heading>NO Products Found 🔎</Heading>
                </VStack>
              )}
            </div>
            {viewMoreProducts && (
              <div className="viewMoreBtn">
                <button onClick={viewMoreProductsFunc}>
                  View more Products
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
