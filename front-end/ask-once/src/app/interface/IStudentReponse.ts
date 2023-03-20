import IUser from './IUser';

export default interface IStudentResponse {
  limit: string;
  page: string;
  students: IUser[];
}
