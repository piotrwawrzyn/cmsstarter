import { ActionTypes } from './types';
import { Dispatch } from 'redux';
import axios from 'axios';
import { config } from '../config';
import { Campaign } from '../interfaces/Campaign';
import { extendCampaignData } from '../utils/extendCampaignData';

export interface FetchCampaignAction {
  type: ActionTypes.fetchCampaign;
  payload: Campaign | null;
}

export const fetchCampaign = (id: number) => {
  return async (dispatch: Dispatch) => {
    let campaign = null;

    try {
      const response = await axios.get<Campaign>(
        `${config.BACKEND_URL}/campaigns/${id}`
      );

      campaign = extendCampaignData(response.data);
    } catch (err) {
      console.log('Campaign not found');
    }

    return dispatch<FetchCampaignAction>({
      type: ActionTypes.fetchCampaign,
      payload: campaign
    });
  };
};
