import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import sprite from "@/assets/icons/sprite.svg";
import { register as registerUser } from "@/redux/auth/operations";
import { useAppDispatch } from "@/redux/hooks";
import type { RegisterCredentials } from "@/types/auth";

import css from "./RegisterForm.module.css";

const schema: yup.ObjectSchema<RegisterCredentials> = yup.object({
  name: yup.string().required("Name is required"),
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

export default function RegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: RegisterCredentials) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      navigate("/dictionary");
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.field}>
        <input
          className={css.input}
          type="text"
          placeholder="Name"
          {...register("name")}
        />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}
      </div>

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
        Register
      </button>
    </form>
  );
}
