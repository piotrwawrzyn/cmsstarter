import React from 'react';
import { Campaign } from '../interfaces';
import { Grid, Placeholder, Divider, Header, Label } from 'semantic-ui-react';
import { calculateTimeRemaining } from '../utils/calculateTimeRemaining';
import { Link } from 'react-router-dom';
import { getCampaignExcerpt } from '../utils/getCampaignExcerpt';

interface CampaignListItemProps {
  campaign?: Campaign;
}

export const CampaignListItem = (props: CampaignListItemProps): JSX.Element => {
  const imageDimensions = {
    width: 320,
    maxHeight: 180
  };

  if (!props.campaign) {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            <Placeholder
              style={{
                height: imageDimensions.maxHeight,
                width: imageDimensions.width
              }}
            >
              <Placeholder.Image />
            </Placeholder>
          </Grid.Column>
          <Grid.Column width={11}>
            <Placeholder fluid>
              <Placeholder.Line length="full" />
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  const {
    id,
    img,
    title,
    description,
    goal,
    user,
    endDate,
    percentFunded,
    approved
  } = props.campaign;

  const excerpt = getCampaignExcerpt(description);

  let campaignsState = null;

  if (approved === null)
    campaignsState = <Label color="yellow">AWAITING APPROVAL</Label>;
  else if (approved === false)
    campaignsState = <Label color="red">REJECTED</Label>;

  const { timeRemainingString, isHot } = calculateTimeRemaining(endDate);

  return (
    <Grid>
      <Grid.Row style={{ paddingBottom: '2rem' }}>
        <Grid.Column width={5}>
          <div
            style={{ maxHeight: imageDimensions.maxHeight, overflow: 'hidden' }}
          >
            <Link to={`/campaigns/${id}`}>
              <img
                src={img}
                alt={title}
                style={{ width: imageDimensions.width }}
              />
            </Link>
          </div>
        </Grid.Column>
        <Grid.Column width={11}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Link to={`/campaigns/${id}`}>
                  <Header as="h2">{title}</Header>
                </Link>
                {campaignsState}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingTop: 0 }}>
              <Grid.Column>
                {excerpt} <Divider style={{ marginBottom: 0 }} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row
              divided
              columns="equal"
              textAlign="center"
              style={{ padding: 0 }}
            >
              <Grid.Column>
                <strong>{percentFunded}% </strong>funded out of{' '}
                <strong>{goal}$</strong> target
              </Grid.Column>
              <Grid.Column>
                created by <strong>{user.name}</strong>
              </Grid.Column>
              <Grid.Column>
                <span style={isHot ? { color: 'red' } : {}}>
                  ending in <strong> {timeRemainingString}</strong>
                </span>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingTop: 0 }}>
              <Grid.Column>
                <Divider style={{ marginBottom: 0 }} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
