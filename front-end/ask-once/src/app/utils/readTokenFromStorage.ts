const readTokenFromStorage = () => {
  const token = localStorage.getItem("token");
  return token;
};

export default readTokenFromStorage;
