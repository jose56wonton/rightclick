import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import SearchComponent from "../components/search-component";
import { withRouter } from "react-router";
import {connect} from 'react-redux';
import * as actions from '../actions';
class SearchContainer extends Component {
  handleSearch = event => {    
    this.props.history.push(`/${event.search}`);
    this.props.fetchPlayer(event.search);
  };
  render() {
    // Handle Submit is given to us by redux form. 
    //Once it is called it called the callback we are sending it
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSearch)}>
        <Field name="search" component={SearchComponent} />
      </form>
    );
  }
}

export default connect(null,actions)(withRouter(
  reduxForm({
    form: "PlayerSearch"
  })(SearchContainer)
));