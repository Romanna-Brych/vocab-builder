import { Navigate } from "react-router-dom";

import { selectIsLoggedIn } from "@/redux/auth/selectors";
import { useAppSelector } from "@/redux/hooks";

type Props = {
  children: React.ReactNode;
  redirectTo?: string;
};

export const RestrictedRoute = ({
  children,
  redirectTo = "/dictionary",
}: Props) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : children;
};
