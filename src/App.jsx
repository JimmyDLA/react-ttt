import { useState } from 'react';
import './App.css'
import { Box } from './components/Box'

const boxes  = [
  {
    id: 0,
    player: '',
  },
  {
    id: 1,
    player: '',
  },
  {
    id: 2,
    player: '',
  },
  {
    id: 3,
    player: '',
  },
  {
    id: 4,
    player: '',
  },
  {
    id: 5,
    player: '',
  },
  {
    id: 6,
    player: '',
  },
  {
    id: 7,
    player: '',
  },
  {
    id: 8,
    player: '',
  },
];

const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],

  [0,3,6],
  [1,4,7],
  [2,5,8],

  [0,4,8],
  [2,4,6],
]

function App() {
  const [boardState, setBoardState] = useState(boxes)
  const [turn, setTurn] = useState('X')
  const [winner, setWinner] = useState(null)
  const [endGame, setEndGame] = useState(false)
  const [highLightPos, setHighLightPos] = useState([])


  const checkIfWon = (newBoardState, currentTurn) => {
    let win = null;
    // filter boardState by player turn
    const filterByPlayer = newBoardState.filter(box => box.player === currentTurn);

    for(let i = 0; i < winningCombos.length; i++) {
      const combo = winningCombos[i];

      const pos1 = filterByPlayer.find(player => player.id === combo[0])
      const pos2 = filterByPlayer.find(player => player.id === combo[1])
      const pos3 = filterByPlayer.find(player => player.id === combo[2])

      if (pos1 && pos2 && pos3) {
        win = currentTurn;
        setHighLightPos([pos1,pos2,pos3])
        setEndGame(true)
        setWinner(win)
        break  
      }
    }
    const avaliableSpace = newBoardState.filter(box => box.player === '')

    if (avaliableSpace.length === 0 && !win) {
      setWinner('NONE')
    }
  }
  
  const handleOnPress = (clickedBox) => {
    // 1. Check if box is already taken
    if (boardState[clickedBox.id].player !== '' || endGame) return;

    const newBoardState = boardState.map((box) => {
      if (box.id === clickedBox.id) {
        return { ...box, player: turn };
      }
      return box;
    });

    checkIfWon(newBoardState, turn );
    
    setBoardState(newBoardState);
    setTurn(turn === 'X' ? 'O' : 'X');
  };

  const handleRestart = () => {
    setBoardState(boxes);
    setEndGame(false);
    setHighLightPos([]);
    setWinner(null);
    setTurn(turn === 'O' ? 'O' : 'X')
  }

  const getWinningTitle = () => {
    if (winner === null) return <div className="winner-title"></div>;

    if (winner === 'NONE') {
      return <div className="winner-title"><h2 className="winner-text" style={{color: '#aaa', textShadow: 'none'}}>IT'S A DRAW</h2></div>
    } else {
      return <div className="winner-title"><h2 className="winner-text">WINNER IS: {winner}</h2></div>
    }
  }

  return (
    <>
      <h1>TIC-TAC-TOE</h1>
      {getWinningTitle()}
      <div className='board'>
        {boardState.map((box) => (
          <Box
            key={`box${box.id}`} 
            symbol={box.player} 
            onPress={() => handleOnPress(box)}
            isHightLight={highLightPos.find(pos => pos.id === box.id)}
            winner={winner}
          />
        ))}
      </div>
      <div className="turn-indicator">Whose turn is it: <span className={turn === 'X' ? 'x-turn' : 'o-turn'}>{turn}</span></div>
      <button className="restart" onClick={handleRestart}>Restart</button>
    </>
  );
}

export default App
