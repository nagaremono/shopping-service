import { Action } from 'routing-controllers';
import { User } from '../models/User';

export const currentUserChecker = async (action: Action) => {
  return User.findByPk(action.request.session.userId);
};
