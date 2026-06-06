import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import sprite from "@/assets/icons/sprite.svg";
import { login } from "@/redux/auth/operations";
import { useAppDispatch } from "@/redux/hooks";
import type { LoginCredentials } from "@/types/auth";

import css from "./LoginForm.module.css";

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.field}>
        <input
          className={css.input}
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>

      <div className={css.field}>
        <input
          className={`${css.input} ${css.passwordInput}`}
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Password"
          {...register("password")}
        />

        <button
          type="button"
          className={css.eyeBtn}
          onClick={() => setIsPasswordVisible((prev) => !prev)}
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        >
          <svg className={css.eyeIcon}>
            <use
              href={`${sprite}#${
                isPasswordVisible ? "icon-eye-off" : "icon-eye"
              }`}
            />
          </svg>
        </button>

        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}
      </div>

      <button className={css.button} type="submit" disabled={isSubmitting}>
        Login
      </button>
    </form>
  );
}
