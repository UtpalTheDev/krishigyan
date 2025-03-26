import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useLogin } from "./reducer-context/LoginContext";

export default function PrivateRoute() {
  const { isUserLogIn } = useLogin();
  const location = useLocation();
  
  if (!isUserLogIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  return <Outlet />;
}