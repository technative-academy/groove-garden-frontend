import style from "./Header.module.css";

import down_arrow from "../../assets/icons/down_arrow.svg";
import profile_icon from "../../assets/icons/logo.svg";
import logo from "../../assets/icons/logo.png";
import search_icon from "../../assets/icons/search.svg";

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginToggleActive } from "../../redux/uiState";
import authService from "../services/authService";
import LoginModal from "../LoginModal/LoginModal";

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();

  // const isLoginModalOpen = useSelector((state) => state.login.active);

  const isLoginModalOpen = useSelector((state) => state.ui.loginActive);
  // console.log(isLoginModalOpen);

  const isLoggedIn = authService.isLoggedIn();

  const navItem = (path, label) => (
    <li className={style.item}>
      <NavLink
        to={path}
        className={`${style.itemText} ${
          location.pathname === path ? style.itemTextActive : ""
        }`}
      >
        {label}
      </NavLink>
    </li>
  );

  const AuthButtons = () =>
    isLoggedIn ? (
      <div className={style.profile}>
        <img
          className={style.profile__picture}
          src={profile_icon}
          alt="Profile"
        />
        <p className={style.profile__name}>Profile</p>
        <img
          className={style.profile__dropdown}
          src={down_arrow}
          alt="dropdown"
        />
      </div>
    ) : (
      <>
        <NavLink className={style.register} to="/register">
          <button>Register</button>
        </NavLink>

        <button
          onClick={() => dispatch(loginToggleActive())}
          className={style.login}
        >
          Login
        </button>
      </>
    );

  return (
    <>
      {isLoginModalOpen && <LoginModal />}

      <div className={style.container}>
        <div className={style.topWrapper}>
          <div className={style.logo}>
            <img className={style.logo__image} src={logo} alt="Company" />
          </div>

          <AuthButtons />
        </div>

        <div className={style.subheader}>
          <button className={style.button}>New Collection</button>

          <ul className={style.list}>
            {navItem("/", "All Collections")}
            {navItem("/artists", "Artists")}
            {isLoggedIn && navItem("/my-playlist", "My Playlist")}
            {isLoggedIn && navItem("/upload-song", "Upload Song")}
          </ul>
        </div>

        <div className={style.searchWrapper}>
          <div className={style.search}>
            <input
              className={style.input}
              type="text"
              placeholder="Search Collection"
            />
            <img className={style.searchIcon} src={search_icon} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
