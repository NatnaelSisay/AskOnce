import jwt_decode from 'jwt-decode';
import IUser from '../interface/IUser';
import readTokenFromStorage from './readTokenFromStorage';
const userFromToken = (): IUser =>
  jwt_decode<IUser>(readTokenFromStorage() ?? '');

export default userFromToken;
