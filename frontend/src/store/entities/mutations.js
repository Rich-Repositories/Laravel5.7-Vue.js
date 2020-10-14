import * as types from '@/store/mutation-types';
import { setEntity } from '@/store/helpers';

export default {
  [types.SET_USERS]: setEntity('users'),
};
