import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchCampaigns,
  changeCampaignsPage,
  filterCampaigns,
  sortCampaigns
} from "../actions";
import { StoreState } from "../reducers";
import { Campaign, UserCurrent } from "../interfaces";
import { config } from "../config";
import {
  Grid,
  Button,
  Icon,
  Pagination,
  PaginationProps,
  DropdownProps,
  Image,
  Segment,
  Loader,
  Dimmer
} from "semantic-ui-react";
import { CampaignList } from "./CampaignList";
import { FilterDropdown, FilterOptions } from "./FilterDropdown";
import { SortDropdown, SortOptions } from "./SortDropdown";
import { Link } from "react-router-dom";

interface HomeProps {
  campaigns: Campaign[];
  fetchCampaigns: Function;
  changeCampaignsPage: typeof changeCampaignsPage;
  filterCampaigns: typeof filterCampaigns;
  sortCampaigns: typeof sortCampaigns;
  activePage: number;
  sortingOption: SortOptions;
  userLoggedIn: boolean | null;
  user: UserCurrent | null;
}

interface HomeState {
  loading: boolean;
}

class _Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      loading: false
    };

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

  LinkToHome = () => {
    if (!this.props.userLoggedIn) {
      return null;
    }

    return (
      <Grid.Column floated="right" textAlign="right">
        <Link to="/new">
          <Button color="green" icon labelPosition="left" size="large">
            <Icon name="plus" />
            New Campaign
          </Button>
        </Link>
      </Grid.Column>
    );
  };

  MainContent = () => {
    if (this.props.campaigns.length === 0) {
      return <div>There are no created campaigns</div>;
    }

    const numberOfPages = Math.ceil(
      this.props.campaigns.length / config.MAX_CAMPAIGNS_PER_PAGE
    );

    let campaignsVisible;
    if (!(this.props.user && this.props.user.role === "admin")) {
      campaignsVisible = this.props.campaigns.filter(
        camp => camp.approved === true
      );
    } else {
      campaignsVisible = this.props.campaigns;
    }

    return (
      <>
        <Grid.Column width="16">
          <CampaignList
            activePage={this.props.activePage}
            campaigns={campaignsVisible}
          ></CampaignList>
        </Grid.Column>
        <Grid.Column width="16">
          <Pagination
            activePage={this.props.activePage}
            onPageChange={this.handlePaginationChange}
            totalPages={numberOfPages}
            style={{ float: "right", margin: "10px 0 30px 0" }}
          />
        </Grid.Column>
      </>
    );
  };

  render() {
    if (this.state.loading) {
      // return <div>Loading...</div>;
      return (
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>

          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      );
    }

    return (
      <div>
        <Grid>
          <Grid.Row columns="2">
            <Grid.Column>
              <h1 style={{ paddingBottom: "2rem" }}>Campaigns</h1>
            </Grid.Column>
            <this.LinkToHome />
          </Grid.Row>
          <Grid.Row style={{ marginBottom: "2rem" }}>
            <Grid.Column mobile="8" tablet="8" computer="5">
              <SortDropdown onChange={this.handleSort}></SortDropdown>
            </Grid.Column>
            <Grid.Column mobile="8" tablet="8" computer="5">
              {this.props.user && this.props.user.role === "admin" ? (
                <FilterDropdown onChange={this.handleFilter} />
              ) : null}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <this.MainContent />
          </Grid.Row>
        </Grid>
      </div>
    );
  }

  componentDidUpdate(oldProps: HomeProps) {
    if (oldProps.campaigns.length === 0 && this.props.campaigns.length > 0) {
      this.props.sortCampaigns(SortOptions.CLOSEST_END);
    }
  }

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      await this.props.fetchCampaigns();
    } catch (error) {
      console.log(error);
    }
    this.setState({ loading: false });
  }
}

const mapStateToProps = ({
  campaignListState,
  userState
}: StoreState): {
  campaigns: Campaign[];
  activePage: number;
  sortingOption: SortOptions;
  userLoggedIn: boolean | null;
  user: UserCurrent | null;
} => {
  const { user } = userState;

  return {
    campaigns: campaignListState.displayedCampaigns,
    activePage: campaignListState.activePage,
    sortingOption: campaignListState.sortingOption,
    userLoggedIn: userState.loggedIn,
    user
  };
};

export const Home = connect(mapStateToProps, {
  fetchCampaigns,
  changeCampaignsPage,
  filterCampaigns,
  sortCampaigns
})(_Home);
