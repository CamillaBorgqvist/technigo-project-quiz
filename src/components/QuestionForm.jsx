import data from "../data.json"
import { useState } from "react";

export const QuestionForm = ({userName}) => {
    const questionList = data.questions;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //current question shown
    const [selectedAnswer, setSelectedAnswer] = useState(""); //save user answer
    const [userAnswers, setUserAnswers] = useState([]); //saves answer as object in array
    const [showResult, setShowResult] = useState(false); //show result when true

    const currentQuestion = questionList[currentQuestionIndex]; //gets the right question based on index

    //Saves answer, check if correct and goes to next question
    const handleNext = () => {
      setUserAnswers([
        ...userAnswers, // copy previous answers, creates new array, adds new answer
        {
          questionId: currentQuestion.id,
          selected: selectedAnswer,
          correct: selectedAnswer === currentQuestion.correctAnswer,
        },
      ]);
      setSelectedAnswer("");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    //Saves last answer and shows result
    const handleSubmit = () => {
      setUserAnswers([
        ...userAnswers,
        {
          questionId: currentQuestion.id,
          selected: selectedAnswer,
          correct: selectedAnswer === currentQuestion.correctAnswer,
        },
      ]);
      setShowResult(true);
    };

    //Counts correct answer
    const correctCount = userAnswers.filter((a) => a.correct).length;

    if (showResult) {
      let message ="";
      if (correctCount === questionList.length) {
      message = (`Amazing ${userName}! You got all answers correct! 🎉`);
      } 
      else if (correctCount >= 2) {
      message = (`Well done ${userName}! You got ${correctCount} of ${questionList.length} correct answers 👏`);
      } 
      else if (correctCount === 1) {
      message = (`Sorry ${userName}. You only got ${correctCount} of ${questionList.length} correct answers`);
      } 
      else {
      message = (`Sorry ${userName}. You didn't get any correct answers, keep on practicing!`);
      }
      
      return (
        <div className="result-container">
          <h2>Your Quiz Result</h2>
          <h4>{message}</h4>
          <img src="/flag.png" alt="Brazil flag" />
        </div>
      );
    }
   
  return (
        
    <div className="question-container">
      <h3>Question: {currentQuestionIndex + 1} of {questionList.length}</h3>
      <h3>{currentQuestion.question}</h3>

      <form className="question-form">
        {currentQuestionIndex === questionList.length - 1 ? ( //if last question
          <select
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            >
            <option value="">--Choose an answer--</option>
              {currentQuestion.choises.map((choice) => (
                <option key={choice} value={choice}>
                {choice}
                </option>
                ))}
          </select>
        ) : (
          currentQuestion.choises.map((choice) => (
            <label key={choice}>
              <input
                type="radio"
                name="answer"
                value={choice}
                checked={selectedAnswer === choice}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
                {choice}
            </label>
          ))
        )}  
      </form>

      <div>
        {currentQuestionIndex < questionList.length - 1 ? (
          <button className="next-submit-button" onClick={handleNext} disabled={selectedAnswer === ""}>
            Next
          </button>
        ) : (
          <button className="next-submit-button" onClick={handleSubmit} disabled={selectedAnswer === ""}>
            Submit
           </button>
        )}
      </div>
    </div>
  );
};