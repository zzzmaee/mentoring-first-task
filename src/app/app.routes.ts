import { Routes } from '@angular/router';
import {UsersListComponent} from "./components/users/users-list/users-list.component";
import { HomeComponent } from './components/users/home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersListComponent, title: 'USERS'}
];
