import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./HomeMainbar.css";
import "./HomeMainbarDarkMode.css";

import QuestionList from "./QuestionList";

const HomeMainbar = () => {
  const location = useLocation();
  const user = 1;
  const navigate = useNavigate();

  const questionList = useSelector((state) => state.questionReducer);
  const darkMode = useSelector((state) => state.themeReducer.darkMode);


  // var questionList = [{
  //         _id: 1,
  //         upVotes: 3,
  //         downVotes: 2,
  //         noOfAnswers: 2,
  //         questionTitle: "What is a function",
  //         questionBody: "Ti meant to be ",
  //         questionTags: ["java", "node js", "mongodb", "javascript"],
  //         userPosted: "mano",
  //         userId: 1,
  //         askedOn: "jan 1",
  //         answers: [{
  //             answerBody: "Answer",
  //             userAnswered: "kumar",
  //             answeredOn: "jan2",
  //             userId: 2,
  //         }, ],
  //     },
  //     {
  //         _id: 2,
  //         upVotes: 3,
  //         downVotes: 2,
  //         noOfAnswers: 4,
  //         questionTitle: "What is a function",
  //         questionBody: "Ti meant to be ",
  //         questionTags: ["java", "node js", "mongodb", "javascript"],
  //         userPosted: "mano",
  //         userId: 1,
  //         askedOn: "jan 1",
  //         answers: [{
  //             answerBody: "Answer",
  //             userAnswered: "kumar",
  //             answeredOn: "jan2",
  //             userId: 2,
  //         }, ],
  //     },
  //     {
  //         _id: 3,
  //         upVotes: 3,
  //         downVotes: 2,
  //         noOfAnswers: 4,
  //         questionTitle: "What is a function",
  //         questionBody: "Ti meant to be ",
  //         questionTags: ["java", "node js", "mongodb", "javascript"],
  //         userPosted: "mano",
  //         userId: 1,
  //         askedOn: "jan 1",
  //         answers: [{
  //             answerBody: "Answer",
  //             userAnswered: "kumar",
  //             answeredOn: "jan2",
  //             userId: 2,
  //         }, ],
  //     },
  // ];

  const checkAuth = () => {
    if (user === null) {
      alert("login or signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };

  return (
    <div className="main-bar">
      <div className={`main-bar-header ${darkMode ? "main-bar-header-dark" : ""}`}>
        {" "}
        {location.pathname === "/" ? (
          <h1> Top Questions </h1>
        ) : (
          <h1> All Questions </h1>
        )}{" "}
        <button onClick={checkAuth} className="ask-btn">
          Ask Question{" "}
        </button>{" "}
      </div>{" "}
      <div className="">
        {" "}
        {questionList.data === null ? (
          <h1> Loading... </h1>
        ) : (
          <>
            <p>
              {" "}
              {questionList.data.length} {""}
              questions{" "}
            </p>{" "}
            <QuestionList questionsList={questionList.data} />{" "}
          </>
        )}{" "}
      </div>{" "}
    </div>
  );
};

export default HomeMainbar;
