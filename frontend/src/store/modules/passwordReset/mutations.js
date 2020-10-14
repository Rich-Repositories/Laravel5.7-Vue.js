import { setProp } from '@/store/helpers';
import { SET_PASSWORD_RESET_EMAIL, SET_PASSWORD_RESET_TOKEN, SET_STATUS_PENDING } from '@/store/mutation-types';

export default {
  [SET_PASSWORD_RESET_EMAIL]: setProp('email'),
  [SET_PASSWORD_RESET_TOKEN]: setProp('token'),
  [SET_STATUS_PENDING]: setProp('status.pending'),
};
