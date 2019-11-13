import React from "react";
import Container from "../../atoms/container";
import Logo from "../../atoms/logo";
import styles from "./header.module.scss";

const Header = () => (
  <div className={styles.header}>
    <Container>
      <div className={styles.wrapper}>
        <a href="/">
          <Logo />
        </a>
        <a
          className={styles.link}
          href="/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Вернуться на сайт →
        </a>
      </div>
    </Container>
  </div>
);

export default Header;
