export const fetchTeams = () => {
  return $.ajax(
    {
      url: '/api/teams',
      method: 'get',
    }
  );
};

export const fetchTeam = (teamId) => {
  return $.ajax(
    {
      url: `/api/teams/${teamId}`,
      method: 'get',
    }
  );
};

export const createTeam = (team) => {
  return $.ajax(
    {
      url: `/api/teams/`,
      method: 'post',
      data: { team },
    }
  );
};

export const updateTeam = (team) => {
  return $.ajax(
    {
      url: `/api/teams/${team.id}`,
      method: 'patch',
      data: { team },
    }
  );
};

export const deleteTeam = (teamId) => {
  return $.ajax(
    {
      url: `/api/teams/${teamId}`,
      method: 'delete',
    }
  );
};
