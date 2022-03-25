import * as React from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowDownRight,
  ArrowDownLeft
} from "phosphor-react";

// Arrow buttons from phosphor
// props:
// sliceIndex - Which sliceIndex button we are pressing,
// direction - direction arrow is going
export default function ArrowButton(props: {
  sliceIndex: number;
  direction: string;
  onClick: Function;
  disabled: boolean;
}) {
  const whichButton = () => {
    switch (props.direction) {
      case "down":
        return <ArrowDown className={"sliceButton"} size={27} />;
      case "right":
        return <ArrowRight className={"sliceButton"} size={25} />;
      case "down right":
        return <ArrowDownRight className={"sliceButton"} size={26} />;
      case "down left":
        return <ArrowDownLeft className={"sliceButton"} size={26} />;
      default:
        return null;
    }
  };

  return (
    <button
      className={"sliceButton"}
      onClick={() => {
        props.onClick(props.sliceIndex);
      }}
      disabled={props.disabled}
    >
      {whichButton()}
    </button>
  );
}

ArrowButton.defaultProps = {
  size: 24,
  color: "#555",
  disabled: false
};
