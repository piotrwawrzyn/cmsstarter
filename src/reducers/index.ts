import { combineReducers } from 'redux';
import { campaignListReducer, CampaignListState } from './campaignListReducer';
import { campaignPageReducer, CampaignPageState } from './campaignPageReducer';

export interface StoreState {
  campaignListState: CampaignListState;
  campaignPageState: CampaignPageState;
}

export const reducers = combineReducers<StoreState>({
  campaignListState: campaignListReducer,
  campaignPageState: campaignPageReducer
});
