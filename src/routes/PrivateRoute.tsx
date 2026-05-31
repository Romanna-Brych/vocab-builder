import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: Props) => {
  const isLoggedIn = true;

  return isLoggedIn ? children : <Navigate to="/login" />;
};
