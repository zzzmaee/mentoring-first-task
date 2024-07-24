import { createReducer, on } from '@ngrx/store';
import { UsersState } from './users.state';
import * as UsersActions from './users.actions';

export const usersReducer = createReducer(
  UsersState,
  on(UsersActions.initUsers, (state) => {
    return {
      ...state,
      loading: true,
      error: ''
    };
  }),

  on(UsersActions.loadUsersSuccess, (state, action) => {
    return {
      ...state,
      users: [...action.users],
      loading: true,
      error: ''
    };
  }),

  on(UsersActions.loadUsersFailure, (state, action) => {
    return {
      ...state,
      users: [],
      loading: false,
      error: action.error
    };
  }),

  on(UsersActions.deleteUser, (state, action) => {
    return {
      ...state,
      error: ''
    };
  }),

  on(UsersActions.deleteUserSuccess, (state, action) => {
    return {
      ...state,
      users: state.users.filter(user => user.id !== action.id),
      loading: true,
      error: ''
    };
  }),

  on(UsersActions.deleteUserFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    };
  }),

  on(UsersActions.addUser, (state) => {
    return {
      ...state,
      loading: true,
      error: ''
    };
  }),

  on(UsersActions.addUserSuccess, (state, action) => {
    return {
      ...state,
      users: [...state.users, action.userData],
      loading: true,
      error: ''
    };
  }),

  on(UsersActions.addUserFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    };
  }),

  on(UsersActions.editUser, (state) => {
    return {
      ...state,
      loading: true,
      error: ''
    };
  }),

  on(UsersActions.editUserSuccess, (state, action) => {
    return {
      ...state,
      users: state.users.map(user => user.id === action.userData.id ? action.userData : user),
      loading: true,
      error: ''
    };
  }),

  on(UsersActions.editUserFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    };
  }),
);

export function _usersReducer(state: any, action: any) {
  return usersReducer(state, action);
}
