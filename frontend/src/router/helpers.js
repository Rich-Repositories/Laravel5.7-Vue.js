import store from '@/store';

export const requireAuth = (to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  const authUser = store.getters['auth/user'];

  if (!isAuthenticated) {
    return next({
      name: 'login',
      query: { redirect: to.fullPath },
    });
  }

  if (!authUser) {
    return store.dispatch('auth/user')
      .then(() => next())
      .catch(() => next({
        name: 'login',
        query: { redirect: to.fullPath },
      }));
  }

  return next();
};

export const requireGuest = (to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];

  if (isAuthenticated) return next('/dashboard');
  return next();
};
