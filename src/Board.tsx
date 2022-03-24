import React, { useEffect, useState } from "react";
import "./styles.css";
import Button from "./Button";
import ArrowButton from "./ArrowButton";

// Calculate the score for the player based on the board values and slice choice
// Uses static and sporatic list of values for different slice sum value
function calculateScore(boardValues: number[], slice: number): number {
  const scoreValues = [
    10000,
    36,
    720,
    360,
    80,
    252,
    108,
    72,
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
  let score = 0;
  console.log("Calculating score for slice " + slice);

  // Lets just go with a dumb solution right now.
  // chosenSquares - list of board indexes relevant to the slice chosen.
  let chosenSquares: number[] = [];
  switch (slice) {
    case 1:
      // Left Diagonal
      chosenSquares = [0, 4, 8];
      break;
    case 2:
      // Left column
      chosenSquares = [0, 3, 6];
      break;
    case 3:
      // Middle Column
      chosenSquares = [1, 4, 7];
      break;
    case 4:
      // Right Column
      chosenSquares = [2, 5, 8];
      break;
    case 5:
      // Right Diagonal
      chosenSquares = [2, 4, 6];
      break;
    case 6:
      // Top row
      chosenSquares = [0, 1, 2];
      break;
    case 7:
      // Middle Row
      chosenSquares = [3, 4, 5];
      break;
    case 8:
      // Bottom Row
      chosenSquares = [6, 7, 8];
      break;
    default:
      console.log("Wrong slice chosen. This shouldn't happen");
  }
  const mapBoardValue = (index: number) => {
    return boardValues[index];
  };
  // Map the indexes to the values on the board and summate them to get slice total
  // let sliceSum: number = chosenSquares
  //   .map(mapBoardValue)
  //   .reduce((x, y) => x + y);
  let sliceValues: number[] = chosenSquares.map(mapBoardValue);
  let sliceSum: number = sliceValues.reduce((x, y) => x + y);

  // console.log("Our slice sum is: " + sliceSum);
  // We have to subtract 6 from the sum, since thats the minimum score you can achieve, and where the score array begins
  score = scoreValues[sliceSum - 6];

  // console.log("Our score is: " + score);
  if (score === undefined) {
    console.log("We have a bad error, traiging score issue");
    console.log("chosen sqaures: " + chosenSquares);
    console.log("sliceValues: " + sliceValues);
    console.log("sliceSum: " + sliceSum);
    console.log(scoreValues);
  }
  return score;
}

// TODO: Extract this stuff into a board class and make this class represent the whole game, so that the user can keep replaying the game.

export default function Board(props: {
  boardValues: number[];
  logScore: Function;
  playing: boolean;
  finishPlaying: Function;
}) {
  // List of choices the player has made by index of square
  // The choices that the player has made don't matter, but
  // we use it to disable the buttons to prevent the player
  // from choosing more than 3, so this can be simplified
  const [choices, setChoices] = useState([] as number[]);
  // const [playing, setPlaying] = useState(true as boolean);
  const [score, setScore] = useState(0 as number);
  const [boardValues, setBoardValues] = useState(props.boardValues as number[]);
  // Lets use the choices to manage a revealed array to make it easier to reveal the buttons
  //
  // This is currently for the purpose of revealing the first
  // button easier, as well as making all the buttons visible
  // after game is over. This maybe could be done easier, but for now we use this

  const initRevealed = () => {
    let initRev: boolean[] = Array(9).fill(false);
    initRev.splice(Math.round(Math.random() * 8), 1, true);
    return initRev;
  };

  const [revealed, setRevealed] = useState(initRevealed());
  // Easy revealed update
  const revealButton = (index: number) => {
    let newRevealed: boolean[] = revealed;
    newRevealed[index] = true;
    setRevealed([...newRevealed]);
  };

  const addChoice = (index: number) => {
    let newArray: number[] = choices;
    newArray.push(index);
    setChoices([...newArray]);

    // Update the revealed button in the array
    revealButton(index);
  };

  const chooseSlice = (slice: number) => {
    setScore(calculateScore(props.boardValues, slice));
    // TEST: Remove while testing
    // setPlaying(false);
    props.finishPlaying();
    // Update all the buttons to reveal themselves
    setRevealed(Array(9).fill(true));
  };

  // Perform some cleaning from the restart
  // if (props.restart) {
  //   console.log("Board is cleaning itself");
  //   setChoices([]);
  //   setPlaying(true);
  //   setRevealed(initRevealed());
  //   setBoardValues(props.boardValues);
  //   setScore(0);
  //   props.restart = false;
  // }

  useEffect(() => {
    console.log("boardValues have been updated");
  }, [boardValues]);

  useEffect(() => {
    console.log("Adding new score(" + score + ") to high scores");
    if (score) {
      props.logScore(score);
    }
  }, [score]);

  useEffect(() => {
    // console.log("props boardValues have been updated");
    setChoices([]);
    // setPlaying(true);
    setRevealed(initRevealed());
    setBoardValues(props.boardValues);
    setScore(0);
  }, [props.boardValues]);

  // Possibly use this to remove repeating code. Wont
  // be as useful for top slice button bar, since we
  // have to manually create the diagonal arrows, but the
  // middle section of that bar and the left slice buttons
  // should be able to be mapped if this is used. Just make
  // sure that I document which indexes correspond to which
  // buttons.
  //
  // We would need to make the slice buttons use a more iterative construction, or theres
  // really not a ton of benefit from being able to reduce the static assignment of indexes
  // let sliceIndex = 1;

  return (
    <div className={"container"}>
      <div className={"topSliceButtons"}>
        <ArrowButton
          direction={"down right"}
          onClick={chooseSlice}
          sliceIndex={1}
          disabled={!props.playing}
        />
        <ArrowButton
          direction={"down"}
          onClick={chooseSlice}
          sliceIndex={2}
          disabled={!props.playing}
        />
        <ArrowButton
          direction={"down"}
          onClick={chooseSlice}
          sliceIndex={3}
          disabled={!props.playing}
        />
        <ArrowButton
          direction={"down"}
          onClick={chooseSlice}
          sliceIndex={4}
          disabled={!props.playing}
        />
        <ArrowButton
          direction={"down left"}
          onClick={chooseSlice}
          sliceIndex={5}
          disabled={!props.playing}
        />
      </div>
      <div className={"leftSliceButtons"}>
        <ArrowButton
          direction={"right"}
          onClick={chooseSlice}
          sliceIndex={6}
          disabled={!props.playing}
        />
        <ArrowButton
          direction={"right"}
          onClick={chooseSlice}
          sliceIndex={7}
          disabled={!props.playing}
        />
        <ArrowButton
          direction={"right"}
          onClick={chooseSlice}
          sliceIndex={8}
          disabled={!props.playing}
        />
      </div>
      <div className={"board"}>
        {boardValues.map((value, index) => {
          return (
            <Button
              addChoice={addChoice}
              key={index}
              index={index}
              value={value}
              disable={choices.length >= 3}
              revealed={revealed[index]}
            />
          );
        })}
      </div>
      <div>{!props.playing ? "Your score: " + score : null}</div>
    </div>
  );
}

Board.defaultProps = {
  boardValues: [],
  restart: false,
  playing: true
};
