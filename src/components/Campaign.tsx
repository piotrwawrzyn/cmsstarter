import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampaign } from '../actions/campaignPage';
import { StoreState } from '../reducers';
import { Campaign as ICampaign, UserCurrent } from '../interfaces';
import {
  Grid,
  Header,
  Divider,
  Progress,
  Input,
  Button,
  Icon,
  Checkbox,
  Table,
  Label
} from 'semantic-ui-react';
import { YoutubeIframe } from './YoutubeIframe';
import { calculateTimeRemaining } from '../utils/calculateTimeRemaining';
import { Description } from './Description';
import { CampaignImage } from './CampaignImage';
import { config } from '../config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { wait } from '../utils/wait';

const { BACKEND_URL } = config;

export enum FetchingState {
  FETCHING_STARTED,
  FETCHING_SUCCESS,
  FETCHING_ERROR
}

interface CampaignState {
  donateAmount: string;
  anonymous: boolean;
}

interface CampaignProps {
  match: { params: { id: number } };
  campaign: ICampaign | null;
  fetchCampaign: Function;
  fetchingState: FetchingState;
  user: UserCurrent | null;
}

class _Campaign extends Component<CampaignProps, CampaignState> {
  constructor(props: CampaignProps) {
    super(props);

    this.state = { donateAmount: '', anonymous: false };
    this.handleDonate = this.handleDonate.bind(this);
  }

  componentDidMount() {
    this.props.fetchCampaign(this.props.match.params.id);
  }

  async handleAccept(accept: boolean) {
    if (this.props.campaign)
      axios.patch(
        `${BACKEND_URL}/campaigns/${this.props.campaign.id}/approve`,
        { approved: accept },
        { withCredentials: true }
      );

    if (accept)
      toast.success(
        `Campaign ${this.props.campaign!.title} was successfully accepted!`,
        {
          containerId: 'global'
        }
      );
    else
      toast.error(`Campaign ${this.props.campaign!.title} has been denied.`, {
        containerId: 'global'
      });

    await wait(2500);

    window.location.href = '/';
  }

  renderAcceptRejectButtons() {
    if (!this.props.campaign) return null;

    const denyButtonEnabled = this.props.campaign.approved !== false;
    const acceptButtonEnabled = this.props.campaign.approved !== true;

    let textToDisplay;
    if (this.props.campaign.approved) {
      textToDisplay = 'approved';
    } else if (this.props.campaign.approved === false) {
      textToDisplay = 'rejected';
    } else {
      textToDisplay = 'pending approval';
    }

    return (
      <Grid.Row style={{ margin: '1em 0 1em 0' }}>
        <Grid.Column textAlign="center">
          <Button
            disabled={!acceptButtonEnabled}
            icon
            size="massive"
            color="green"
            labelPosition="left"
            onClick={() => this.handleAccept(true)}
          >
            <Icon name="check" />
            Accept
          </Button>
          <Button
            disabled={!denyButtonEnabled}
            icon
            size="massive"
            color="red"
            labelPosition="right"
            onClick={() => this.handleAccept(false)}
          >
            <Icon name="times" />
            Reject
          </Button>
          <br />
          <p style={{ margin: '1em 0 1em 0', fontSize: '1.5em' }}>
            This campaign is currently <strong>{textToDisplay}</strong>
          </p>
        </Grid.Column>
      </Grid.Row>
    );
  }

  async handleDonate() {
    try {
      if (this.props.user && !this.state.anonymous) {
        await axios.post(
          `${BACKEND_URL}/campaigns/${this.props.campaign!.id}/donate`,
          {
            amount: parseInt(this.state.donateAmount)
          },
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `${BACKEND_URL}/campaigns/${
            this.props.campaign!.id
          }/donate_anonymous`,
          {
            amount: parseInt(this.state.donateAmount)
          }
        );
      }
      toast.success(
        `Your donate has been accepted! Thank you for your generosity!`,
        {
          containerId: 'global'
        }
      );

      await wait(2000);

      window.location.href = `/campaigns/${this.props.campaign!.id}`;
    } catch (err) {
      toast.error(err.message, {
        containerId: 'global'
      });
    }
  }

  renderDonationTable() {
    if (!this.props.campaign) return null;
    const donations = this.props.campaign!.donators;

    const donationsMarkup = donations.map(donation => {
      let donationAmount = (
        (donation.amount / this.props.campaign!.goal) *
        100
      ).toFixed(2);
      if (donationAmount === '0.00') donationAmount = '< 0.00';
      return (
        <Table.Row>
          <Table.Cell>
            {donation.user ? donation.user.name : <Label>anonymous</Label>}
          </Table.Cell>
          <Table.Cell>{donation.amount}$</Table.Cell>
          <Table.Cell>{donationAmount}%</Table.Cell>
          <Table.Cell>{donation.date.toDateString()}</Table.Cell>
        </Table.Row>
      );
    });

    return (
      <Grid.Row>
        <Grid.Column>
          <h1>Donations</h1>
          {donations.length ? (
            <Table celled style={{ fontSize: '1.2em' }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>User</Table.HeaderCell>
                  <Table.HeaderCell>Amount</Table.HeaderCell>
                  <Table.HeaderCell>Percent funded</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>{donationsMarkup}</Table.Body>
            </Table>
          ) : (
            <p style={{ fontSize: '1.5em' }}>There are no donations yet.</p>
          )}
        </Grid.Column>
      </Grid.Row>
    );
  }

  render() {
    const { fetchingState, campaign } = this.props;
    console.log(campaign, this.props.user);

    if (fetchingState === FetchingState.FETCHING_STARTED)
      return <h1>Loading</h1>;

    if (fetchingState === FetchingState.FETCHING_ERROR || !campaign)
      return <h1>No campaign found</h1>;

    if (
      !campaign.approved &&
      (!this.props.user || this.props.user.role !== 'admin')
    ) {
      return <h1>Access denied</h1>;
    }

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
              disabled={
                this.props.campaign!.goal === this.props.campaign!.raised
              }
              type="number"
              label={{ basic: true, content: '$' }}
              labelPosition="right"
              value={this.state.donateAmount}
              placeholder="Enter amount"
              style={{ marginBottom: '2rem' }}
              onChange={e => this.setState({ donateAmount: e.target.value })}
            />
            {this.props.user ? (
              <div>
                <Checkbox
                  checked={this.state.anonymous}
                  disabled={
                    this.props.campaign!.goal === this.props.campaign!.raised
                  }
                  onChange={e =>
                    this.setState({ anonymous: !this.state.anonymous })
                  }
                  label="Make my donation anonymous"
                />
              </div>
            ) : null}
            <br />
            <Button
              color="red"
              icon
              labelPosition="right"
              size="big"
              onClick={() => this.handleDonate()}
              disabled={!this.state.donateAmount}
            >
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
        {this.props.user &&
        this.props.campaign &&
        (this.props.user.role === 'admin' ||
          this.props.user.name === this.props.campaign.user.name)
          ? this.renderDonationTable()
          : null}
        {this.props.user && this.props.user.role === 'admin'
          ? this.renderAcceptRejectButtons()
          : null}
      </Grid>
    );
  }
}

const mapStateToProps = ({
  campaignPageState,
  userState
}: StoreState): {
  campaign: ICampaign | null;
  fetchingState: FetchingState;
  user: UserCurrent | null;
} => {
  return {
    campaign: campaignPageState.data,
    fetchingState: campaignPageState.fetchingState,
    user: userState.user
  };
};

export const Campaign = connect(mapStateToProps, { fetchCampaign })(_Campaign);
