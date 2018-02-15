import { connect } from "react-redux";
import * as actions from "../../actions";
import React, { Component } from "react";
import * as status from "../../reducers/status";
import MatchContainer from "./match-container";
import Loading from "../../components/general/loading";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import { withRouter } from "react-router";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  container: {
    margin: "0 auto",
    maxWidth: 1100
  },
  paper: {
    padding: 16,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class MatchesContainer extends Component {
  componentDidMount = () => {
    this.pullMatchData();
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.own.playerName !== this.props.own.playerName) {
      this.pullMatchData(nextProps.own.playerName);
    }
  }
  pullMatchData = (name=this.props.playerName) => {
    if (
      this.props.match.status === status.INIT ||
      this.props.match.status === status.SUCCESS
    ) {
      this.props.getMatch(name);
    }
    if (this.props.static.status === status.INIT) {
      this.props.getStatic();
    }
  };
  rowClick = player => {
    this.props.history.push(`/${player}`);
  };
  generateMatchTiles = () => { 
    return this.props.match.matches.map((m, i) => {
      if (
        m.general &&
        (m.general.gameMode === "CLASSIC" ||
          m.general.gameMode === "MATCHED_GAME")
      ) {
        return (
          <Grid key={i} item xs={12}>
            <MatchContainer player={this.props.player} key={i} rowClick={this.rowClick} match={m} />
          </Grid>
        );
      } else return null;
    });
  };
  render = () => {
    const {classes} = this.props;
    // If Loading
    if (
      this.props.match.status === status.LOADING ||
      this.props.player.status === status.LOADING
    )
      return <Loading />;
    // If Unranked
    // if (this.props.match.status === status.SUCCESS && !this.props.match)
    //   return <LeagueUnrankedComponent />;
    // If ranked
    if (this.props.match.status === status.SUCCESS && this.props.player.status === status.SUCCESS) {
      // return (
      //   <MatchComponent />
      // )
      return (
        <div className={classes.root}>
          <Grid className={classes.container} container spacing={24}>
            {this.generateMatchTiles()}
          </Grid>
        </div>
      );
    }
    return null;
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    match: state.match,
    player: state.player,
    static: state.static,
    own: ownProps
  };
};
export default withRouter(withStyles(styles)(
  connect(mapStateToProps, actions)(MatchesContainer))
);
