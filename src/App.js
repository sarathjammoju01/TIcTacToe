import React, { useState } from "react";
import Icon from "./Icon";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [gameState, setGameState] = useState("progress");
  const [ticTacToeArr, setTicTacToeArr] = useState(new Array(9).fill("empty"));

  function isWinnerOrDraw(arr) {
    // Row checks
    if (arr[0] === arr[1] && arr[1] === arr[2] && arr[0] !== "empty") {
      return arr[0];
    }
    if (arr[3] === arr[4] && arr[4] === arr[5] && arr[3] !== "empty") {
      return arr[3];
    }
    if (arr[6] === arr[7] && arr[7] === arr[8] && arr[6] !== "empty") {
      return arr[6];
    }

    // Column checks
    if (arr[0] === arr[3] && arr[3] === arr[6] && arr[0] !== "empty") {
      return arr[0];
    }
    if (arr[1] === arr[4] && arr[4] === arr[7] && arr[1] !== "empty") {
      return arr[1];
    }
    if (arr[2] === arr[5] && arr[5] === arr[8] && arr[2] !== "empty") {
      return arr[2];
    }

    // Diagonal checks
    if (arr[0] === arr[4] && arr[4] === arr[8] && arr[0] !== "empty") {
      return arr[0];
    }
    if (arr[2] === arr[4] && arr[4] === arr[6] && arr[2] !== "empty") {
      return arr[2];
    }

    // Draw check
    if (arr.every((cell) => cell !== "empty")) {
      return "draw";
    }

    // Game in progress
    return "progress";
  }

  function handlePlayerMove(index) {
    if (gameState !== "progress") {
      return;
    }
    if (ticTacToeArr[index] !== "empty") {
      toast.error("Cannot select this tile! Already Selected", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const copyArr = [...ticTacToeArr];
    copyArr[index] = isCross ? "cross" : "circle";

    const tempState = isWinnerOrDraw(copyArr);

    // Show toast notification based on the new state
    if (tempState === "draw") {
      toast.info("Game is a draw!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (tempState !== "progress") {
      toast.success(
        `${tempState === "cross" ? "Cross" : "Circle"} is the winner!`,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }

    setTicTacToeArr(copyArr);
    setGameState(tempState);

    // Toggle the player's turn only if the game is still in progress
    if (tempState === "progress") {
      setIsCross(!isCross);
    }
  }

  function resetTicTacToe(){
    setIsCross(false)
    setGameState('progress');
    setTicTacToeArr(new Array(9).fill('empty'))
  }
  return (
    <>
      <div>
        <h1>TIC TAC TOE</h1>
        {gameState !== "progress" ? (
          <h2>
            {gameState === "draw"
              ? "Game is Draw"
              : `${gameState === "cross" ? "Cross" : "Circle"} Wins!`}
          </h2>
        ) : (
          <h2>{isCross ? "Cross's" : "Circle's"} Turn</h2>
        )}

        <div className="cardBox">
          {ticTacToeArr.map((player, index) => {
            return (
              <div
                className="card"
                onClick={() => handlePlayerMove(index)}
                key={index}
              >
                <Icon player={player} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="resetButton">
        <button onClick={resetTicTacToe}>Reset</button>
      </div>

      <ToastContainer />
    </>
  );
};

export default App;
