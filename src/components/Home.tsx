import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchCampaigns,
  changeCampaignsPage,
  filterCampaigns,
  sortCampaigns
} from '../actions';
import { StoreState } from '../reducers';
import { Campaign } from '../interfaces';
import { config } from '../config';
import {
  Grid,
  Button,
  Icon,
  Pagination,
  PaginationProps,
  DropdownProps
} from 'semantic-ui-react';
import { CampaignList } from './CampaignList';
import { FilterDropdown, FilterOptions } from './FilterDropdown';
import { SortDropdown, SortOptions } from './SortDropdown';
import { Link } from 'react-router-dom';

interface HomeProps {
  campaigns: Campaign[];
  fetchCampaigns: Function;
  changeCampaignsPage: typeof changeCampaignsPage;
  filterCampaigns: typeof filterCampaigns;
  sortCampaigns: typeof sortCampaigns;
  activePage: number;
  sortingOption: SortOptions;
}

class _Home extends Component<HomeProps> {
  constructor(props: HomeProps) {
    super(props);

    this.handleFilter = this.handleFilter.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }
  handlePaginationChange = (
    e: React.MouseEvent,
    { activePage }: PaginationProps
  ) => {
    this.props.changeCampaignsPage(activePage as number);
  };

  handleFilter(e: React.SyntheticEvent, { value }: DropdownProps) {
    this.props.filterCampaigns(value as FilterOptions);
    this.props.sortCampaigns(this.props.sortingOption);
    this.props.changeCampaignsPage(1);
  }

  handleSort(e: React.SyntheticEvent, { value }: DropdownProps) {
    this.props.sortCampaigns(value as SortOptions);
    this.props.changeCampaignsPage(1);
  }

  render() {
    const numberOfPages = Math.ceil(
      this.props.campaigns.length / config.MAX_CAMPAIGNS_PER_PAGE
    );

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h1 style={{ paddingBottom: '2rem' }}>Campaigns</h1>
            </Grid.Column>
            <Grid.Column floated="right" width="4" textAlign="right">
              <Link to="/new">
                <Button color="green" icon labelPosition="left" size="large">
                  <Icon name="plus" />
                  New Campaign
                </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ marginBottom: '2rem' }}>
            <Grid.Column width={4}>
              <SortDropdown onChange={this.handleSort}></SortDropdown>
            </Grid.Column>
            <Grid.Column width={5}>
              <FilterDropdown onChange={this.handleFilter} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <CampaignList
          activePage={this.props.activePage}
          campaigns={this.props.campaigns}
        ></CampaignList>
        <Pagination
          activePage={this.props.activePage}
          onPageChange={this.handlePaginationChange}
          totalPages={numberOfPages}
          style={{ float: 'right', margin: '10px 0 30px 0' }}
        />
      </div>
    );
  }

  componentDidUpdate(oldProps: HomeProps) {
    if (oldProps.campaigns.length === 0 && this.props.campaigns.length > 0) {
      this.props.sortCampaigns(SortOptions.CLOSEST_END);
    }
  }

  componentDidMount() {
    this.props.fetchCampaigns();
  }
}

const mapStateToProps = ({
  campaignListState
}: StoreState): {
  campaigns: Campaign[];
  activePage: number;
  sortingOption: SortOptions;
} => {
  return {
    campaigns: campaignListState.displayedCampaigns,
    activePage: campaignListState.activePage,
    sortingOption: campaignListState.sortingOption
  };
};

export const Home = connect(
  mapStateToProps,
  { fetchCampaigns, changeCampaignsPage, filterCampaigns, sortCampaigns }
)(_Home);
