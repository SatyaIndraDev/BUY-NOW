import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "./AuthContext";

function PrivateRoutes({ children }) {
  const { auth } = useContext(Context);

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoutes;
