import React, { useEffect, useState } from "react";
import "./styles.css";
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
export default function SliceButton(props: {
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

SliceButton.defaultProps = {
  size: 24,
  color: "#555",
  disabled: false
};

// Arrow buttons from phosphor
// props:
// chooseSlice - function to choose the slice
// disabled - if game is in play, buttons will be enabled
export function TopSliceBar(props: {
  chooseSlice: Function;
  disabled: boolean;
}) {
  return (
    <div id={"topSliceButtons"}>
      <SliceButton
        direction={"down right"}
        onClick={props.chooseSlice}
        sliceIndex={1}
        disabled={props.disabled}
      />
      <SliceButton
        direction={"down"}
        onClick={props.chooseSlice}
        sliceIndex={2}
        disabled={props.disabled}
      />
      <SliceButton
        direction={"down"}
        onClick={props.chooseSlice}
        sliceIndex={3}
        disabled={props.disabled}
      />
      <SliceButton
        direction={"down"}
        onClick={props.chooseSlice}
        sliceIndex={4}
        disabled={props.disabled}
      />
      <SliceButton
        direction={"down left"}
        onClick={props.chooseSlice}
        sliceIndex={5}
        disabled={props.disabled}
      />
    </div>
  );
}

// Arrow buttons from phosphor
// props:
// chooseSlice - function to choose the slice
// disabled - if game is in play, buttons will be enabled
export function LeftSliceBar(props: {
  chooseSlice: Function;
  disabled: boolean;
}) {
  return (
    <div id={"leftSliceButtons"}>
      <SliceButton
        direction={"right"}
        onClick={props.chooseSlice}
        sliceIndex={6}
        disabled={props.disabled}
      />
      <SliceButton
        direction={"right"}
        onClick={props.chooseSlice}
        sliceIndex={7}
        disabled={props.disabled}
      />
      <SliceButton
        direction={"right"}
        onClick={props.chooseSlice}
        sliceIndex={8}
        disabled={props.disabled}
      />
    </div>
  );
}
