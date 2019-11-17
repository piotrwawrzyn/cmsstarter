import { ActionTypes } from './types';
import { Campaign } from '../interfaces';
import { Dispatch } from 'redux';
import axios from 'axios';
import { config } from '../config';
import { FilterOptions } from '../components/FilterDropdown';
import { SortOptions } from '../components/SortDropdown';
import { extendCampaignData } from '../utils/extendCampaignData';

export interface FetchCampaignsAction {
  type: ActionTypes.fetchCampaigns;
  payload: Campaign[];
}

export interface ChangeCampaignsPageAction {
  type: ActionTypes.changeCampaignsPage;
  payload: number;
}

export interface FilterCampaignsAction {
  type: ActionTypes.filterCampaigns;
  payload: FilterOptions;
}

export interface SortCampaignsAction {
  type: ActionTypes.sortCampaigns;
  payload: SortOptions;
}

export const fetchCampaigns = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Campaign[]>(
      `${config.BACKEND_URL}/campaigns`
    );

    const campaigns = response.data;

    campaigns.map(campaign => extendCampaignData(campaign));

    dispatch<FetchCampaignsAction>({
      type: ActionTypes.fetchCampaigns,
      payload: campaigns
    });
  };
};

export const changeCampaignsPage = (
  newPage: number
): ChangeCampaignsPageAction => {
  return {
    type: ActionTypes.changeCampaignsPage,
    payload: newPage
  };
};

export const filterCampaigns = (
  filterBy: FilterOptions
): FilterCampaignsAction => {
  return {
    type: ActionTypes.filterCampaigns,
    payload: filterBy
  };
};

export const sortCampaigns = (sortBy: SortOptions): SortCampaignsAction => {
  return {
    type: ActionTypes.sortCampaigns,
    payload: sortBy
  };
};
