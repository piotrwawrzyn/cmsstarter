import { Campaign } from '../interfaces';
import { Action, ActionTypes } from '../actions/types';
import { FilterOptions } from '../components/FilterDropdown';
import { SortOptions } from '../components/SortDropdown';

export interface CampaignListState {
  allCampaigns: Campaign[];
  displayedCampaigns: Campaign[];
  activePage: number;
  sortingOption: SortOptions;
}

const initialState: CampaignListState = {
  allCampaigns: [],
  displayedCampaigns: [],
  activePage: 1,
  sortingOption: SortOptions.NEW
};

export const campaignListReducer = (
  campaignsState = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchCampaigns: {
      return {
        ...campaignsState,
        allCampaigns: action.payload,
        displayedCampaigns: action.payload
      };
    }

    case ActionTypes.changeCampaignsPage: {
      return {
        ...campaignsState,
        activePage: action.payload
      };
    }

    case ActionTypes.filterCampaigns: {
      switch (action.payload) {
        case FilterOptions.ALL:
          return {
            ...campaignsState,
            displayedCampaigns: campaignsState.allCampaigns
          };
        case FilterOptions.ONLY_APPROVED:
          return {
            ...campaignsState,
            displayedCampaigns: campaignsState.allCampaigns.filter(
              campaign => campaign.approved
            )
          };
        case FilterOptions.ONLY_UNAPPROVED:
          return {
            ...campaignsState,
            displayedCampaigns: campaignsState.allCampaigns.filter(
              campaign => campaign.approved === null
            )
          };
        case FilterOptions.ONLY_DENIED:
          return {
            ...campaignsState,
            displayedCampaigns: campaignsState.allCampaigns.filter(
              campaign => campaign.approved === false
            )
          };
        default:
          return campaignsState;
      }
    }

    case ActionTypes.sortCampaigns: {
      let sortedCampaigns = [...campaignsState.displayedCampaigns];

      switch (action.payload) {
        case SortOptions.CLOSEST_END: {
          sortedCampaigns = sortedCampaigns.sort(
            (a, b) => a.endDate.getTime() - b.endDate.getTime()
          );
          break;
        }
        case SortOptions.NEW: {
          sortedCampaigns = sortedCampaigns.sort(
            (a, b) => b.launchDate.getTime() - a.launchDate.getTime()
          );
          break;
        }
        case SortOptions.MOST_FUNDED: {
          sortedCampaigns = sortedCampaigns.sort(
            (a, b) => b.percentFunded - a.percentFunded
          );
          break;
        }
        case SortOptions.MOST_RAISED: {
          sortedCampaigns = sortedCampaigns.sort((a, b) => b.raised - a.raised);
          break;
        }
      }

      return {
        ...campaignsState,
        displayedCampaigns: sortedCampaigns,
        sortingOption: action.payload as SortOptions
      };
    }

    default:
      return campaignsState;
  }
};
