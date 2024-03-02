import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useMediaQuery } from "react-responsive";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import logo from "../../assets/logo.png";
import logoDark from "../../assets/logoDark.png";
import search from "../../assets/search.svg";
import Avatar from "../../components/Avatar/Avatar";
import Globe from "../../assets/Globe.svg";
import GlobeDark from "../../assets/GlobeDarkMode.png";
import "./Navbar.css";
import "./NavbarDarkMode.css";
import { setCurrentUser } from "../../actions/currentUser";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let User = useSelector((state) => state.currentUserReducer);
  const darkMode = useSelector((state) => state.themeReducer.darkMode);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [dispatch]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  const isNonMobileScreens = useMediaQuery({
    query: "(min-width:1000px)",
  });

  const isMobileScreen = useMediaQuery({
    query: "(max-width:800px)",
  });

  return (
    <nav className={`main-nav ${darkMode ? "main-nav-dark" : ""}`}>
      <div className="navbar">
        <Link
          to="/"
          className={`nav-item nav-logo ${darkMode ? "nav-item-dark" : " "}`}
        >
          <img src={darkMode ? logoDark : logo} alt="logo" />
        </Link>{" "}
        {isNonMobileScreens ? (
          <>
            <Link
              to="/"
              className={`nav-item nav-btn ${darkMode ? "nav-item-dark" : ""}`}
            >
              About
            </Link>
            <Link
              to="/"
              className={`nav-item nav-btn ${darkMode ? "nav-item-dark" : ""}`}
            >
              Products
            </Link>
            <Link
              to="/"
              className={`nav-item nav-btn ${darkMode ? "nav-item-dark" : ""}`}
            >
              For Teams
            </Link>
          </>
        ) : null}
        <form>
          <input
            type="text"
            placeholder="Search..."
            className={`${darkMode ? "dark-search" : ""}`}
          />
          <img src={search} alt="search" className="search-icon" />
        </form>{" "}
        {User === null ? (
          <Link
            to="/Auth"
            className={`nav-item nav-links  ${
              darkMode ? "nav-item-dark nav-links-dark" : " "
            }`}
          >
            {" "}
            Log in{" "}
          </Link>
        ) : (
          <>
            <Avatar
              backgroundColor="#009dff"
              px="10px"
              py="7px"
              borderRadius="50%"
              color="white"
            >
              {" "}
              <Link
                to={`/Users/${User?.result?._id}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                {" "}
                {User.result.name.charAt(0).toUpperCase()}{" "}
              </Link>{" "}
            </Avatar>{" "}
            <button
              className={`nav-item nav-links  ${
                darkMode ? "nav-item-dark nav-links-dark" : " "
              }`}
              onClick={handleLogout}
            >
              {" "}
              Log out{" "}
            </button>{" "}
          </>
        )}{" "}
        {!isNonMobileScreens ? (
          <MenuIcon
            id="menuIcon"
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          />
        ) : null}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <div className={`sideMenu ${isMobileScreen ? "sideMenu-lg" : ""} ${darkMode ? "sideMenudark" : ""}`}>
            <div className="menuHeader">
              <CloseIcon
                id="closeIcon"
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              />
            </div>
            <ul className="menuItems">
              <li>
                <NavLink to="/" className="menu-nav-link">About</NavLink>
              </li>
              <li>
                <NavLink to="/" className="menu-nav-link">Products</NavLink>
              </li>
              <li>
                <NavLink to="/" className="menu-nav-link">For Teams</NavLink>
              </li>
              {isMobileScreen && (
              <>
                <li className="question-li">
                  <img src={ GlobeDark} alt="Globe" />
                  <NavLink to="/Questions" className="menu-nav-link">Questions</NavLink>
                </li>
                <li>
                  <NavLink to="/Tags" className="menu-nav-link">Tags</NavLink>
                </li>
                <li>
                  <NavLink to="/Users" className="menu-nav-link">Users</NavLink>
                </li>
                <li>
                  <NavLink to="/ChatBot" className="menu-nav-link">Ask ChatBot</NavLink>
                </li>
                <li>
                  <NavLink to="/Subscription" className="menu-nav-link">Subscription Plans</NavLink>
                </li>
              </>
            )}
            </ul>
          </div>
        )}
      </div>{" "}
    </nav>
  );
};

export default Navbar;
