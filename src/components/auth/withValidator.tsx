import React, { Component, FunctionComponent, ComponentType } from "react";
import SimpleReactValidator from "simple-react-validator";
import { onChangeSemantic } from "../../interfaces";

export interface InjectedWithValidatorProps {
  validator: SimpleReactValidator;
  validateForm: () => boolean;
  handleChange: onChangeSemantic;
  onFocus: (e: any) => void;
  onBlur: (e: any) => void;
  data: { name: string; email: string; password: string };
  errors: { [key: string]: string | null | undefined };
}

interface WithValidatorState {
  data: any;
  errors: any;
}

type WithValidatorProps<P> = Omit<P, keyof InjectedWithValidatorProps>;

const defaultLoginErrors: { [key: string]: string | null | undefined } = {
  name: null,
  email: null,
  password: null
};

const defaultData = {
  name: "",
  email: "",
  password: ""
};

function withValidator<P extends InjectedWithValidatorProps>(
  WrappedComponent: FunctionComponent<P>
): ComponentType<WithValidatorProps<P>> {
  class WithValidator extends Component<
    WithValidatorProps<P>,
    WithValidatorState
  > {
    validator: SimpleReactValidator;

    constructor(props: WithValidatorProps<P>) {
      super(props);
      this.validator = new SimpleReactValidator();
      this.state = {
        data: defaultData,
        errors: defaultLoginErrors
      };
    }

    handleChange: onChangeSemantic = (e, { name, value }) =>
      this.setState({
        data: { ...this.state.data, [name]: value },
        errors: { ...this.state.errors }
      });

    validateForm = (): boolean => {
      let fieldsError: { email?: string; password?: string } = {};
      const eMsgs = this.validator.getErrorMessages();
      if (!this.validator.fieldValid("email")) {
        fieldsError.email = eMsgs.email;
      }
      if (!this.validator.fieldValid("password")) {
        fieldsError.password = eMsgs.password;
      }

      if (!Object.keys(fieldsError).length) {
        return true;
      }

      this.setState({
        data: { ...this.state.data },
        errors: { ...fieldsError }
      });
      return false;
    };

    onBlur = (e: any) => {
      const fieldName = e.target.name as string;
      if (!this.validator.fieldValid(fieldName)) {
        this.setState({
          data: { ...this.state.data },
          errors: {
            ...this.state.errors,
            [fieldName]: this.validator.getErrorMessages()[fieldName]
          }
        });
      }
    };

    onFocus = (e: any) => {
      const fieldName = e.target.name as string;
      this.setState({
        data: { ...this.state.data },
        errors: { ...this.state.errors, [fieldName]: null }
      });
    };

    render() {
      return (
        <WrappedComponent
          validator={this.validator}
          validateForm={this.validateForm}
          handleChange={this.handleChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          data={this.state.data}
          errors={this.state.errors}
          {...(this.props as P)}
        />
      );
    }
  }

  return WithValidator;
}

export default withValidator;
