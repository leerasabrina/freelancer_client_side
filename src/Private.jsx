import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "./Contexts/AuthContext";

const Private = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/signin" />;
  return children;
};

export default Private;
