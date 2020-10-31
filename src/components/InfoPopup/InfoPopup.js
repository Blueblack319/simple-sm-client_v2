import React from "react";
import { Popup } from "semantic-ui-react";

const InfoPopup = (props) => {
  return <Popup content={props.content} trigger={props.children} inverted />;
};

export default InfoPopup;
