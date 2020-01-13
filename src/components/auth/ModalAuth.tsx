import React, { useState, lazy, Suspense } from "react";
import { Modal } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import ModalAuthFooter from "./ModalAuthFooter";
import { btnOnClickSemantic } from "../../interfaces";
const LoginForm = lazy(() => import("./LoginForm"));
const SignupForm = lazy(() => import("./SignupForm"));

const ModalAuth = (props: {
  type: "login" | "signup";
  remove: Function;
  changeModal: btnOnClickSemantic;
}) => {
  const [open, setOpen] = useState(true);

  const setClose = () => {
    setOpen(false);
    props.remove();
  };

  const authForm = () => {
    let form =
      props.type === "login" ? (
        <LoginForm closeModal={setClose} />
      ) : (
        <SignupForm closeModal={setClose} />
      );

    return <Suspense fallback={<div>Loading...</div>}>{form}</Suspense>;
  };

  return (
    <>
      <Modal open={open} onClose={setClose} dimmer="blurring" size="tiny">
        <ToastContainer
          enableMultiContainer
          autoClose={1000}
          containerId={"modal"}
        />
        <Modal.Content>{authForm()}</Modal.Content>
        <ModalAuthFooter type={props.type} changeModal={props.changeModal} />
      </Modal>
    </>
  );
};

export default ModalAuth;
