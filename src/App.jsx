import { useState } from "react";
import { QuestionForm } from "./components/QuestionForm";
import { StartScreen } from "./components/StartScreen"


export const App = () => {
  const [quizStarted, setQuizStarted] = useState(false); //if start side or questions are beeing shown
  const [userName, setUserName] = useState(""); //saves username

  //runs when user press start, saves name
  const handleStart = (name) => {
    setUserName(name);
    setQuizStarted(true);
  };

  return (
    <div className="app">
      {!quizStarted ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <QuestionForm userName={userName} />
      )}
    </div>
  );
}

export default App;