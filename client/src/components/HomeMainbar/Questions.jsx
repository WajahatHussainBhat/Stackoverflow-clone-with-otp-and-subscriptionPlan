import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";

const Questions = ({ question }) => {
  const darkMode = useSelector((state) => state.themeReducer.darkMode);

  return (
    <div className={`display-question-container ${darkMode ? "display-question-container-dark" : ""}`}>
      <div className="display-votes-ans">
        <p> {question.upVote.length - question.downVote.length} </p>{" "}
        <p> votes </p>{" "}
      </div>{" "}
      <div className="display-votes-ans">
        <p> {question.noOfAnswers} </p> <p> answers </p>{" "}
      </div>{" "}
      <div className="display-question-details">
        <Link to={`/Questions/${question._id}`} className={`question-title-link ${darkMode ? "question-title-link-dark" : ""}`}>
          {" "}
          {question.questionTitle}{" "}
        </Link>{" "}
        <div className={`display-tags-time ${darkMode ? "display-tags-time-dark" : ""}`}>
          <div className="display-tags">
            {" "}
            {question.questionTags.map((tag) => (
              <p key={tag}> {tag} </p>
            ))}{" "}
          </div>{" "}
          <p className="display-time">
            {" "}
            asked {moment(question.askedOn).fromNow()} {question.userPosted}{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Questions;
