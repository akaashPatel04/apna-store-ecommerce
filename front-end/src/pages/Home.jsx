import { useEffect, useState } from "react";
import "../styles/pages/home.css";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import Loader from "../components/Loader";
import { CgMouse } from "react-icons/cg";
import ErrorPage from "../components/ErrorPage";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFunc = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(
          "http://localhost:5000/product/search"
        );
        setLoading(false);
        setProducts(data.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };
    fetchFunc();
  }, []);

  return (
    <>
      <div className="hero">
        <p>
          Find <span>Amazing</span> products.
        </p>
        <h1>Apna Store</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse className="mouseIcon" />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      {error ? (
        <ErrorPage />
      ) : (
        <div id="container">
          {loading ? (
            <Loader />
          ) : (
            products &&
            products.length > 0 && (
              <>
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </>
            )
          )}
        </div>
      )}
    </>
  );
};

export default Home;
