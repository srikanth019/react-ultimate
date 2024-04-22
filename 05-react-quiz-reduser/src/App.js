// http://localhost:5000/questions
import ErrorMsg from "./components/ErrorMsg";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import { useEffect, useReducer } from "react"
import StartPage from "./components/StartPage";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECONDS_PER_QUESTION = 30

const initialState = {
  questions: [],
  //loading, error, ready, active, finished, etc...
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null
}
function reducer (state, action) {
  let currentQuestion;
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION
      };
    case "dataFailed":
      return {
        ...state,
        status: "error"
      };
    case "start":
      return {
        ...state,
        status: "active"
      };
    case "newAnswer":
      currentQuestion = state.questions[state.index]
      return {
        ...state,
        answer: action.payload,
        points: action.payload === currentQuestion.correctOption ? state.points + currentQuestion.points : state.points
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore: state.points > state.highScore ? state.points : state.highScore
      };
    case "restart":
      // optional State
      // return {
      //   ...state,
      //   status: "ready",
      //   index: 0,
      //   answer: null,
      //   points: 0,
      //   questions: state.questions,
      //   highScore: state.highScore
      // };
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highScore: state.highScore
      }
    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status
      };
    case "defineCount":
    default:
      throw new Error("Unknown action")
  }
}

function App () {
  const [{ questions, status, index, answer, points, highScore, secondsRemaining }, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, curr) => acc + curr.points, 0)

  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "dataReceived",
          payload: data
        })
      })
      .catch((error) => dispatch({ type: "dataFailed" }));

  }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMsg />}
        {status === "ready" && <StartPage numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" &&
          <>
            <Progress
              numQuestions={numQuestions}
              points={points}
              index={index}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
            </Footer>
          </>
        }
        {status === "finished" &&
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        }
      </Main>
    </div>
  );
}

export default App;
