import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.user);
  return !user ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoute;
