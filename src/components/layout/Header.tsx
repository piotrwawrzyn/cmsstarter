import React, { Component } from 'react';
import { Menu, Button, Divider, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export class Header extends Component {
  renderRightMenuItem(): JSX.Element {
    return (
      <Menu.Item position="right">
        <Button.Group size="large">
          <Link to="/login">
            <Button color="black">Login</Button>
          </Link>
          <Button.Or />
          <Link to='/signup'>
            <Button color="black">Sign up</Button>
          </Link>
        </Button.Group>
      </Menu.Item>
    );
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width="12" verticalAlign="middle">
              <Link to="/">
                <img
                  style={{ width: '350px' }}
                  src="/cmsstarter_logo.png"
                  alt="cmsstarter logo"
                />
              </Link>
            </Grid.Column>
            <Grid.Column
              width="4"
              floated="right"
              verticalAlign="middle"
              textAlign="right"
            >
              {this.renderRightMenuItem()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider style={{ marginBottom: '2em' }} />
      </div>
    );
  }
}
