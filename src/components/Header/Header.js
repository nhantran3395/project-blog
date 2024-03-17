"use client";
import React from "react";
import Cookie from "js-cookie";
import clsx from "clsx";
import { Rss, Sun, Moon } from "react-feather";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";
import { LIGHT_TOKENS, DARK_TOKENS, COOKIES } from "@/constants";

import styles from "./Header.module.css";

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    const newTokens = next === "light" ? LIGHT_TOKENS : DARK_TOKENS;
    const root = document.documentElement;
    root.setAttribute("data-color-theme", next);
    Object.entries(newTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    setTheme(next);
    Cookie.set(COOKIES.THEME, next, {
      expires: 1000,
    });
  }

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button className={styles.action}>
          {theme === "light" ? (
            <Sun size="1.5rem" onClick={toggleTheme} />
          ) : (
            <Moon size="1.5rem" onClick={toggleTheme} />
          )}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;