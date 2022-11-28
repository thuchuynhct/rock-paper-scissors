import "./App.css"

import rock from "./assets/rock.png"
import paper from "./assets/paper.png"
import scissors from "./assets/scissors.png"
import Icon from "./components/Icon";
import { useReducer, useState } from "react";

type initialType = {
  noice: string,
  playerChoose: number,
  computerChoose: number,
  playerScore: number,
  computerScore: number
}

type dispatchType = {
  type: string,
  payload: any
}

const TYPE = {
  NOICE: "NOICE",
  CHOOSE: "CHOOSE",
  SCORE: "SCORE",
}
function App() {
  const initialApp: initialType = {
    noice: "Waiting...",
    playerChoose: 0,
    computerChoose: 0,
    playerScore: 0,
    computerScore: 0
  }

  const reducer = (state: initialType, action: dispatchType): initialType => {
    switch (action.type) {
      case TYPE.NOICE:
        return { ...state, noice: action.payload.noice }

      case TYPE.CHOOSE:
        return {
          ...state,
          playerChoose: action.payload.player,
          computerChoose: action.payload.computer
        }

      case TYPE.SCORE:
        return {
          ...state,
          playerScore: action.payload.player,
          computerScore: action.payload.computer
        }

      default:
        return state;
    }
  }

  const [isShow, setIsShow] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, initialApp);

  const icon: string[] = [rock, paper, scissors];

  const clickHandler = (myChoose: number) => {
    setIsShow(false);

    //const type = ["rock", "paper", "scissors"];
    const rand = Math.floor(Math.random() * 3);
    dispatch({
      type: TYPE.CHOOSE,
      payload: { player: myChoose, computer: rand }
    })

    if (myChoose === rand) {
      dispatch({
        type: TYPE.NOICE,
        payload: { noice: "Tie!" }
      });
      return;
    }
    let isWin = false;
    switch (myChoose) {
      case 0:
        isWin = rand === 2;
        break;

      case 1:
        isWin = rand === 0;
        break;

      case 2:
        isWin = rand === 1;
        break;
    }

    dispatch({
      type: TYPE.NOICE,
      payload: { noice: isWin ? "You win!" : "Computer win!" }
    })

    dispatch({
      type: TYPE.SCORE,
      payload: {
        player: isWin ? state.playerScore + 1 : state.playerScore,
        computer: isWin ? state.computerScore : state.computerScore + 1
      }
    })
  }
  return (
    <div className="container">
      <div className="game">
        <Icon icon={icon[state.playerChoose]} onClick={() => setIsShow(!isShow)} />
        <div className="score">
          <h2>{`${state.playerScore} : ${state.computerScore}`}</h2>
        </div>
        <Icon icon={icon[state.computerChoose]} />
        <div className={`choose ${isShow ? "show" : ""}`}>
          <Icon icon={rock} onClick={() => clickHandler(0)} />
          <Icon icon={paper} onClick={() => clickHandler(1)} />
          <Icon icon={scissors} onClick={() => clickHandler(2)} />
        </div>
      </div>
      <div className={"notice"}>
        <h2>{state.noice}</h2>
      </div>
    </div>
  );
}

export default App;
