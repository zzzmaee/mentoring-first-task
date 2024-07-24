import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersModel } from './users.model';

export const getUsersSelector = createFeatureSelector<UsersModel>('users');

export const getUsers = createSelector(getUsersSelector, state => state.users);
