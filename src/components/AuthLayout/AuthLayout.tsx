import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import logo from "@/assets/icons/logo.svg";
import illustration1x from "@/assets/images/illustration-hero.webp";
import illustration2x from "@/assets/images/illustration-hero-2x.webp";
import authGradient from "@/assets/images/auth-gradient.svg";

import css from "./AuthLayout.module.css";

type Props = {
  title: string;
  description: string;
  linkText: string;
  linkTo: string;
  children: ReactNode;
};

export default function AuthLayout({
  title,
  description,
  linkText,
  linkTo,
  children,
}: Props) {
  return (
    <main className={css.page}>
      <div className="container">
        <div className={css.logo}>
          <img src={logo} alt="logo" className={css.logoIcon} />
          <span className={css.logoText}>VocabBuilder</span>
        </div>

        <div className={css.content}>
          <section className={css.card}>
            <h1 className={css.title}>{title}</h1>
            <p className={css.description}>{description}</p>

            {children}

            <Link to={linkTo} className={css.link}>
              {linkText}
            </Link>
          </section>

          <div className={css.illustrationWrapper}>
            <img
              className={css.illustration}
              src={illustration1x}
              srcSet={`${illustration1x} 1x, ${illustration2x} 2x`}
              alt="Illustration"
            />

            <ul className={css.wordsList}>
              <li>Word</li>
              <li>Translation</li>
              <li>Grammar</li>
              <li>Progress</li>
            </ul>
          </div>
          <img src={authGradient} alt="Gradient" className={css.gradient} />
        </div>
      </div>
    </main>
  );
}
