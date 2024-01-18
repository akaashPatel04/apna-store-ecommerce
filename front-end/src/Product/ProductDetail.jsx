import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import "../styles/pages/productDetail.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { Heading, Text, VStack } from "@chakra-ui/react";

const ProductDetail = () => {
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const removeQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    const val = quantity - 1;
    setQuantity(val);
  };

  const addQuantity = () => {
    if (product.stock <= quantity) {
      toast.error("Item out of Stock");
      return;
    }
    const val = quantity + 1;
    setQuantity(val);
  };

  const addToCartFunc = () => {
    const item = {
      product: product._id,
      name: product.name,
      quantity,
      price: product.price,
      stock: product.stock,
      image: product.image,
    };
    let prev = JSON.parse(localStorage.getItem("cartItem"));

    let itemExist;
    if (prev) {
      itemExist = prev.find((i) => i.product === item.product);
    }
    if (itemExist) {
      itemExist.quantity = item.quantity;
      prev = prev.map((i) => (i.product === itemExist.product ? itemExist : i));
    } else if (prev) {
      prev.push(item);
    } else {
      prev = [item];
    }
    toast.success("Added to Cart");
    dispatch(cartAction(prev));
  };

  //Loading product
  useEffect(() => {
    //Fetching Product
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`http://localhost:5000/product/${id}`);
        setProduct(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error.response.data.message);
        toast.error("Something went wrong");
      }
    };
    fetchProduct();

    //Fetching all Reviews
    const fetchReview = async () => {
      try {
        setError(null);
        const res = await axios.get(
          `http://localhost:5000/product/review/${id}`
        );
        setReviews(res.data.data);
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      }
    };
    fetchReview();
  }, []);

  const reviewHandleToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = async (e) => {
    try {
      if (!user) {
        e.preventDefault();
        toast.error("Please login to add Review");
        setOpen(false);
        return;
      }
      await axios.put(
        "http://localhost:5000/product/review",
        {
          productId: product._id,
          comment,
          rating,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <>
      {!error ? (
        <>
          <div className="ProductDetails">
            {loading ? (
              <Loader />
            ) : (
              <>
                <div>
                  <img
                    className="CarouselImage"
                    src={`http://localhost:5000/${product.image}`}
                    alt={`Product Image`}
                  />
                </div>
                <div>
                  <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                  </div>
                  <div className="detailsBlock-2">
                    <ReactStars
                      edit={false}
                      color="rgb(100, 100, 100)"
                      activeColor="rgb(250,200,50)"
                      value={product.ratings}
                      isHalf={true}
                      size={window.innerWidth > 600 ? 25 : 20}
                    />
                    <span className="detailsBlock-2-span">
                      {" "}
                      ({product.numOfReviews} Reviews)
                    </span>
                  </div>
                  <div className="detailsBlock-3">
                    <h1>{`₹${product.price}`}</h1>
                    <div className="detailsBlock-3-1">
                      <div className="detailsBlock-3-1-1">
                        <button onClick={removeQuantity}>-</button>
                        <input readOnly type="number" value={quantity} />
                        <button onClick={addQuantity}>+</button>
                      </div>
                      <button
                        disabled={product.stock < 1 ? true : false}
                        onClick={addToCartFunc}
                      >
                        Add to Cart
                      </button>
                    </div>
                    <p>
                      Stock:{" "}
                      <b
                        className={
                          product.stock < 1
                            ? "redColor"
                            : product.stock < 10
                            ? "yellowColor"
                            : "greenColor"
                        }
                      >
                        {product.stock < 1 ? "OutOfStock" : product.stock}
                      </b>
                    </p>
                  </div>
                  <div className="detailsBlock-4">
                    <b>Description</b> : <p>{product.description}</p>
                  </div>
                  <button onClick={reviewHandleToggle} className="submitReview">
                    Add Review
                  </button>
                </div>
                {open && (
                  <div className="submitDialog">
                    <form onSubmit={reviewSubmitHandler} className="area">
                      <textarea
                        className="submitDialogTextArea"
                        placeholder="Say something about product"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                      />
                      <ReactStars
                        color="rgb(100, 100, 100)"
                        activeColor="rgb(250,200,50)"
                        value={rating}
                        onChange={(e) => setRating(e)}
                        size={window.innerWidth > 600 ? 30 : 25}
                      />
                      <div>
                        <button type="button" onClick={reviewHandleToggle}>
                          CANCEL
                        </button>
                        <button type="submit">SUBMIT</button>
                      </div>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          {reviews.length > 0 ? (
            <div className="reviews">
              {reviews.map((review) => {
                let canDelte = false;
                if (user && review.user === user._id) {
                  canDelte = true;
                }
                return (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    canDelete={canDelte}
                    productId={product._id}
                  />
                );
              })}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet.</p>
          )}
        </>
      ) : (
        <VStack h={"65vh"} justifyContent={"center"}>
          <Heading>NO Product Found</Heading>
          <Text>404 Bad Request</Text>
          <Link to={"/"}>
            <button style={{ borderRadius: 0 }} className="submitReview">
              Back to Home
            </button>
          </Link>
        </VStack>
      )}
    </>
  );
};

export default ProductDetail;
