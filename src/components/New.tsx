import React, { Component } from 'react';
import { Grid, Header, Button, Input, TextArea, Form } from 'semantic-ui-react';
import { ImageDropBox } from './ImageDropBox';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import { config } from '../config';

interface NewProps {}

interface NewState {
  imageUrl: string;
  title: string;
  goal: string;
  description: string;
  videoUrl: string;
  days: string;
}

const placeHolderImage =
  'https://react.semantic-ui.com/images/wireframe/white-image.png';

export class New extends Component<NewProps, NewState> {
  validator: SimpleReactValidator;

  constructor(props: NewProps) {
    super(props);

    this.state = {
      imageUrl: '',
      title: '',
      goal: '',
      description: '',
      videoUrl: '',
      days: ''
    };

    this.validator = new SimpleReactValidator({
      element: (message: string): JSX.Element => (
        <div style={{ color: 'red', marginTop: '10px' }}>{message}</div>
      )
    });
    this.onImageDrop = this.onImageDrop.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  onImageDrop(acceptedFiles: File[]) {
    const image = acceptedFiles[0];

    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      const url = reader.result;
      console.log(url as string);
      this.setState({ imageUrl: url as string });
    };

    if (image) reader.readAsDataURL(image);
  }

  deleteImage() {
    this.setState({ imageUrl: '' });
  }

  onSubmit() {
    if (this.validator.allValid()) {
      axios.post(`${config.BACKEND_URL}/campaigns`, {
        title: this.state.title,
        user: { id: '1', name: 'SVC Letterpress' },
        description: this.state.description,
        days: this.state.days,
        raised: 0,
        goal: this.state.goal,
        img: this.state.imageUrl,
        video: this.state.videoUrl,
        approved: null,
        donators: []
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    const marginBottom = { marginBottom: '3rem' };

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width="16">
            <Header as="h1">New Campaign</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width="5" textAlign="center">
            <ImageDropBox
              onDrop={this.onImageDrop}
              imageUrl={this.state.imageUrl || placeHolderImage}
            />
            {!this.state.imageUrl ? (
              <Header as="h2">
                Choose an image
                <Required />
              </Header>
            ) : (
              <Button
                onClick={this.deleteImage}
                color="red"
                circular
                icon="trash alternate outline"
              />
            )}
            {this.validator.message('image', this.state.imageUrl, 'required')}
          </Grid.Column>
          <Grid.Column width="11">
            <Form>
              <Grid>
                <Grid.Row style={marginBottom}>
                  <Grid.Column width="8">
                    <Header as="h2">
                      Title
                      <Required />
                    </Header>
                    <Input
                      placeholder="Campaigns title"
                      fluid
                      value={this.state.title}
                      onChange={e => {
                        this.setState({ title: e.target.value });
                      }}
                    ></Input>
                    {this.validator.message(
                      'title',
                      this.state.title,
                      'required|min:10'
                    )}
                  </Grid.Column>
                  <Grid.Column width="8">
                    <Header as="h2">
                      Goal
                      <Required />
                    </Header>
                    <Input
                      placeholder="How much you want to raise in US$?"
                      fluid
                      value={this.state.goal}
                      onChange={e => {
                        this.setState({ goal: e.target.value });
                      }}
                    ></Input>
                    {this.validator.message(
                      'goal',
                      this.state.goal,
                      'required|numeric|min:100,num'
                    )}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={marginBottom}>
                  <Grid.Column width="8">
                    <Header as="h2">
                      Video link
                      <Required />
                    </Header>
                    <Input
                      placeholder="URL to the movie presenting your campaign"
                      fluid
                      value={this.state.videoUrl}
                      onChange={e => {
                        this.setState({ videoUrl: e.target.value });
                      }}
                    ></Input>
                    {this.validator.message(
                      'videoLink',
                      this.state.videoUrl,
                      'required|url'
                    )}
                  </Grid.Column>
                  <Grid.Column width="8">
                    <Header as="h2">
                      Days
                      <Required />
                    </Header>
                    <Input
                      placeholder="How long should the campaign last?"
                      fluid
                      value={this.state.days}
                      onChange={e => {
                        this.setState({ days: e.target.value });
                      }}
                    ></Input>
                    {this.validator.message(
                      'days',
                      this.state.days,
                      'required|numeric|min:1,num'
                    )}
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width="16">
                    <div style={marginBottom}>
                      <Header as="h2">
                        Description
                        <Required />
                      </Header>
                      <TextArea
                        placeholder="Tell us as much as you can about the campaign"
                        value={this.state.description}
                        onChange={e => {
                          const target = e.target as HTMLTextAreaElement;
                          this.setState({ description: target.value });
                        }}
                      />
                      {this.validator.message(
                        'description',
                        this.state.description,
                        'required|min:150'
                      )}
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="right">
            <Button color="green" size="big" onClick={() => this.onSubmit()}>
              Submit
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const Required = () => {
  return <span style={{ color: 'red' }}>*</span>;
};
