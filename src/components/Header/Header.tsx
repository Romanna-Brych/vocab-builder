import { useState } from "react";
import { NavLink } from "react-router-dom";

import logo from "@/assets/icons/logo.svg";
import sprite from "@/assets/icons/sprite.svg";
import illustration1x from "@/assets/images/illustration-hero.webp";
import illustration2x from "@/assets/images/illustration-hero-2x.webp";

import LogoutBtn from "@/components/LogoutBtn/LogoutBtn";
import UserBar from "@/components/UserBar/UserBar";

import css from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={css.header}>
      <div className={`container ${css.headerContainer}`}>
        <NavLink to="/dictionary" className={css.logo}>
          <img src={logo} alt="" className={css.logoIcon} />
          <span className={css.logoText}>VocabBuilder</span>
        </NavLink>

        <nav className={css.desktopNav}>
          <NavLink to="/dictionary" className={css.navLink}>
            Dictionary
          </NavLink>
          <NavLink to="/recommend" className={css.navLink}>
            Recommend
          </NavLink>
          <NavLink to="/training" className={css.navLink}>
            Training
          </NavLink>
        </nav>

        <div className={css.actions}>
          <UserBar />

          <div className={css.desktopLogout}>
            <LogoutBtn />
          </div>

          <button
            type="button"
            className={css.menuBtn}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg className={css.menuIcon}>
              <use href={`${sprite}#icon-menu`} />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={css.backdrop} onClick={closeMenu}>
          <div className={css.menu} onClick={(e) => e.stopPropagation()}>
            <div className={css.menuTop}>
              <UserBar variant="light" />

              <button
                type="button"
                className={css.closeBtn}
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <svg className={css.closeIcon}>
                  <use href={`${sprite}#icon-close`} />
                </svg>
              </button>
            </div>

            <div className={css.menuContent}>
              <nav className={css.mobileNav}>
                <NavLink
                  to="/dictionary"
                  onClick={closeMenu}
                  className={css.mobileNavLink}
                >
                  Dictionary
                </NavLink>

                <NavLink
                  to="/recommend"
                  onClick={closeMenu}
                  className={css.mobileNavLink}
                >
                  Recommend
                </NavLink>

                <NavLink
                  to="/training"
                  onClick={closeMenu}
                  className={css.mobileNavLink}
                >
                  Training
                </NavLink>
              </nav>

              <LogoutBtn variant="light" />
            </div>

            <img
              className={css.menuImage}
              src={illustration1x}
              srcSet={`${illustration1x} 1x, ${illustration2x} 2x`}
              alt=""
            />
          </div>
        </div>
      )}
    </header>
  );
}
