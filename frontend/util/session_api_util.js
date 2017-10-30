export const signup = user => (
  $.ajax({
    url: '/api/users',
    method: 'post',
    data: { user },
  })
);

export const login = user => (
  $.ajax({
    url: '/api/session',
    method: 'post',
    data: { user },
  })
);

export const logout = () => (
  $.ajax({
    url: '/api/session',
    method: 'delete',
  })
);

export const updateUser = (formData) => (
  $.ajax({
    url: `/api/users/${11}`,
    method: 'patch',
    processData: false,
    contentType: false,
    dataType: 'json',
    data: formData,
  })
);
