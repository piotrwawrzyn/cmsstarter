import React from 'react';
import { Campaign } from '../interfaces';
import { CampaignListItem } from './CampaignListItem';
import { config } from '../config';

interface CampaignListProps {
  campaigns: Campaign[];
  activePage: number;
}

export const CampaignList = (props: CampaignListProps): JSX.Element => {
  const campaignsElements: JSX.Element[] = [];
  const { campaigns, activePage } = props;
  const { MAX_CAMPAIGNS_PER_PAGE } = config;

  const startCampaignIndex = (activePage - 1) * MAX_CAMPAIGNS_PER_PAGE;
  const endCampaignIndex =
    activePage * MAX_CAMPAIGNS_PER_PAGE < campaigns.length
      ? activePage * MAX_CAMPAIGNS_PER_PAGE
      : campaigns.length;

  for (let i = startCampaignIndex; i < endCampaignIndex; i++) {
    if (!campaigns.length) campaignsElements.push(<CampaignListItem key={i} />);
    else
      campaignsElements.push(
        <CampaignListItem key={campaigns[i].id} campaign={campaigns[i]} />
      );
  }

  return <div>{campaignsElements}</div>;
};
