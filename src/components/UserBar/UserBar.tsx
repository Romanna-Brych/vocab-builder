import sprite from "@/assets/icons/sprite.svg";
import { selectUser } from "@/redux/auth/selectors";
import { useAppSelector } from "@/redux/hooks";

import css from "./UserBar.module.css";

type Props = {
  variant?: "default" | "light";
};

export default function UserBar({ variant = "default" }: Props) {
  const user = useAppSelector(selectUser);

  return (
    <div className={`${css.userBar} ${css[variant]}`}>
      <span className={css.userName}>{user?.name}</span>

      <span className={css.avatar} aria-hidden="true">
        <svg className={css.icon}>
          <use href={`${sprite}#icon-user`} />
        </svg>
      </span>
    </div>
  );
}
