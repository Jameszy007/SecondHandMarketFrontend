import { useState, useEffect } from 'react';
import authStore from '../utils/authStore';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(authStore.isAuthenticated());
  const [user, setUser] = useState(authStore.getCurrentUser());

  useEffect(() => {
    const unsubscribe = authStore.subscribe((authenticated) => {
      setIsAuthenticated(authenticated);
      setUser(authStore.getCurrentUser());
    });

    return unsubscribe;
  }, []);

  return {
    isAuthenticated,
    user,
    login: authStore.login.bind(authStore),
    register: authStore.register.bind(authStore),
    logout: authStore.logout.bind(authStore),
    getCurrentUser: authStore.getCurrentUser.bind(authStore)
  };
}
