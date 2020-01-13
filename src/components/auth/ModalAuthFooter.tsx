import React from "react";
import { Button, Message } from "semantic-ui-react";
import { btnOnClickSemantic } from "../../interfaces";

interface Props {
  type: "login" | "signup";
  changeModal: btnOnClickSemantic;
}

const ModalAuthFooter = ({ type, changeModal }: Props) => {
  let text, content, showmodal;
  if (type === "signup") {
    text = "Do have an account?";
    content = "Log in";
    showmodal = "login";
  } else {
    text = "Don't have an account?";
    content = "Sign up for free";
    showmodal = "signup";
  }
  return (
    <Message attached="bottom">
      <span>{text}</span>
      <Button
        content={content}
        onClick={changeModal}
        showmodal={showmodal}
        style={{ marginLeft: "5px" }}
        basic
        compact
      />
    </Message>
  );
};

export default ModalAuthFooter;
