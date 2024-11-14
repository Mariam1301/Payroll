import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/login.model';
import { AuthUser } from './user.state';

export const setUser = createAction(
  '[User] setUser',
  props<{ user: AuthUser }>()
);
