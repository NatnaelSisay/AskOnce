import jwt_decode from 'jwt-decode';
import IUser from '../interface/IUser';
import readTokenFromStorage from './readTokenFromStorage';
const amIProfessor = () => {
  const token = readTokenFromStorage();
  if (!token) return false;
  const decoded = jwt_decode<IUser>(token);
  return decoded.role === 'PROFESSOR';
};

export default amIProfessor;