import React, { useEffect, useState } from "react";
import "./styles.css";
import Square from "./Square";
import ArrowButton from "./ArrowButton";
// import scoreValues from "./Game";

// IMPROVEMENT: I really want all this scoring stuff to be moved out of the board, as it makes more logical sense to be kept in the "Game" class. Try and see if theres a good way to do that.
// Really need to make this improvement, since we need a copy of the score values for the scores table in the game itself.
// This wouldnt even be that hard to do, and probably should be done anyway, since the only time score is needed in this is to display the current score after the board.
// 6 is the smallest score achievable, as its a combo of 1,2,3
const MINIMUM_SCORE: number = 6;

// Values for scores for the game. This is 0 indexed, but should be noted that the first is actually 6, since its the lowest score achievable
const scoreValues: number[] = [
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

// Find the array of Squares that were sliced. 0 based
function findSliced(slice: number): number[] {
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
  return chosenSquares;
}

// Calculate the score for the player based on the board values and slice choice
// Uses static and sporatic list of values for different slice sum value
function calculateScore(boardValues: number[], slice: number): number {
  let score = 0;
  console.log("Calculating score for slice " + slice);

  // Lets just go with a dumb solution right now.
  // chosenSquares - list of board indexes relevant to the slice chosen.
  let chosenSquares: number[] = findSliced(slice);

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
  // We have to subtract the minimum score from the sum since thats where the array begins
  score = scoreValues[sliceSum - MINIMUM_SCORE];

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

export default function Board(props: {
  boardValues: number[];
  logScore: Function;
  playing: boolean;
  finishPlaying: Function;
}) {
  // List of choices the player has made by index of square
  // The choices that the player has made don't matter, but
  // we use it to disable the Squares to prevent the player
  // from choosing more than 3, so this can be simplified
  const [choices, setChoices] = useState([] as number[]);
  const [score, setScore] = useState(0 as number);
  const [boardValues, setBoardValues] = useState(props.boardValues as number[]);
  // Lets use the choices to manage a revealed array to make it easier to reveal the Squares
  //
  // This is currently for the purpose of revealing the first
  // Square easier, as well as making all the Squares visible
  // after game is over. This maybe could be done easier, but for now we use this
  const [sliced, setSliced] = useState([] as number[]);

  const initRevealed = () => {
    let initRev: boolean[] = Array(9).fill(false);
    initRev.splice(Math.round(Math.random() * 8), 1, true);
    return initRev;
  };

  const [revealed, setRevealed] = useState(initRevealed());
  // Easy revealed update
  const revealSquare = (index: number) => {
    let newRevealed: boolean[] = revealed;
    newRevealed[index] = true;
    setRevealed([...newRevealed]);
  };

  const addChoice = (index: number) => {
    let newArray: number[] = choices;
    newArray.push(index);
    setChoices([...newArray]);

    // Update the revealed Square in the array
    revealSquare(index);
  };

  const chooseSlice = (slice: number) => {
    let newScore = calculateScore(props.boardValues, slice);
    setScore(newScore);

    // I used to update the score by using "useEffect" to update whenever score was updated, but I endeed up
    // Changing how we update the scores in the game to do it here, because I was having issues
    // with the sequence of updates that was making the score flash the old score
    // for a brief second because playing state was getting updated first.
    // This is also a bit more explicit on what is happening, so its not so confusing
    // what order things (and where) things are getting done.
    props.logScore(newScore);

    // Update all the Squares to reveal themselves
    setRevealed(Array(9).fill(true));

    let sList = findSliced(slice);
    setSliced(sList);
    console.log("our sliced: " + sliced);

    props.finishPlaying();
  };

  // boardValues
  useEffect(() => {
    console.log("boardValues have been updated");
  }, [boardValues]);

  // props.boardValues
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
  // IMPROVEMENT: On further thinking, lets do it iterative. Any babies that dont like me removing
  // the repeated code and increasing readability, at the cost of complete clarity, can cry to somebody else.
  // let sliceIndex = 1;

  return (
    <div id={"board"}>
      <div id={"topSliceButtons"}>
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
      <div id={"leftSliceButtons"}>
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
      <div id={"smallBoard"}>
        {boardValues.map((value, index) => {
          return (
            <Square
              addChoice={addChoice}
              key={index}
              index={index}
              value={value}
              disable={choices.length >= 3}
              revealed={revealed[index]}
              sliced={!props.playing && sliced.includes(index)}
            />
          );
        })}
      </div>
    </div>
  );
}

Board.defaultProps = {
  boardValues: [],
  playing: true
};
