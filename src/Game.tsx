import React, { useEffect, useState } from "react";
import "./styles.css";
import Board from "./Board";
// import {round, random} from Math

// TODO: Extract this stuff into a board class and make this class represent the whole game, so that the user can keep replaying the game.

export default function Game(props: {}) {
  const [scores, setScores] = useState([] as number[]);
  const [currentBoard, setCurrentBoard] = useState(undefined);
  // Type board values as a number array, but allow the state to initialize as undefined
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

  const addScore = (score: number): void => {
    let tmpscores = scores;
    tmpscores.push(score);
    setScores([...tmpscores]);
  };

  if (!currentBoardValues) {
    // If we dont have a board yet, we need to make one.
    setCurrentBoardValues(makeBoardValues());
  }

  // TODO: Stuff we want to add: New game button, Highscores table, Rules
  // FIX: Disabled replay game if you havent finished your current play. Will require pulling the playing prop out of the board and into the game, which should probably be done anyway.
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
        disabled={playing}
        onClick={() => {
          console.log("Restarting Game");
          setPlaying(true);
          setCurrentBoardValues(makeBoardValues());
        }}
      >
        {"Replay Game"}
      </button>
      <div className={"High Score Table"}>
        <div className={"header"}>{"High Scores"}</div>
        {scores.length > 0
          ? scores.map((value, index) => {
              return (
                <div className={"scoreRow"} key={index}>
                  {value}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

Game.defaultProps = {};
