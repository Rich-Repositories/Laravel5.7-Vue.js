import authClient from '@/api/auth';
import { normalize } from 'normalizr';
import userSchema from '@/store/schemas/userSchema';
import {
  SET_USERS,
  SET_AUTH_USER,
  SET_AUTH_EXPIRES_AT,
  SET_AUTH_ACCESS_TOKEN,
  SET_STATUS_PENDING,
} from '@/store/mutation-types';

export default {
  signup({ commit }, data) {
    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
    };

    commit(SET_STATUS_PENDING, true);

    return authClient.signup(user)
      .then(() => {
        commit(SET_STATUS_PENDING, false);
        return Promise.resolve();
      })
      .catch((error) => {
        commit(SET_STATUS_PENDING, false);
        return Promise.reject(error.response);
      });
  },
  activate({ commit }, token) {
    commit(SET_STATUS_PENDING, true);
    return authClient.activate(token)
      .then(() => {
        commit(SET_STATUS_PENDING, false);
        return Promise.resolve();
      })
      .catch((error) => {
        commit(SET_STATUS_PENDING, false);
        return Promise.reject(error.response);
      });
  },
  login({ dispatch, commit }, user) {
    commit(SET_STATUS_PENDING, true);
    return authClient.login(user)
      .then(({ data }) => {
        const auth = {
          accessToken: data.access_token,
          expiresAt: data.expires_at,
        };

        window.localStorage.setItem('auth', JSON.stringify(auth));

        commit(SET_AUTH_ACCESS_TOKEN, auth.accessToken);
        commit(SET_AUTH_EXPIRES_AT, auth.expiresAt);

        return dispatch('user')
          .then(() => Promise.resolve())
          .catch(() => Promise.reject());
      })
      .catch((error) => {
        commit(SET_STATUS_PENDING, false);
        return Promise.reject(error.response);
      });
  },
  user({ commit }) {
    return authClient.user()
      .then(({ data }) => {
        const normalizedData = normalize(data, userSchema);

        const { users } = normalizedData.entities;

        commit(`entities/${SET_USERS}`, users, { root: true });
        commit(SET_AUTH_USER, normalizedData.result);

        commit(SET_STATUS_PENDING, false);
        return Promise.resolve();
      })
      .catch((error) => {
        commit(SET_STATUS_PENDING, false);
        return Promise.reject(error.response);
      });
  },
};
