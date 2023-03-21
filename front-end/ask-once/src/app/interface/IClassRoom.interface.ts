import IUser from './IUser';

export default interface IClassRoom {
  professor: IUser;
  _id: string;
  name: string;
  students: [IUser];
  description: string;
}

export interface IClassRoomSuccessReponse {
  success: boolean;
  data: [IClassRoom];
}
