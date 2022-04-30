import * as React from "react";

// This button comprises the main 3x3 grid buttons
export default function Square(props: {
  value: Number;
  // initRevealed: boolean;
  revealed: boolean;
  disable: boolean;
  index: Number;
  addChoice: Function;
  sliced: boolean;
}) {
  return (
    <button
      className={"square" + (props.sliced ? " sliced" : "")}
      onClick={() => {
        // Don't let square add choice again if its already been revealed
        if (!props.revealed) {
          props.addChoice(props.index);
        }
      }}
      disabled={props.disable}
    >
      {props.revealed ? props.value : null}
    </button>
  );
}

Square.defaultProps = {
  value: 0,
  revealed: false,
  disabled: false,
  sliced: false
};
