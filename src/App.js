import React, { useState } from 'react';
import './App.css';
import Block from './components/Block';

function App() {
  const [state, setState] = useState(Array(9).fill(null));
  const [currentTurn, setcurrentTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [winningBlocks, setWinningBlocks] = useState([]);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (board) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningBlocks(pattern);
        setScore(prev => ({...prev, [board[a]]: prev[board[a]] + 1, }));
        return true;
      }
    }
    return false;
  };

  const handleBlockClick = (index) => {
    if (winner || state[index] !== null) return;

    const newState = [...state];
    newState[index] = currentTurn;

    setState(newState);

    if (checkWinner(newState)) return;

    if (!newState.includes(null)) {
      setWinner("Draw");
      return;
    }

    setcurrentTurn(currentTurn === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setState(Array(9).fill(null));
    setcurrentTurn("X");
    setWinner(null);
    setWinningBlocks([]);
  };

  return (
    <div className="board">
      <h2>Tic Tac Toe Game</h2>

      {/* Scoreboard */}
      <div className="scoreboard">
        <p>X Wins: {score.X}</p>
        <p>O Wins: {score.O}</p>
      </div>


      {/* Game Board */}
      <div className='row'>
        <Block index={0} onClick={() => handleBlockClick(0)} value={state[0]} highlight={winningBlocks.includes(0)} />
        <Block index={1} onClick={() => handleBlockClick(1)} value={state[1]} highlight={winningBlocks.includes(1)} />
        <Block index={2} onClick={() => handleBlockClick(2)} value={state[2]} highlight={winningBlocks.includes(2)} />
      </div>

      <div className='row'>
        <Block index={3} onClick={() => handleBlockClick(3)} value={state[3]} highlight={winningBlocks.includes(3)} />
        <Block index={4} onClick={() => handleBlockClick(4)} value={state[4]} highlight={winningBlocks.includes(4)} />
        <Block index={5} onClick={() => handleBlockClick(5)} value={state[5]} highlight={winningBlocks.includes(5)} />
      </div>

      <div className='row'>
        <Block index={6} onClick={() => handleBlockClick(6)} value={state[6]} highlight={winningBlocks.includes(6)} />
        <Block index={7} onClick={() => handleBlockClick(7)} value={state[7]} highlight={winningBlocks.includes(7)} />
        <Block index={8} onClick={() => handleBlockClick(8)} value={state[8]} highlight={winningBlocks.includes(8)} />
      </div>

      <button className="reset-btn" onClick={resetGame}>Reset Game</button>

      {/* Winner / Draw Message */}
      {winner && (
        <h3 className="winnerText">
          {winner === "Draw" ? "Match Draw!" : `Player ${winner} Wins! 🎉`}
        </h3>
      )}
    </div>
  );
}

export default App;
