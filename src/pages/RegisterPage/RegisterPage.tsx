import { Link } from "react-router-dom";

import RegisterForm from "@/components/RegisterForm/RegisterForm";

export default function RegisterPage() {
  return (
    <main>
      <h1>Register</h1>
      <p>To start using our services, please fill out the registration form.</p>

      <RegisterForm />

      <Link to="/login">Login</Link>
    </main>
  );
}
