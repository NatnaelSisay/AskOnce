import IUser from './IUser';

export interface IAnswerData {
  _id: string;
  answer: string;
  user: IUser;
}

export interface IGetAnswers {
  success: boolean;
  data: {
    answers: IAnswerData[];
  }[];
}
