import { Heading, Text, VStack } from "@chakra-ui/react";
import "../styles/pages/productDetail.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <VStack h={"95vh"} justifyContent={"center"}>
        <Heading>Page not Found</Heading>
        <Text>404 Bad Request</Text>
        <Link to={"/"}>
          <button style={{ borderRadius: 0 }} className="submitReview">
            Back to Home
          </button>
        </Link>
      </VStack>
    </div>
  );
};

export default PageNotFound;
