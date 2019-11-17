import {
  FetchCampaignsAction,
  ChangeCampaignsPageAction,
  FilterCampaignsAction,
  SortCampaignsAction
} from './campaignList';
import { FetchCampaignAction } from './campaignPage';

export enum ActionTypes {
  fetchCampaigns,
  changeCampaignsPage,
  filterCampaigns,
  sortCampaigns,
  fetchCampaign
}

export type Action =
  | FetchCampaignsAction
  | ChangeCampaignsPageAction
  | FilterCampaignsAction
  | SortCampaignsAction
  | FetchCampaignAction;
