import * as types from "./types";
import * as api from "../api";
import { getPlayer } from "./player-actions";


export const getMatch = playerName => {
  let count = 0;
  return (dispatch, getState) => {    
    return dispatch(getPlayer(playerName)).then(() => {
      const accountId = getState().player.accountId;
      return dispatch(getMatches(accountId)).then(() => {
        const num = getState().match.matches.length-1;
        getState().match.matches.forEach((ele, i) => {          
            dispatch(getMatchData(ele.gameId, i)).then(()=>{
              count+= i;
              if(count === (num * num + num)/2){
                dispatch({type: types.GET_DIVISION_SUCCESS_ALL});
              }
            });
                    
        });
      });
    });
  };
};
const getMatches = accountId => {
  const matchesRequest = api.fetchMatches(accountId);
  return dispatch => {
    dispatch({ type: types.GET_MATCHES_REQUEST });
    return matchesRequest.then(
      response => {
        dispatch({ type: types.GET_MATCHES_SUCCESS, payload: response });
      },
      error => {
        dispatch({ type: types.GET_MATCHES_FAILURE, payload: error });
        throw error;
      }
    );
  };
};
const getMatchData = (gameId, i) => {
  const matchRequest = api.fetchMatch(gameId);
  return dispatch => {
    dispatch({ type: types.GET_MATCH_REQUEST });
    return matchRequest.then(
      response => {
        dispatch({
          type: types.GET_MATCH_SUCCESS,
          payload: response,
          index: i
        });
      },
      error => {
        dispatch({ type: types.GET_MATCH_FAILURE, payload: error });
        throw error;
      }
    );
  };
};
