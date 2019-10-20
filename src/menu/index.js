import React from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "./menu.module.scss";

const Menu = () => (
  <div className={styles.nav}>
    <Link to={`?training=schulte`} className={styles.navLink}>
      Таблица Шульте
    </Link>
    <Link to={`?training=speedread`} className={styles.navLink}>
      Скоростное чтение
    </Link>
    <Link to={`?training=stroop`} className={styles.navLink}>
      Тест Струпа
    </Link>
  </div>
);

export default Menu;
