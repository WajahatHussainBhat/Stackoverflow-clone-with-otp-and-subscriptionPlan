import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import moment from "moment";
import { darkMode, lightMode } from "./actions/theme";
import { updateSubscriptionDefault } from "./actions/subscription";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateSubscriptionDefault());
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    dispatch(updateSubscriptionDefault());
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    const currentTime = moment();
    const nightStart = moment("18:00", "HH:mm"); // 6 PM
    const nightEnd = moment("06:00", "HH:mm"); // 6 AM
    let isNight = false;

    if (
      currentTime.isSameOrAfter(nightStart) ||
      currentTime.isBefore(nightEnd)
    ) {
      isNight = true;
    }

    if (isNight) {

      dispatch(darkMode());
    } else {
      dispatch(lightMode());
    }
  }, [dispatch, darkMode, lightMode]);

  const darkModeTrue = useSelector((state) => state.themeReducer.darkMode);

  return (
    <div className={`App ${darkModeTrue ? "darkMode" : ""}`}>
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>{" "}
    </div>
  );
}

export default App;
