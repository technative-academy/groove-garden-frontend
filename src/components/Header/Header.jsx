import style from "./Header.module.css";

import down_arrow from "../../assets/icons/down_arrow.svg";
import profile_icon from "../../assets/icons/logo.svg";
import logo from "../../assets/icons/logo.png";
import search_icon from "../../assets/icons/search.svg";

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toggleActive } from "../../redux/loginState";
import authService from "../services/authService";

import LoginModal from "../LoginModal/LoginModal";

function Header() {
  let location = useLocation();
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.login.active);
  const loggedIn = authService.isLoggedIn();
  return (
    <>
      {isActive && <LoginModal />}
      <div className={style.container}>
        <div className={style.topWrapper}>
          <div className={style.logo}>
            <img className={style.logo__image} src={logo} alt="Company" />
          </div>
          {loggedIn === true ? (
            <>
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
            </>
          ) : (
            <>
              <NavLink className={style.register} to="/register">
                <button>Register</button>
              </NavLink>
              <button
                onClick={() => {
                  dispatch(toggleActive());
                }}
                className={style.login}
              >
                Login In
              </button>
            </>
          )}
        </div>
        <div className={style.subheader}>
          <button className={style.button}>New Collection</button>
          <div className={style.links}>
            <ul className={style.list}>
              <li className={style.item}>
                <NavLink
                  className={`${style.itemText} ${
                    location.pathname === "/" ? style.itemTextActive : ""
                  }`}
                  to="/"
                >
                  All Collections
                </NavLink>
              </li>
              <li className={style.item}>
                <NavLink
                  className={`${style.itemText} ${
                    location.pathname === "/artists" ? style.itemTextActive : ""
                  }`}
                  to="/artists"
                >
                  Artists
                </NavLink>
              </li>
              {loggedIn === true ? (
                <>
                  <li className={style.item}>
                    <NavLink
                      className={`${style.itemText} ${
                        location.pathname === "/my-collections"
                          ? style.itemTextActive
                          : ""
                      }`}
                      to="/my-collections"
                    >
                      My Collections
                    </NavLink>
                  </li>
                  <li className={style.item}>
                    <NavLink
                      className={`${style.itemText} ${
                        location.pathname === "/upload-song"
                          ? style.itemTextActive
                          : ""
                      }`}
                      to="/upload-song"
                    >
                      Upload Song
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
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
