import React, { ComponentType } from "react";
import { connect, ConnectedProps } from "react-redux";
import { compose } from "redux";
import { Form } from "semantic-ui-react";
import { loginGoogle, login } from "../../actions/auth";
import withValidator, { InjectedWithValidatorProps } from "./withValidator";
import { toast } from "react-toastify";

const btnInlineStyles = { fontWeight: "bold", textTransform: "uppercase" };

const connector = connect(null, { login });

type PropsFromRedux = ConnectedProps<typeof connector>;

interface LoginProps extends PropsFromRedux, InjectedWithValidatorProps {
  closeModal: () => void;
}

const LoginForm = (props: LoginProps) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const continueSubmit = props.validateForm();

    if (continueSubmit) {
      props.login(props.data, function cb(e: any) {
        if (e) {
          toast.error(e, { containerId: "modal" });
        } else {
          console.log();
          props.closeModal();
        }
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        type="email"
        name="email"
        placeholder="Email"
        value={props.data.email}
        error={props.errors.email}
        noValidate={true}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onChange={props.handleChange}
      />
      {props.validator.message("email", props.data.email, "required|email")}
      <Form.Input
        type="password"
        name="password"
        placeholder="Password"
        value={props.data.password}
        error={props.errors.password}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onChange={props.handleChange}
      />
      {props.validator.message("password", props.data.password, "required")}
      <Form.Button
        type="submit"
        content="Log in"
        color="green"
        style={btnInlineStyles}
        fluid
        basic
      />
      <Form.Button
        type="button"
        icon={{ name: "google", color: "red" }}
        content="Log in with google"
        style={btnInlineStyles}
        fluid
        basic
        onClick={loginGoogle}
      />
    </Form>
  );
};

type ComposeProps = Omit<
  LoginProps,
  keyof InjectedWithValidatorProps | keyof PropsFromRedux
>;

const enhance = compose<ComponentType<ComposeProps>>(withValidator, connector);

export default enhance(LoginForm);
