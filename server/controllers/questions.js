import Questions from "../models/questions.js"
import User from "../models/auth.js"
import mongoose from "mongoose";
import moment from "moment";

export const AskQuestion = async (req, res) => {
    const { userId, questionTitle, questionBody, questionTags, userPosted } = req.body;
  
    try {
      // Retrieve user's subscription details
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Determine daily posting limit based on subscription plan
      let dailyPostingLimit;
      switch (user.subscription.planType) {
        case 'silver':
          dailyPostingLimit = 5;
          break;
        case 'gold':
          dailyPostingLimit = Infinity; // Unlimited
          break;
        case 'free':
        default:
          dailyPostingLimit = 1;
          break;
      }
  
      // Calculate start of the current day
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
  
      // Query questions posted by the user in the last 24 hours
      const questionCount = await Questions.countDocuments({
        userId: userId,
        askedOn: { $gte: startOfDay }
      });
  
      // Check if the user has exceeded the daily posting limit
      if (questionCount >= dailyPostingLimit) {
        return res.status(403).json({ message: "Daily posting limit exceeded" });
      }
  
      // Post the question
      const newQuestion = new Questions({
        questionTitle,
        questionBody,
        questionTags,
        userPosted,
        userId,
      });
      await newQuestion.save();
  
      res.status(200).json({ message: "Question posted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

export const getAllQuestions = async(req, res) => {
    try {
        const questionList = await Questions.find();
        res.status(200).json(questionList)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

export const deleteQuestion = async(req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...");
    }
    try {
        await Questions.findByIdAndDelete(_id);
        res.status(200).json({ message: "Question deleted successfully..." })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const voteQuestion = async(req, res) => {
    const { id: _id } = req.params;
    const { value, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...");
    }

    try {
        const question = await Questions.findById(_id)
        const upIndex = question.upVote.findIndex((id) => id === String(userId))
        const downIndex = question.downVote.findIndex((id) => id === String(userId))

        if (value === 'upVote') {
            if (downIndex !== -1) {
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
            if (upIndex === -1) {
                question.upVote.push(userId)
            } else {
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
        } else if (value === 'downVote') {
            if (upIndex !== -1) {
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
            if (downIndex === -1) {
                question.downVote.push(userId)
            } else {
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
        }
        await Questions.findByIdAndUpdate(_id, question)
        res.status(200).json({ message: "voted successfully... " })
    } catch (error) {
        res.status(404).json({ message: "id not found" })
    }

}