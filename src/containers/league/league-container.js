import { connect } from "react-redux";
import * as actions from "../../actions";
import React, { Component } from "react";
import * as status from "../../reducers/status";
import { withRouter } from "react-router";
import LeagueOverViewComponent from "../../components/league/league-overview-component";
import LeagueUnrankedComponent from "../../components/league/league-unranked-component";
import LeagueTableComponent from "../../components/league/league-table-component";
import Loading from '../../components/general/loading';
class LeagueContainer extends Component {
  componentDidMount = () => {
    this.pullLeagueData();
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.own.playerName !== this.props.own.playerName) {
      this.pullLeagueData();
    }
  }
  pullLeagueData = () => {
    if (
      this.props.league.status === status.INIT ||
      this.props.league.status === status.SUCCESS
    ) {
      this.props.getLeague(this.props.playerName);
    }
    if (this.props.static.status === status.INIT) {
      this.props.getStatic();
    }
  };
  getRankIcon = () => {
    return (
      `https://raw.githubusercontent.com/jose56wonton/RightClick.GG/master/src/assets/images/` +
      `${this.props.league.tier.toLowerCase() +
        "_" +
        this.props.league.rank.toLowerCase()}.png`
    );
  };
  rowClick = (player) => {
    console.log(player);
    this.props.history.push(`/${player}`);
  }
  render = () => {
    // If Loading
    if (
      this.props.league.status === status.LOADING ||
      this.props.player.status === status.LOADING
    )
      return <Loading />;
    // If Unranked
    if (this.props.league.status === status.SUCCESS && !this.props.league.tier)
      return <LeagueUnrankedComponent />;
    // If ranked
    if (this.props.league.status === status.SUCCESS)
      return (
        <div className="columns league">

          <div className="column is-6">
            <LeagueOverViewComponent
              player={this.props.player}
              league={this.props.league}
              rankIconPath={this.getRankIcon()}
            />
          </div>
          <div className="column is-6 is-parent">
            <LeagueTableComponent rowClick={this.rowClick} league={this.props.league} />
          </div>
        </div>
      );
    return null;
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    league: state.league,
    player: state.player,
    static: state.static,
    own: ownProps
  };
};
export default connect(mapStateToProps, actions)(withRouter(LeagueContainer));
// 
