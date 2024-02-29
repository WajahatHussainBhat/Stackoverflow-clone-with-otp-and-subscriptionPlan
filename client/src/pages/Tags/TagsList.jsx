import React from "react";
import "./Tags.css";
import "./TagsDarkMode.css"
import { useSelector } from "react-redux";

const TagsList = ({ tag }) => {
  const darkMode = useSelector((state) => state.themeReducer.darkMode);
  return (
    <div className={`tag ${darkMode ? "tag-dark" : ""}`}>
      <h5>{tag.tagName}</h5>
      <p>{tag.tagDesc}</p>
    </div>
  );
};

export default TagsList;
