import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import "./Header.css";

const Header = () => {
  return (
    <div className='HeaderRoot'>
      <Link to='/'>
        <img src='/logos/abstract_people.png' alt='people logo' />
      </Link>
      <Menu />
    </div>
  );
};

export default Header;
