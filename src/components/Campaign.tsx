import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampaign } from '../actions/campaignPage';
import { StoreState } from '../reducers';
import { Campaign as ICampaign } from '../interfaces';
import {
  Grid,
  Header,
  Divider,
  Progress,
  Input,
  Button,
  Icon
} from 'semantic-ui-react';
import { YoutubeIframe } from './YoutubeIframe';
import { calculateTimeRemaining } from '../utils/calculateTimeRemaining';
import { Description } from './Description';
import { CampaignImage } from './CampaignImage';

export enum FetchingState {
  FETCHING_STARTED,
  FETCHING_SUCCESS,
  FETCHING_ERROR
}

interface CampaignProps {
  match: { params: { id: number } };
  campaign: ICampaign | null;
  fetchCampaign: Function;
  fetchingState: FetchingState;
}

class _Campaign extends Component<CampaignProps> {
  constructor(props: CampaignProps) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCampaign(this.props.match.params.id);
  }

  render() {
    const { fetchingState, campaign } = this.props;

    if (fetchingState === FetchingState.FETCHING_STARTED)
      return <h1>Loading</h1>;

    if (fetchingState === FetchingState.FETCHING_ERROR || !campaign)
      return <h1>No campaign found</h1>;

    const titleStyles = { fontSize: '3rem', marginBottom: '1px' };
    const subtitleStyles = { fontSize: '20px' };

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h1" style={{ display: 'inline' }}>
              {campaign.title}{' '}
            </Header>
            <span>by {campaign.user.name}</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row divided>
          <Grid.Column width={8}>
            <YoutubeIframe videoLink={campaign.video}></YoutubeIframe>
          </Grid.Column>
          <Grid.Column width={8}>
            <Progress
              value={campaign.percentFunded}
              total="100"
              progress="percent"
              color="green"
            />
            <p style={titleStyles}>${campaign.raised}</p>
            <p style={subtitleStyles}>pledged of ${campaign.goal} goal</p>
            <p style={titleStyles}>
              {calculateTimeRemaining(campaign.endDate).timeRemainingString}
            </p>
            <p style={subtitleStyles}>remaining before campaigns end</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Divider />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <p style={{ fontSize: '2rem' }}>Help fund this project</p>
            <Input
              size="big"
              type="number"
              label={{ basic: true, content: '$' }}
              labelPosition="right"
              placeholder="Enter amount"
              style={{ marginBottom: '2rem' }}
            />
            <br />
            <Button color="red" icon labelPosition="right" size="big">
              <Icon name="heart outline" />
              Donate
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Divider />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <CampaignImage imageLink={campaign.img} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Description description={campaign.description} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = ({
  campaignPageState
}: StoreState): {
  campaign: ICampaign | null;
  fetchingState: FetchingState;
} => {
  return {
    campaign: campaignPageState.data,
    fetchingState: campaignPageState.fetchingState
  };
};

export const Campaign = connect(
  mapStateToProps,
  { fetchCampaign }
)(_Campaign);
