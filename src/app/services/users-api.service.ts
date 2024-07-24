import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../components/users/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private http = inject(HttpClient);
  private api = 'https://jsonplaceholder.typicode.com/users';

  constructor() {
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  public deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.api}/${id}`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(this.api, user)
  }

  public editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.api}/${user.id}`, user);
  }
}
