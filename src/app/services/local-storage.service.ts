import { Injectable } from '@angular/core';
import { User } from '../components/users/user.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public readonly KEY = 'users';

  public getUsers(): User[] {
    const storedUsers = localStorage.getItem(this.KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  public saveUsers(users: User[]) {
    localStorage.setItem(this.KEY, JSON.stringify(users));
  }
}
