import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../components/users/user.model";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private http = inject(HttpClient);
  private api = 'https://jsonplaceholder.typicode.com/users'

  constructor() {
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api)
  }
}
