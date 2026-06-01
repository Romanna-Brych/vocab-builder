import { selectUser } from "@/redux/auth/selectors";
import { useAppSelector } from "@/redux/hooks";

export default function UserBar() {
  const user = useAppSelector(selectUser);

  return (
    <div>
      <span>{user?.name}</span>
    </div>
  );
}
