import React, { ComponentType } from "react";
import { connect, ConnectedProps } from "react-redux";
import { compose } from "redux";
import { Form } from "semantic-ui-react";
import { toast } from "react-toastify";
import { signupGoogle, signup } from "../../actions/auth";
import withValidator, { InjectedWithValidatorProps } from "./withValidator";

const btnInlineStyles = { fontWeight: "bold", textTransform: "uppercase" };

const connector = connect(null, { signup });

type PropsFromRedux = ConnectedProps<typeof connector>;

interface SignupProps extends InjectedWithValidatorProps, PropsFromRedux {
  closeModal: () => void;
}

const Signup: React.FunctionComponent<SignupProps> = (props: SignupProps) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const continueSubmit = props.validateForm();

    if (continueSubmit) {
      props.signup(props.data, function cb(e: any) {
        if (e) {
          toast.error(e, { containerId: "modal" });
        } else {
          props.closeModal();
        }
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        name="name"
        placeholder="Name"
        value={props.data.name}
        onChange={props.handleChange}
      />
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
        content="Sign up"
        color="green"
        style={btnInlineStyles}
        fluid
        basic
      />
      <Form.Button
        type="button"
        icon={{ name: "google", color: "red" }}
        content="Sign up with google"
        style={btnInlineStyles}
        fluid
        basic
        onClick={signupGoogle}
      />
    </Form>
  );
};

type ComposeProps = Omit<
  SignupProps,
  keyof InjectedWithValidatorProps | keyof PropsFromRedux
>;

const enhance = compose<ComponentType<ComposeProps>>(connector, withValidator);

export default enhance(Signup);
