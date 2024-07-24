import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersApiService } from '../../../services/users-api.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import * as UsersActions from './users.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { User } from '../../../components/users/user.model';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private usersApiService = inject(UsersApiService);
  private localStorageService = inject(LocalStorageService);

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.initUsers),
      switchMap(() => {
        return this.usersApiService.getUsers().pipe(
          map((users: User[]) => {
            this.localStorageService.saveUsers(users);
            return UsersActions.loadUsersSuccess({users});
          }),
          catchError(error => {
            console.error('ERROR', error);
            return of(UsersActions.loadUsersFailure({error: error.message}));
          })
        );
      })
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      switchMap(action=>{
        return this.usersApiService.deleteUser(action.id).pipe(
          map(() => {
            const users = this.localStorageService.getUsers();
            const newUsers = users.filter(user => user.id !== action.id);
            this.localStorageService.saveUsers(newUsers);
            return UsersActions.deleteUserSuccess({id: action.id});
          }),
          catchError(error => {
            console.error('ERROR', error);
            return of(UsersActions.deleteUserFailure({error: error.message}));
          })
        )
      })
    )
  });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.addUser),
      switchMap(action => {
        return this.usersApiService.addUser(action.userData).pipe(
          map((user: User) => {
            const users = this.localStorageService.getUsers();
            users.push(user);
            this.localStorageService.saveUsers(users);
            return UsersActions.addUserSuccess({userData: action.userData});
          }),
          catchError(error => {
            console.error('ERROR', error);
            return of(UsersActions.addUserFailure({error: error.message}));
          })
        );
      })
    );
  });

  editUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.editUser),
      switchMap(action => {
        return this.usersApiService.editUser(action.userData).pipe(
          map((user: User) => {
            let users = this.localStorageService.getUsers();
            users = users.map(u => u.id === user.id ? user : u);
            this.localStorageService.saveUsers(users);
            return UsersActions.editUserSuccess({userData: action.userData});
          }),
          catchError(error => {
            console.error('ERROR', error);
            return of(UsersActions.editUserFailure({error: error.message}));
          })
        );
      })
    );
  })
}
