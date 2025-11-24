import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

const { useState } = React  //Destructures useState hook from React
const winningSets = ["012", "345",
    "678", "036", "147", "258", "048", "246"];        // sets winning indeces for squares to determine winner

function TicTacToe() {      //Main Component
  const [squares, setSquares] = useState(Array(9).fill(""))     //state that tracks the button squares
  const [winner, setWinner] = useState(false);                  // tracks if there is a winner
  const [active, setActive] = useState("X");                    // tracks which player is currently playing
  const [message, setMessage] = useState(`Next Player: ${active}`);   // tracks message 

  const testWinner = (newSquares) => {                // This function checks if the winning sets include all of the same player
    for (let sets of winningSets) {
      const [a, b, c] = sets.split("").map(Number);   //splits sets up into array and into a number to be used as an index
      if (newSquares[a] &&                            // if all the indeces in the squares array are the same then it returns true
        newSquares[a] === newSquares[b] &&
        newSquares[b] === newSquares[c]) return true
    }
    return false;   // returns false if there is no match to a winning set
  }
  const handleReset = () => {         // Handler for the reset button
    setSquares(Array(9).fill(""));    // resets squares
    setMessage(`Next Player: X`);     // resets message
    setActive("X");                   // resets active player
    setWinner(false);                 // resets winner status
  }

  const handleClick = i => {          // handler for the square clicks
    if (squares[i] !== "" || winner) return;          // If the square clicked isn't empty, and someone has already won, returns early
    const nextPlayer = active === "X" ? "O" : "X";    // Because of React async nature, temp variable to set the next player for message

    const newSquares = [...squares];      // temp variable, creates shallow copy of squares state
    newSquares[i] = active;               // sets index of array to active player based on the square clicked

    setActive(nextPlayer);      //sets player state with temp variable
    setSquares(newSquares);     // sets squares with temp array
    const hasWinner = testWinner(newSquares);     // Returns true or false depending on testWinner function
    if (hasWinner) {          // if there is a winner
      setWinner(true);        // Set winner state
      setMessage(`Winner: ${active}`) // Set winning message
      return;   // Return early
    }
    !hasWinner && newSquares.every(item => item !== "") ? setMessage("It's a draw!") : setMessage(`Next Player ${nextPlayer}`)
    // If there is no winner and every square is filled, set message to draw, else set message to next player
  }

  return (
    <div className="form">
      <h1>Tic-Tac-Toe</h1>
      <p>{message}</p>
      <div className="grid-layout">
        {squares.map((value, i) => (
          <button key={i}
            className="square"
            onClick={() => handleClick(i)}
          >{value}</button>
        ))}
      </div>
      <button id="reset"
        onClick={handleReset}>Reset Game</button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TicTacToe />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
