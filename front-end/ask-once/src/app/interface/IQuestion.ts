import IUser from './IUser';

export default interface IQuestion {
  _id: string;
  question: string;
  tags: string[];
  description: string;
  askedBy: IUser;
  answers: any[];
  showAnswers: boolean;
  likes: string[];
}
