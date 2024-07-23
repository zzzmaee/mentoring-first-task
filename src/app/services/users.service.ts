import { inject, Injectable } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../components/users/user.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersApiService = inject(UsersApiService);
  private localStorageService = inject(LocalStorageService);

  private usersSubject$ = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject$.asObservable();

  constructor() {
    this.localStorageService.getUsers();
  }

  public loadUsers(): void {
    const localUsers = this.localStorageService.getUsers();
    if (localUsers.length > 0) {
      this.usersSubject$.next(localUsers);
    } else {
      this.usersApiService.getUsers().subscribe((users: User[]) => {
        this.usersSubject$.next(users);
        this.localStorageService.saveUsers(users);
      });
    }
  }

  public deleteUser(id: number): void {
    const updatedUsers = this.usersSubject$.value.filter(user => user.id !== id);
    this.usersSubject$.next(updatedUsers);
    this.localStorageService.saveUsers(updatedUsers);
  }

  public addUser(user: User): void {
    const currentUsers = this.usersSubject$.value;
    const newUsers = {...user};
    newUsers.id = currentUsers.length + 1;
    const updatedUsers = [...currentUsers, newUsers];
    this.usersSubject$.next(updatedUsers);
    this.localStorageService.saveUsers(updatedUsers);
  }

  public editUser(user: User): void {
    const updatedUsers = this.usersSubject$.getValue()
      .map((u) => (u.id === user.id ? user : u));
    this.usersSubject$.next(updatedUsers);
    this.localStorageService.saveUsers(updatedUsers);
  }
}
