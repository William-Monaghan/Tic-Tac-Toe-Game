import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

function TicTacToe() {
  const [squares,setSquares] = useState(Array(9).fill(""))
const [winner,setWinner] = useState(false);
const [active,setActive] = useState("X");
const [message,setMessage] = useState(`Next Player: ${active}`);
const winningSets = ["012","345",
"678","036","147","258","048","246"];

const testWinner = () => {

}

const handleClick = i => {
  if(squares[i] !== "") return;
  const nextPlayer = active==="X"?"O":"X";

  const newSquares = [...squares];
  newSquares[i] = active;

  setActive(nextPlayer);
  setSquares(newSquares);
  testWinner();
  setMessage(`Next Player ${nextPlayer}`)
}

  return (
    <div className="form">
      <h1>Tic-Tac-Toe</h1>
      <p>{message}</p>
      <div className="grid-layout">
       {squares.map((value,i) => (
        <button key={i} 
        className="square"
        onClick={() => handleClick(i)}
        >{value}</button>
      ))}
      </div>
      <button id="reset">Reset Game</button>
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
