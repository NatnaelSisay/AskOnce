import IUser from './IUser';

export default interface IQuestion {
  _id: string;
  question: string;
  tags: string[];
  description: string;
  askedBy: IUser;
  
  showAnswers: boolean;
  likes: string[];
  answer_count: number;
}
