import React, { useEffect, useState } from "react";
import "./styles.css";
import Board from "./Board";
// import {round, random} from Math

// TODO: Extract this stuff into a board class and make this class represent the whole game, so that the user can keep replaying the game.

export default function Game(props: { boardValues: number[] }) {
  const [scores, setScores] = useState([] as number[]);
  const [currentBoard, setCurrentBoard] = useState(null);
  // Lets use the choices to manage a revealed array to make it easier to reveal the buttons
  //
  // This is currently for the purpose of revealing the first
  // button easier, as well as making all the buttons visible
  // after game is over. This maybe could be done easier, but for now we use this
  let board: number[] = [...Array.from({ length: 9 }, (_, i) => i + 1)].sort(
    (a, b) => 0.5 - Math.random()
  );

  const addScore = (score: number) => {
    let tmpscores = scores;
    tmpscores.push(score);
    setScores([...tmpscores]);
  };

  // TODO: Stuff we want to add: New game button, Highscores table, Rules
  return <Board boardValues={board} />;
}

Game.defaultProps = {};
