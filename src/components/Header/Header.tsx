import { NavLink } from "react-router-dom";

import UserBar from "@/components/UserBar/UserBar";
import LogoutBtn from "@/components/LogoutBtn/LogoutBtn";

export default function Header() {
  return (
    <header>
      <NavLink to="/dictionary">VocabBuilder</NavLink>

      <nav>
        <NavLink to="/dictionary">Dictionary</NavLink>
        <NavLink to="/recommend">Recommend</NavLink>
        <NavLink to="/training">Training</NavLink>
      </nav>

      <UserBar />
      <LogoutBtn />
    </header>
  );
}
