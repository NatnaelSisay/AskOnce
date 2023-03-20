import IUser from './IUser';

export default interface IAnswerData {
  _id: string;
  answer: {
    _id: string;
    answer: string;
    user: IUser;
  };
}
