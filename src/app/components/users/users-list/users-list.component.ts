import { Component, inject, OnInit } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { MatButton } from '@angular/material/button';
import { User } from '../user.model';
import { Store } from '@ngrx/store';
import { AppModel } from '../../../+state/global/app.model';
import { getUsers } from '../../../+state/store/users/users.selectors';
import * as UsersActions from '../../../+state/store/users/users.actions';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    NgForOf,
    AsyncPipe,
    MatButton
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  private store = inject(Store<AppModel>);
  public users$ = this.store.select(getUsers);
  private dialog = inject(MatDialog);

  constructor() {
  }

  ngOnInit(): void {
    const users = localStorage.getItem('users');
    if (users) {
      this.store.dispatch(UsersActions.loadUsersSuccess({users: JSON.parse(users) as User[]}));
    } else {
      this.store.dispatch(UsersActions.initUsers()); // Запрос к API для получения данных
    }
  }

  public onDeleteUser(id: number): void {
    this.store.dispatch(UsersActions.deleteUser({id: id}));
  }

  public openAddDialog() {
    const dialogWindow = this.dialog.open(CreateEditUserComponent, {
      width: '40%',
      data: {
        isEdit: true,
      }
    });
    dialogWindow.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(UsersActions.addUser({userData: result}));
      }
    });
  }

  public openEditDialog(user: User): void {
    const dialogWindow = this.dialog.open(CreateEditUserComponent, {
      width: '40%',
      data: user
    });
    dialogWindow.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(UsersActions.editUser({userData: result}));
      }
    });
  }
}
