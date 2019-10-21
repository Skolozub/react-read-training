import React from "react";
import { Link } from "react-router-dom";
import styles from "./menu.module.scss";

const Menu = () => (
  <div className={styles.nav}>
    <Link to="/schulte" className={styles.navLink}>
      Таблица Шульте
    </Link>
    <Link to="/speedread" className={styles.navLink}>
      Скоростное чтение
    </Link>
    <Link to="/stroop" className={styles.navLink}>
      Тест Струпа
    </Link>
  </div>
);

export default Menu;
