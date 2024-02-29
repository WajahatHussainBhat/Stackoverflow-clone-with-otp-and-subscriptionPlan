import React from "react";
import { useSelector } from "react-redux";

const WidgetTags = () => {
  const tags = [
    "c",
    "c++",
    "express",
    "firebase",
    "mongodb",
    "html",
    "css",
    "javascript",
    "java",
    "mysql",
    "nodejs",
    "nextjs",
    "php",
    "reactjs",
    "python",
    "mern",
  ];

  const darkMode = useSelector((state) => state.themeReducer.darkMode);

  return (
    <div className={`widget-tags ${darkMode ? "widget-tags-dark" : ""}`}>
      <h4> Watched tags </h4>{" "}
      <div className={`widget-tags-div ${darkMode ? "widget-tags-div-dark" : ""}`}>
        {" "}
        {tags.map((tag) => (
          <p key={tag}> {tag} </p>
        ))}{" "}
      </div>
    </div>
  );
};

export default WidgetTags;
