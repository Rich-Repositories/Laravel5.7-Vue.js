import passwordResetClient from '@/api/passwordReset';
import {
  SET_STATUS_PENDING,
  SET_PASSWORD_RESET_EMAIL,
  SET_PASSWORD_RESET_TOKEN,
} from '@/store/mutation-types';

export default {
  sendEmail({ commit }, email) {
    commit(SET_STATUS_PENDING, true);
    return passwordResetClient.email(email)
      .then(() => {
        commit(SET_STATUS_PENDING, false);
        return Promise.resolve();
      })
      .catch((error) => {
        commit(SET_STATUS_PENDING, false);
        return Promise.reject(error.response);
      });
  },
  findToken({ commit }, token) {
    commit(SET_STATUS_PENDING, true);

    return passwordResetClient.find(token)
      .then(({ data }) => {
        const { email } = data;
        commit(SET_PASSWORD_RESET_EMAIL, email);
        commit(SET_PASSWORD_RESET_TOKEN, token);
        commit(SET_STATUS_PENDING, false);
        return Promise.resolve();
      })
      .catch((error) => {
        commit(SET_STATUS_PENDING, false);
        return Promise.reject(error.response);
      });
  },
  reset({ state, commit }, credentials) {
    commit(SET_STATUS_PENDING, true);

    const data = {
      email: state.email,
      token: state.token,
      password: credentials.password,
      password_confirmation: credentials.passwordConfirmation,
    };

    return passwordResetClient.reset(data)
      .then(() => {
        commit(SET_STATUS_PENDING, false);
        return Promise.resolve();
      })
      .catch((error) => {
        commit(SET_STATUS_PENDING, false);
        return Promise.reject(error.response);
      });
  },
};
