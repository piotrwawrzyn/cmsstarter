import { Campaign } from '../interfaces';
import { Action, ActionTypes } from '../actions';
import { FetchingState } from '../components/Campaign';

export interface CampaignPageState {
  data: Campaign | null;
  fetchingState: FetchingState;
}

const initialState = {
  data: null,
  fetchingState: FetchingState.FETCHING_STARTED
};

export const campaignPageReducer = (
  campaignState: CampaignPageState = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchCampaign: {
      if (!action.payload)
        return {
          ...campaignState,
          fetchingState: FetchingState.FETCHING_ERROR
        };

      return {
        ...campaignState,
        data: action.payload,
        fetchingState: FetchingState.FETCHING_SUCCESS
      };
    }

    default:
      return campaignState;
  }
};
