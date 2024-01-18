import axios from "axios";
import userImage from "../images/Profile.png";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";

const ReviewCard = ({ review, canDelete, productId }) => {
  const reviewDeleteHandler = async () => {
    try {
      await axios.patch(
        "http://localhost:5000/product/review",
        { id: productId },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      toast.success("We will remove review in few moments");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="reviewCard">
      <div>
        {canDelete && (
          <span onClick={reviewDeleteHandler} id="deleteReview">
            Delete
          </span>
        )}
        <img
          src={
            review.avatar ? `http://localhost:5000/${review.avatar}` : userImage
          }
          alt="User"
        />
        <p>{review.name}</p>
      </div>
      <div>
        <ReactStars
          edit={false}
          color="rgb(100, 100, 100)"
          activeColor="orange"
          value={review.rating}
          isHalf={true}
          size={window.innerWidth > 600 ? 25 : 20}
        />
        <span className="reviewCardComment">{review.comment}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
