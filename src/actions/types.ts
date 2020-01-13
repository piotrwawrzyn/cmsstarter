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
  UserPayload,
  login,
  signup,
  logout
}

export interface LogoutAction {
  type: ActionTypes.logout;
}

export type Action =
  | FetchCampaignsAction
  | ChangeCampaignsPageAction
  | FilterCampaignsAction
  | SortCampaignsAction
  | FetchCampaignAction
  | FetchUserPayloadAction
  | LogoutAction;
