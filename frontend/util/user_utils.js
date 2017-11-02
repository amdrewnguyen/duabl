export const searchUsers = (queryString) => (
  $.ajax(
    {
      url: `/api/users/?search=${queryString}`,
      method: 'get'
    }
  )
);
