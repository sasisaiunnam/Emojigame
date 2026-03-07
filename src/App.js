import React, { useState } from 'react'

import './App.css'

const Emojis =['😌','😊','😔','😁','🥲','😄','😃','😜','😳','😩','😒','😍']

function App() {
  const [cards,setCards] = useState(Emojis)
  const [gameStatus,setGameStatus] = useState('playing')
  const [lives,setLives] = useState(3)
  const [score,setScore] = useState(0)
  const [clickedEmoji,setClickedEmoji] = useState([]);
  const [topScore, setTopScore] = useState(0);

  const Shuffle = (array) =>[...array].sort(() => Math.random() - 0.5);

  const handleCardClick = (emoji) =>{
    if(gameStatus !== 'playing') return;

    if (clickedEmoji.includes (emoji)){
      const newlives = lives - 1;
      setLives(newlives);

      if(newlives === 0){
        setGameStatus('lost');
      }
      else{
        // setClickedEmoji([]);
        setCards(Shuffle(Emojis));
      }

    } else{
      const newClickedEmoji = [...clickedEmoji,emoji];
      setClickedEmoji(newClickedEmoji);

      const newScore = score + 1;
      setScore(newScore)

      

      if (newScore > topScore) {
        setTopScore(newScore);
      }

      if( newClickedEmoji.length === Emojis.length){
        setGameStatus('won')
      }
        setCards(Shuffle(Emojis))
    }
  };


  const gameReset = () =>{

  setClickedEmoji([]);
  setLives(3);
  setScore(0);
  setGameStatus('playing');
  setCards(Shuffle(Emojis))
  
 };



  return (
    <center>
      <div className="game-container">
        <h2>Emoji Game</h2>
        <>Score: {score}|Lives: {lives}|TopScore: {topScore}</>
      </div>

      {gameStatus === 'playing' ? (
        <div className='emoji-grid'>
          {cards.map((emoji, index) => (
            <button key={index}  onClick={() => handleCardClick(emoji)}>
              <h1>{emoji}</h1>
            </button>
          ))}
        </div>
      ) : (
        <div>
          {gameStatus === 'won' ? (
            <div>
              <h2>🏆 YOU WIN!</h2>
              <p>Incredible memory! You clicked all 12 emojis</p>
            </div>
          ) : (
            <div>
              <h2>💀 GAME OVER</h2>
              <p>You ran out of lives. Final Score: {score}</p>
            </div>
          )}
          <button onClick={gameReset}>reset</button>
        </div>
      )}
    </center>
  );
}


export default App
