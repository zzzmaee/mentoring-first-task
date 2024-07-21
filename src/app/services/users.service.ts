import { inject, Injectable } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../components/users/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersApiService = inject(UsersApiService);

  private usersSubject$ = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject$.asObservable();

  constructor() {
  }

  public loadUsers(): void {
    this.usersApiService.getUsers().subscribe(users => {this.usersSubject$.next(users)});
  }

  public deleteUser(id: number): void {
    this.usersSubject$.next(this.usersSubject$.value.filter((user) => user.id !== id));
  }

  public addUser(user: User): void {
    this.usersSubject$.next([...this.usersSubject$.value, user]);
  }

  public editUser(user: User): void {
    this.usersSubject$.next(this.usersSubject$.getValue()
      .map((u) => (u.id === user.id ? user : u)));
  }
}
