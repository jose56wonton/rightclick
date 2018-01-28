import { connect } from "react-redux";
import * as actions from "../../actions";
import React, { Component } from "react";
import * as status from "../../reducers/status";
import { withRouter } from "react-router";
import NavContainer from "../nav-container";
import TabContainer from "../tab-container";
import LeagueOverViewComponent from "../../components/league/league-overview-component";
import LeagueUnrankedComponent from "../../components/league/league-unranked-component";
import LeagueTableComponent from "../../components/league/league-table-component";
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
  }
  getRankIcon = () => {
    return (
      `https://raw.githubusercontent.com/jose56wonton/RightClick.GG/master/src/assets/images/` +
      `${this.props.league.tier.toLowerCase() +
        "_" +
        this.props.league.rank.toLowerCase()}.png`
    );
  };
  render = () => {
    // If Loading
    if (this.props.league.status === status.LOADING || this.props.player.status === status.LOADING)
      return <div className="loading loading-lg" />;
    // If Unranked
    if (this.props.league.status === status.SUCCESS && !this.props.league.tier)
      return <LeagueUnrankedComponent />;
    // If ranked
    if (this.props.league.status === status.SUCCESS)
      return (
        <div className="tile is-vertical is-ancestor">
          <LeagueOverViewComponent
            player={this.props.player}
            league={this.props.league}
            rankIconPath={this.getRankIcon()}
          />
          <LeagueTableComponent league={this.props.league} />
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
export default connect(mapStateToProps, actions)(LeagueContainer);