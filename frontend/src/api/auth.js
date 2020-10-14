import { ApiClient } from '@/client';

const client = new ApiClient('/api/auth');

export default {
  /**
   * Signup User
   *
   * @param {Object} user
   * @param {string} user.name User name
   * @param {string} user.email User email
   * @param {string} user.password User password
   * @param {string} user.password_confirmation User password confirmation
   * @returns {Promise<Object>} A Promise that contains a success message
   */
  signup(user) {
    return client.post('/signup', user);
  },

  /**
   * Activate User
   *
   * @param {string} token Signup Token
   * @returns {Promise<Object>} A Promise that contains the activated user
   */
  activate(token) {
    return client.get(`/signup/activate/${token}`);
  },

  /**
   * Login User
   *
   * @param {Object} user
   * @param {string} user.email User email
   * @param {string} user.password User password
   * @param {boolean} user.remember_me Whether to remember User
   * @returns {Promise<Object>} A Promise that contains access_token, password and expires_at data
   */
  login(user) {
    return client.post('/login', user);
  },

  /**
   * Get current authenticated user
   *
   * @returns {Promise<Object>} A Promise that contains current authenticated user
   */
  user() {
    return client.get('/user');
  },

  /**
   * Logout User
   *
   * @returns {Promise<Object>} A Promise that contains a success message
   */
  logout() {
    return client.get('/logout');
  },
};
