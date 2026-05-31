import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login } from "@/redux/auth/operations";
import { useAppDispatch } from "@/redux/hooks";
import type { LoginCredentials } from "@/types/auth";

const schema: yup.ObjectSchema<LoginCredentials> = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
      "Password must contain 6 letters, 1 number and be 7 characters long",
    ),
});

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: LoginCredentials) => {
    try {
      await dispatch(login(values)).unwrap();
      navigate("/dictionary");
    } catch {
      toast.error("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" placeholder="Email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" placeholder="Password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        Login
      </button>
    </form>
  );
}
