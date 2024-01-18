import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = () => {
  const { user } = useSelector((state) => state.user);

  return user.role !== "admin" ? <Navigate to="/" /> : <Outlet />;
};

export default AdminProtectedRoute;
