import http from './http';

const register = (username, email, password) => {
  return http.post('/api/auth/register', {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return http
    .post('/api/auth/login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
