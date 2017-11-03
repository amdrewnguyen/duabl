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

export const createTeam = (data) => {
  return $.ajax(
    {
      url: `/api/teams/`,
      method: 'post',
      data,
    }
  );
};

export const updateTeam = (data) => {
  return $.ajax(
    {
      url: `/api/teams/${data.team.id}`,
      method: 'patch',
      data,
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
