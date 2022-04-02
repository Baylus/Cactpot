import React, { useEffect, useState } from "react";
import "./styles.css";
import Board from "./Board";

// FIX: Have to find a good way of globally defining this, or to pull it out from the board class.
export const scoreValues: number[] = [
  10000,
  36,
  720,
  360,
  80,
  252,
  108,
  6868,
  54,
  180,
  72,
  180,
  119,
  36,
  306,
  1080,
  144,
  1800,
  3600
];

const MINIMUM_SCORE: number = 6;

// Averages the array given and rounds the number to the nearest integer
function averageScores(scores: number[]): number {
  const sum = scores.reduce((a, b) => a + b, 0);
  const avg = sum / scores.length || 0;
  return Math.round(avg);
}

export default function Game(props: {}) {
  const [scores, setScores] = useState([] as number[]);
  // Type board values as a number array, but allow the state to initialize as undefined
  // I dont think this is necessary anymore. Should move it somewhere to the playground to keep it in mind for learning.
  const [currentBoardValues, setCurrentBoardValues] = useState<
    number[] | undefined
  >(undefined);
  const [playing, setPlaying] = useState(true as boolean);

  // Create an array of numbers from 1-9 that are randomly sorted, for use on the board
  const makeBoardValues = (): number[] => {
    let temp: number[] = [...Array.from({ length: 9 }, (_, i) => i + 1)].sort(
      (a, b) => 0.5 - Math.random()
    );
    return temp;
  };

  // Add score to the High Score table
  const addScore = (score: number): void => {
    let tmpscores = scores;
    tmpscores.push(score);
    setScores([...tmpscores]);
  };

  if (!currentBoardValues) {
    // If we dont have a board yet, we need to make one.
    setCurrentBoardValues(makeBoardValues());
  }

  // TEST
  // useEffect(() => {
  //   console.log("scores have been updated");
  // }, [scores]);

  // TODO: Stuff we want to add: Score table, Rules

  // wtf does this mean
  // FIX: Disabled replay game if you havent finished your current play. Will require pulling the playing prop out of the board and into the game, which should probably be done anyway.
  // FIX: Actually find good places/positions for these components, and dont just stack button after text after table in this one big container div.
  //    Lets make it so that the rules and score table are to the right of the main board table. In that order of each other.
  // FIX: Make the container behind the board either invisible or bigger to include the right-most top slice button.
  return (
    <div className={"container"}>
      <Board
        boardValues={currentBoardValues}
        logScore={addScore}
        playing={playing}
        finishPlaying={() => {
          setPlaying(false);
        }}
      />
      <p />
      <button
        className={"replayButton"}
        disabled={playing}
        onClick={() => {
          console.log("Restarting Game");
          setPlaying(true);
          setCurrentBoardValues(makeBoardValues());
        }}
      >
        {"Replay Game"}
      </button>
      <div>
        {"Highscore: " + (scores.length > 0 ? Math.max(...scores) : "")}
      </div>
      <div>
        {"Average Score: " + (scores.length > 0 ? averageScores(scores) : "")}
      </div>
      <table className="scoresTable">
        <tr>
          <th>Slice Total</th>
          <th>Score</th>
        </tr>
        {scoreValues.map((value, index) => {
          return (
            <tr key={index}>
              <td>{index + MINIMUM_SCORE}</td>
              <td>{value}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

Game.defaultProps = {};
