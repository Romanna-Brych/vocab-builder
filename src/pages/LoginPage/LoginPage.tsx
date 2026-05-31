import { Link } from "react-router-dom";

import LoginForm from "@/components/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <main>
      <h1>Login</h1>
      <p>Please enter your login details to continue using our service.</p>

      <LoginForm />

      <Link to="/register">Register</Link>
    </main>
  );
}
