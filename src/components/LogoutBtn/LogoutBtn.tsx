import { useNavigate } from "react-router-dom";

import { logout } from "@/redux/auth/operations";
import { useAppDispatch } from "@/redux/hooks";

export default function LogoutBtn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    navigate("/login");
  };

  return (
    <button type="button" onClick={handleLogout}>
      Log out
    </button>
  );
}
