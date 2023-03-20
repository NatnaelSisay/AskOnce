import userFromToken from './decodeJwt';
import readTokenFromStorage from './readTokenFromStorage';
const amIProfessor = () => {
  return userFromToken().role === 'PROFESSOR';
};

export default amIProfessor;
