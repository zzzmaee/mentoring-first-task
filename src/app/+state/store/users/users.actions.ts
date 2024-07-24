import { createAction, props } from '@ngrx/store';
import { User } from '../../../components/users/user.model';

export const initUsers = createAction(
  '[User] Load Users'
);
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>());
export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: string }>());

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: number }>());
export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ id: number }>());
export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: string }>());

export const addUser = createAction(
  '[User] Add User',
  props<{ userData: User }>());
export const addUserSuccess = createAction(
  '[User] Add User Success',
  props<{ userData: User }>());
export const addUserFailure = createAction(
  '[User] Add User Failure',
  props<{ error: string }>());

export const editUser = createAction(
  '[User] Edit User',
  props<{ userData: User }>());
export const editUserSuccess = createAction(
  '[User] Edit User Success',
  props<{ userData: User }>());
export const editUserFailure = createAction(
  '[User] Edit User Failure',
  props<{ error: string }>());
