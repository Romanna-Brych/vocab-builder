import AuthLayout from "@/components/AuthLayout/AuthLayout";
import RegisterForm from "@/components/RegisterForm/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Register"
      description="To start using our services, please fill out the registration form below. All fields are mandatory:"
      linkText="Login"
      linkTo="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
