import { calculatePercentFunded } from './calculatePercentFunded';
import { calculateEndDate } from './calculateTimeRemaining';
import { Campaign } from '../interfaces';

export const extendCampaignData = (campaign: Campaign): Campaign => {
  if (campaign.launchDate) campaign.launchDate = new Date(campaign.launchDate);
  else campaign.launchDate = new Date();

  console.log(campaign.launchDate);

  campaign.donators.map(donator => (donator.date = new Date(donator.date)));
  campaign.endDate = calculateEndDate(
    campaign.launchDate || new Date(),
    campaign.days
  );
  campaign.percentFunded = calculatePercentFunded(
    campaign.raised,
    campaign.goal
  );

  return campaign;
};
