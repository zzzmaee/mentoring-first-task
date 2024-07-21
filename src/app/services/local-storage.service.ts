import { Injectable } from '@angular/core';
import { User } from '../components/users/user.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  getUsers(): User[] | [] {
    const data = localStorage.getItem('Users');
    return data ? JSON.parse(data) : [];
  }

  setUsers(data: string): string {
    localStorage.setItem('Users', data);
    return data;
  }

  removeUsers(): boolean {
    localStorage.removeItem('Users');
    return true;
  }
}
