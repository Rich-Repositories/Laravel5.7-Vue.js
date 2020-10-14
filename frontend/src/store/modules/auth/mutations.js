import { setProp } from '@/store/helpers';
import {
  SET_AUTH_USER,
  SET_AUTH_EXPIRES_AT,
  SET_AUTH_ACCESS_TOKEN,
  SET_STATUS_PENDING,
} from '@/store/mutation-types';

export default {
  [SET_AUTH_USER]: setProp('user'),
  [SET_AUTH_EXPIRES_AT]: setProp('expiresAt'),
  [SET_AUTH_ACCESS_TOKEN]: setProp('accessToken'),
  [SET_STATUS_PENDING]: setProp('status.pending'),
};
