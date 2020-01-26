import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import {
  Menu,
  Button,
  Divider,
  Grid,
  Placeholder,
  Dimmer,
  Loader,
  ButtonProps
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";
import { StoreState } from "../../reducers";
import { UserState } from "../../reducers/userReducer";
import { logout } from "../../actions/auth";
const ModalAuth = lazy(() => import("../auth/ModalAuth"));

type btnOnClickSemantic = (
  event: React.MouseEvent<HTMLButtonElement>,
  data: ButtonProps
) => void;
interface HeaderProps {
  userState: UserState;
  logout: () => void;
}
class Header extends Component<HeaderProps, { modal: JSX.Element | null }> {
  state = { modal: null };

  removeModal = () => this.setState({ modal: null });

  showModal: btnOnClickSemantic = (e, data) => {
    this.setState({
      modal: (
        <ErrorBoundary>
          <Suspense
            fallback={
              <Dimmer active>
                <Loader />
              </Dimmer>
            }
          >
            <ModalAuth
              type={data.showmodal}
              remove={this.removeModal}
              changeModal={this.showModal}
            ></ModalAuth>
          </Suspense>
        </ErrorBoundary>
      )
    });
  };

  renderRightMenuItem(): JSX.Element {
    const { user, loggedIn } = this.props.userState;
    if (loggedIn === null && user === null) {
      return (
        <Placeholder>
          <Placeholder.Line length="very long" />
          <Placeholder.Line length="very long" />
        </Placeholder>
      );
    }

    if (loggedIn && user) {
      return (
        <Menu.Item position="right">
          <Button color="black" onClick={this.props.logout}>
            Logout
          </Button>
          <span style={{ marginLeft: "10px" }}>
            Hello,{" "}
            <strong>
              <span>{user.name}</span>
            </strong>
          </span>
        </Menu.Item>
      );
    }

    return (
      <Menu.Item position="right">
        <Button.Group size="large">
          <Button color="black" showmodal="login" onClick={this.showModal}>
            Login
          </Button>
          <Button.Or />
          <Button color="black" showmodal="signup" onClick={this.showModal}>
            Sign up
          </Button>
        </Button.Group>
      </Menu.Item>
    );
  }

  render() {
    return (
      <div>
        {this.state.modal}
        <Grid>
          <Grid.Row>
            <Grid.Column verticalAlign="middle" className="header-logo">
              <Link to="/">
                <img
                  style={{ width: "300px" }}
                  src="/cmsstarter_logo.png"
                  alt="cmsstarter logo"
                />
              </Link>
            </Grid.Column>
            <Grid.Column
              floated="right"
              verticalAlign="middle"
              textAlign="right"
              className="header-menu"
            >
              {this.renderRightMenuItem()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider style={{ marginBottom: "2em" }} />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return { userState: state.userState };
};

export default connect(mapStateToProps, { logout })(Header);
