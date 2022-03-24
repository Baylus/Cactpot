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
        return <ArrowDown size={24} color={"#555"} />;
      case "right":
        return <ArrowRight size={24} color={"#555"} />;
      case "down right":
        return <ArrowDownRight size={24} color={"#555"} />;
      case "down left":
        return <ArrowDownLeft size={24} color={"#555"} />;
      default:
        return null;
    }
  };

  return (
    <button
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
