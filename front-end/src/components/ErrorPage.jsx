import React from "react";
import { toast } from "react-toastify";

const ErrorPage = () => {
  toast.error("Something went Wrong");
  return <div></div>;
};

export default ErrorPage;
