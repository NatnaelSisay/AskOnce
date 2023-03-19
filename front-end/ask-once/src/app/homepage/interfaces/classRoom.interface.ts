import { User } from './user.interface';

export interface ClassRoom {
  professor: User;
  _id: string;
  name: string;
  students: [User];
}
