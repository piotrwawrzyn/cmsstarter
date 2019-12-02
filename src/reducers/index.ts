import { combineReducers } from "redux";
import { campaignListReducer, CampaignListState } from "./campaignListReducer";
import { campaignPageReducer, CampaignPageState } from "./campaignPageReducer";
import { userReducer, UserState } from "./userReducer";

export interface StoreState {
  campaignListState: CampaignListState;
  campaignPageState: CampaignPageState;
  userState: UserState;
}

export const reducers = combineReducers<StoreState>({
  campaignListState: campaignListReducer,
  campaignPageState: campaignPageReducer,
  userState: userReducer
});
