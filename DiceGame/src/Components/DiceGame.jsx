import styles from './DiceGame.module.scss'; // Imports the CSS file as a module
import { useState } from 'react';

const DiceGame = () => {
    const [playerOneScore, setPlayerOneScore] = useState(0); //Creates a state variable called playerOneScore with initial state of 0, and a function called setPlayerOneScore to update it
    const [playerTwoScore, setPlayerTwoScore] = useState(0); //Creates a state variable called playerTwoScore with initial state of 0, and a function called setPlayerTwoScore to update it
    const [gameStatus, setGameStatus] = useState('Game in Progress'); //Creates a state variable called gameStatus with initial state of 'Game in Progress', and a function called setGameStatus to update it
    const [currentPlayer, setCurrentPlayer] = useState(1); // 1 for player 1, 2 for player 2
    const [previousPlayer, setPreviousPlayer] = useState(null); // The previous player
    const [lastRoll, setLastRoll] = useState(0); // The last roll of the dice
    const [isRolling, setIsRolling] = useState(false); // Whether or not the dice are rolling

    const rollDice = () => {
        setIsRolling(true); // Disable the button

        const roll = Math.floor(Math.random() * 6) + 1; // Generate a random number between 1 and 6
        setLastRoll(roll); // Update the last roll

        if (currentPlayer === 1) { // If it's player 1's turn
            const newScore = playerOneScore + roll; // Add the roll to player 1's score
            setPlayerOneScore(newScore); // Update player 1's score
            if (newScore >= 100) { // If player 1's score is greater than or equal to 100
                setGameStatus('Player 1 Won'); // Update the game status to 'Player 1 Won'
            }
        } else { // If it's player 2's turn
            const newScore = playerTwoScore + roll; // Add the roll to player 2's score
            setPlayerTwoScore(newScore); // Update player 2's score
            if (newScore >= 100) {  // If player 2's score is greater than or equal to 100
                setGameStatus('Player 2 Won'); // Update the game status to 'Player 2 Won'
            }
        }

        // Switch the current player
        setPreviousPlayer(currentPlayer)  // Set the previous player to the current player
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1); // If the current player is 1, set it to 2, otherwise set it to 1

        setTimeout(() => {
            setIsRolling(false); // Enable the button after 1 second
        }, 500);
    };

    const resetGame = () => { // Resets the game
        setPlayerOneScore(0); // Resets player 1's score to 0
        setPlayerTwoScore(0); // Resets player 2's score to 0 
        setGameStatus('Game in Progress'); // Resets the game status to 'Game in Progress'
        setCurrentPlayer(1); // Resets the current player to 1
        setLastRoll(0); // Resets the last roll to 0
    };

    return (
        <div className={styles.container}>
            <div className={styles.players}>
                <div>
                    <h1>Player 1</h1>
                    <h2>Score: {playerOneScore}</h2>
                </div>
                <div>
                    <h1>Player 2</h1>
                    <h2>Score: {playerTwoScore}</h2>
                </div>
            </div>


            <h2>Player {currentPlayer}s Turn</h2>
            {previousPlayer && <h2> Player {previousPlayer} rolled {lastRoll}</h2>}
            <h2>{gameStatus}</h2>
            <div className={styles.buttons}>
                <button onClick={rollDice} disabled={gameStatus !== 'Game in Progress' || isRolling}>Roll Dice</button>
                <button onClick={resetGame}>Reset Game</button>
            </div>

        </div>
    );
};

export default DiceGame;