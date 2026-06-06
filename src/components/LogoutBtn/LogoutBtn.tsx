import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import { logout } from "@/redux/auth/operations";
import { useAppDispatch } from "@/redux/hooks";

import css from "./LogoutBtn.module.css";
import sprite from "@/assets/icons/sprite.svg";

type Props = {
  variant?: "default" | "light";
};

export default function LogoutBtn({ variant = "default" }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    navigate("/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={clsx(css.button, css[variant])}
    >
      <span>Log out</span>

      <svg className={css.icon}>
        <use href={`${sprite}#icon-switch-horizontal-01`} />
      </svg>
    </button>
  );
}
