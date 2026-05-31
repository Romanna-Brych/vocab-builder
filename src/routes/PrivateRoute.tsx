import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "@/redux/auth/selectors";
import { useAppSelector } from "@/redux/hooks";

type Props = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: Props) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? children : <Navigate to="/login" />;
};
