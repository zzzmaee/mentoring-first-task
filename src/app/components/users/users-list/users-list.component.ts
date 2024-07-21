import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { MatButton } from '@angular/material/button';
import { User } from '../user.model';

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
  private usersService = inject(UsersService);
  public users$ = this.usersService.users$;
  private dialog = inject(MatDialog);

  constructor() {
  }

  ngOnInit(): void {
    this.usersService.loadUsers();
  }

  public onDeleteUser(id: number): void {
    this.usersService.deleteUser(id);
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
        this.usersService.addUser(result);
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
        this.usersService.editUser(result);
      }
    });
  }
}
