
import "./LeftSidebar.css";
import "./LeftSidebarDarkMode.css";
import { NavLink } from "react-router-dom";
import Globe from "../../assets/Globe.svg";
import GlobeDark from "../../assets/GlobeDarkMode.png";
import { useSelector } from "react-redux";

const LeftSidebar = () => {
  const darkMode = useSelector((state) => state.themeReducer.darkMode);

  return (
    <div className="left-sidebar">
      <nav className="side-nav">
        <NavLink
          to="/"
          className={`side-nav-links ${darkMode ? "side-nav-links-dark" : ""}`}
          activeClassName="active"
          
        >
          <p>Home</p>
        </NavLink>
        <div className="side-nav-div">
          <div>
            {" "}
            <p> PUBLIC </p>{" "}
          </div>{" "}
          <NavLink
            to="/Questions"
            className={`side-nav-links ${darkMode ? "side-nav-links-dark" : ""}`}
            activeClassName="active"
          >
            <img src={darkMode ? GlobeDark : Globe} alt="Globe" className={`${darkMode ? "globe-dark" : ""}`}/>
            <p style={{ paddingLeft: "10px" }}> Questions </p>{" "}
          </NavLink>{" "}
          <NavLink
            to="/Tags"
            className={`side-nav-links ${darkMode ? "side-nav-links-dark" : ""}`}
            activeClassName="active"
            style={{ paddingLeft: "40px" }}
          >
            <p> Tags </p>{" "}
          </NavLink>{" "}
          <NavLink
            to="/Users"
            className={`side-nav-links ${darkMode ? "side-nav-links-dark" : ""}`}
            activeClassName="active"
            style={{ paddingLeft: "40px" }}
          >
            <p> Users </p>{" "}
          </NavLink>{" "}
          <NavLink
            to="/ChatBot"
            className={`side-nav-links ${darkMode ? "side-nav-links-dark" : ""}`}
            activeClassName="active"
            style={{ paddingLeft: "40px" }}
          >
            <p> Ask ChatBot </p>{" "}
          </NavLink>
          <NavLink
            to="/Subscription"
            className={`side-nav-links ${darkMode ? "side-nav-links-dark" : ""}`}
            activeClassName="active"
            style={{ paddingLeft: "40px" }}
          >
            <p> Subscription Plans </p>{" "}
          </NavLink>
        </div>{" "}
      </nav>{" "}
    </div>
  );
};

export default LeftSidebar;
