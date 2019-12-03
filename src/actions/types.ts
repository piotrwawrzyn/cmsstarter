import {
  FetchCampaignsAction,
  ChangeCampaignsPageAction,
  FilterCampaignsAction,
  SortCampaignsAction
} from "./campaignList";
import { FetchCampaignAction } from "./campaignPage";
import { FetchUserPayloadAction } from "./user";

export enum ActionTypes {
  fetchCampaigns,
  changeCampaignsPage,
  filterCampaigns,
  sortCampaigns,
  fetchCampaign,
  fetchUserPayload
}

export type Action =
  | FetchCampaignsAction
  | ChangeCampaignsPageAction
  | FilterCampaignsAction
  | SortCampaignsAction
  | FetchCampaignAction
  | FetchUserPayloadAction;
