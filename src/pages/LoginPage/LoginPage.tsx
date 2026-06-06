import AuthLayout from "@/components/AuthLayout/AuthLayout";
import LoginForm from "@/components/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Login"
      description="Please enter your login details to continue using our service:"
      linkText="Register"
      linkTo="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
}
