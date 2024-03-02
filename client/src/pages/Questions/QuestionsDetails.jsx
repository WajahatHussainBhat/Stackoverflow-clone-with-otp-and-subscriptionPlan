import React, { useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import copy from "copy-to-clipboard";

import upVote from "../../assets/sort-up.svg";
import downVote from "../../assets/sort-down.svg";
import upVoteDark from "../../assets/sort-up-white.png";
import downVoteDark from "../../assets/sort-down-white.png";
import "./Questions.css";
import "./QuestionsDarkMode.css"
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import {
  postAnswer,
  deleteQuestion,
  voteQuestion,
} from "../../actions/question.js";

const QuestionsDetails = () => {
  const { id } = useParams();

  const questionList = useSelector((state) => state.questionReducer);
  const darkMode = useSelector((state) => state.themeReducer.darkMode);

  //   var questionList = [
  //     {
  //       _id: "1",
  //       upVotes: 3,
  //       downVotes: 2,
  //       noOfAnswers: 2,
  //       questionTitle: "What is a function",
  //       questionBody: "It meant to be ",
  //       questionTags: ["java", "node js", "mongodb", "javascript"],
  //       userPosted: "mano",
  //       userId: 1,
  //       askedOn: "jan 1",
  //       answers: [
  //         {
  //           answerBody: "Answer",
  //           userAnswered: "kumar",
  //           answeredOn: "jan2",
  //           userId: 2,
  //         },
  //       ],
  //     },
  //     {
  //       _id: "2",
  //       upVotes: 3,
  //       downVotes: 2,
  //       noOfAnswers: 4,
  //       questionTitle: "What is a function",
  //       questionBody: "It meant to be ",
  //       questionTags: ["java", "node js", "mongodb", "javascript"],
  //       userPosted: "mano",
  //       userId: 1,
  //       askedOn: "jan 1",
  //       answers: [
  //         {
  //           answerBody: "Answer",
  //           userAnswered: "kumar",
  //           answeredOn: "jan2",
  //           userId: 2,
  //         },
  //       ],
  //     },
  //     {
  //       _id: "3",
  //       upVotes: 3,
  //       downVotes: 2,
  //       noOfAnswers: 4,
  //       questionTitle: "What is a function",
  //       questionBody: "It meant to be ",
  //       questionTags: ["java", "node js", "mongodb", "javascript"],
  //       userPosted: "mano",
  //       userId: 1,
  //       askedOn: "jan 1",
  //       answers: [
  //         {
  //           answerBody: "Answer",
  //           userAnswered: "kumar",
  //           answeredOn: "jan2",
  //           userId: 2,
  //         },
  //       ],
  //     },
  //   ];

  const [Answer, setAnswer] = useState("");
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const url = "https://stackoverflow-clone-with-otp-and.onrender.com";

  const handlePostAnswer = (e, answerLength) => {
    e.preventDefault();
    
    if (User === null) {
      alert("Login or Signup to answer our question");
      navigate("/Auth");
    } else {
      if (Answer === "") {
        alert("Enter an answer before submitting");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: Answer,
            userAnswered: User?.result?.name,
            userId: User?.result?._id,
          })
        );
      }
    }
  };

  const handleShare = () => {
    copy(url + location.pathname);
    alert("Copied url : " + url + location.pathname);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate));
  };

  const handleUpVote = () => {
    if (User === null) {
      alert("Login or Signup to up vote a question");
      navigate("/Auth");
    } else {
      dispatch(voteQuestion(id, "upVote"));
    }
  };

  const handleDownVote = () => {
    if (User === null) {
      alert("Login or Signup to down vote a question");
      navigate("/Auth");
    } else {
      dispatch(voteQuestion(id, "downVote"));
    }
  };

  return (
    <div className="question-details-page">
      {" "}
      {questionList.data === null ? (
        <h1> Loading... </h1>
      ) : (
        <>
          {" "}
          {questionList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className={`question-details-container ${darkMode ? "question-details-container-dark" : ""}`}>
                  <h1> {question.questionTitle} </h1>{" "}
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={darkMode ? upVoteDark : upVote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleUpVote}
                      />{" "}
                      <p>
                        {" "}
                        {question.upVote.length - question.downVote.length}{" "}
                      </p>{" "}
                      <img
                        src={darkMode ? downVoteDark : downVote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleDownVote}
                      />{" "}
                    </div>{" "}
                    <div className="" style={{ width: "100%" }}>
                      <p> {question.questionBody} </p>{" "}
                      <div className="question-details-tags">
                        {" "}
                        {question.questionTags.map((tag) => (
                          <p key={tag}> {tag} </p>
                        ))}{" "}
                      </div>{" "}
                      <div className={`question-actions-user ${darkMode ? "question-actions-user-dark" : ""}`}>
                        <div>
                          <button type="button" onClick={handleShare}>
                            {" "}
                            Share{" "}
                          </button>{" "}
                          {User?.result._id === question.userId && (
                            <button type="button" onClick={handleDelete}>
                              {" "}
                              Delete{" "}
                            </button>
                          )}{" "}
                        </div>{" "}
                        <div>
                          <p> asked {moment(question.askedOn).fromNow()} </p>{" "}
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#00866d" }}
                          >
                            <Avatar backgroundColor="orange" px="8px" py="5px">
                              {" "}
                              {question.userPosted.charAt(0).toUpperCase()}{" "}
                            </Avatar>{" "}
                            <div className=""> {question.userPosted} </div>{" "}
                          </Link>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </section>{" "}
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>
                      {" "}
                      {question.noOfAnswers} {""}
                      Answers{" "}
                    </h3>{" "}
                    <DisplayAnswer
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />{" "}
                  </section>
                )}{" "}
                <section className={`post-ans-container ${darkMode ? "post-ans-container-dark" : ""}`}>
                  <h3> Your Answer </h3>{" "}
                  <form
                    onSubmit={(e) => {
                      handlePostAnswer(e, question.answer.length);
                    }}
                  >
                    <textarea
                      name=""
                      value={Answer}
                      id=""
                      cols="30"
                      rows="10"
                      onChange={(e) => setAnswer(e.target.value)}
                    >
                      {" "}
                    </textarea>{" "}
                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>{" "}
                  <p>
                    Browse other Question tagged{" "}
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}{" "}
                    or{" "}
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" , color: darkMode && "#939292"}}
                    >
                      {" "}
                      ask your own question.{" "}
                    </Link>{" "}
                  </p>{" "}
                </section>{" "}
              </div>
            ))}{" "}
        </>
      )}{" "}
    </div>
  );
};

export default QuestionsDetails;
