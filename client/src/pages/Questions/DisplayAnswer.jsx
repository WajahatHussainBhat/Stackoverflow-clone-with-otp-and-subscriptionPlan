import React from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import Avatar from "../../components/Avatar/Avatar";
import { deleteAnswer } from "../../actions/question";

const DisplayAnswer = ({ question, handleShare }) => {
  const User = useSelector((state) => state.currentUserReducer);
  const darkMode = useSelector((state) => state.themeReducer.darkMode);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
  };

  return (
    <div>
      {" "}
      {question &&
        question.answer &&
        question.answer.map((ans) => (
          <div className={`display-ans ${darkMode ? "display-ans-dark" : ""}`} key={ans._id}>
            <p> {ans.answerBody} </p>{" "}
            <div className="question-actions-user">
              <div>
                <button type="button" onClick={handleShare}>
                  
                  Share
                </button>
                {User?.result?._id === ans.userId && (
                  <button
                    type="button"
                    onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                  >
                    
                    Delete
                  </button>
                )}
              </div>
              <div className="">
                <p> answered {moment(ans.answeredOn).fromNow()} </p>{" "}
                <Link
                  to={`/Users/${ans.userId}`}
                  className="user-link"
                  style={{ color: "#00866d" }}
                >
                  <Avatar backgroundColor="green" px="8px" py="5px">
                    {" "}
                    {ans.userAnswered.charAt(0).toUpperCase()}{" "}
                  </Avatar>{" "}
                  <div className=""> {question.userPosted} </div>{" "}
                </Link>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        ))}{" "}
    </div>
  );
};

export default DisplayAnswer;
