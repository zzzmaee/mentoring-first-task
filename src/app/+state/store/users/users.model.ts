import { User } from '../../../components/users/user.model';

export interface UsersModel {
  users: User[];
  loading: boolean;
  error: string;
}
