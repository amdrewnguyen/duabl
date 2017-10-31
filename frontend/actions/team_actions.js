import * as TeamAPI from '../util/team_api_util';

export const RECEIVE_TEAMS = 'RECEIVE_TEAMS';
export const RECEIVE_TEAM = 'RECEIVE_TEAM';
export const REQUEST_TEAMS = 'REQUEST_TEAMS';
export const REQUEST_TEAM = 'REQUEST_TEAM';
export const REMOVE_TEAM = 'REMOVE_TEAM';
export const RECEIVE_TEAM_ERRORS = 'RECEIVE_TEAM_ERRORS';

export const receiveTeams = (payload) => (
  {
    type: RECEIVE_TEAMS,
    teams: payload.teams,
    users: payload.users,
  }
);

export const receiveTeam = (team) => (
  {
    type: RECEIVE_TEAM,
    team,
  }
);

export const requestTeams = () => (
  {
    type: REQUEST_TEAMS,
  }
);

export const requestProjectTeams = (projectId) => (
  {
    type: REQUEST_TEAMS,
    projectId,
  }
);

export const requestTeam = (teamId) => (
  {
    type: REQUEST_TEAM,
    teamId,
  }
);

export const removeTeam = (team) => (
  {
    type: RECEIVE_TEAM,
    teamId: team.id,
    projectId: team.projectId,
  }
);

export const receiveTeamErrors = (errors) => (
  {
    type: RECEIVE_TEAM_ERRORS,
    errors,
  }
);

export const fetchTeams = () => dispatch => {
  // dispatch(requestTeams());
  return TeamAPI.fetchTeams()
    .then(
      (teams) => dispatch(receiveTeams(teams)),
      (errors) => dispatch(receiveTeamErrors(errors))
    );
};

export const fetchProjectTeams = (projectId) => dispatch => {
  dispatch(requestProjectTeams(projectId));
  return TeamAPI.fetchProjectTeams(projectId)
    .then(
      (teams) => dispatch(receiveTeams(teams)),
      (errors) => dispatch(receiveTeamErrors(errors))
    );
};

export const fetchTeam = (teamId) => dispatch => (
  TeamAPI.fetchTeam(teamId)
    .then(
      (team) => dispatch(receiveTeam(team)),
      (errors) => dispatch(receiveTeamErrors(errors))
    )
);

export const createTeam = (team) => dispatch => (
  TeamAPI.createTeam(team)
    .then(
      (newTeam) => dispatch(receiveTeam(newTeam)),
      (errors) => dispatch(receiveTeamErrors(errors))
    )
);

export const updateTeam = (team) => dispatch => (
  TeamAPI.updateTeam(team)
    .then(
      (newTeam) => dispatch(receiveTeam(newTeam)),
      (errors) => dispatch(receiveTeamErrors(errors))
    )
);

export const deleteTeam = (teamId) => dispatch => (
  TeamAPI.deleteTeam(teamId)
    .then(
      (team) => dispatch(removeTeam(team)),
      (errors) => dispatch(receiveTeamErrors(errors))
    )
);
