import * as React from "react";

// This button comprises the main 3x3 grid buttons
export default function Button(props: {
  value: Number;
  // initRevealed: boolean;
  revealed: boolean;
  disable: boolean;
  index: Number;
  addChoice: Function;
}) {
  // TODO: Make buttons have an outline once the slice has been chosen. Can pass in a "border" prop to change the class name of the button to match the defined button look
  return (
    <button
      className={"button"}
      onClick={() => {
        // Don't let button add choice again if its already been revealed
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

Button.defaultProps = {
  value: 0,
  revealed: false,
  disabled: false
};
