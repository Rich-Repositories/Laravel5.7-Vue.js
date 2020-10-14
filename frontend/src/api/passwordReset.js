import { ApiClient } from '@/client';

const client = new ApiClient('/api/password');

export default {
  /**
   * Send password reset email
   *
   * @param {string} email User email
   * @returns {Promise<Object>} A Promise that contains a success message
   */
  email(email) {
    return client.post('/email', { email });
  },

  /**
   * Get password reset token
   *
   * @param {string} token password reset token
   * @returns {Promise<Object>} A Promise that contains the password reset token
   */
  find(token) {
    return client.get(`/find/${token}`);
  },

  /**
   * Reset password
   *
   * @param {Object} credentials User credentials
   * @param {string} credentials.email The email
   * @param {string} credentials.password The password
   * @param {string} credentials.password_confirmation The password confirmation
   * @param {string} credentials.token The password reset token
   * @returns {Promise<Object>} A Promise that contains current authenticated user
   */
  reset(credentials) {
    return client.post('/reset', credentials);
  },
};
