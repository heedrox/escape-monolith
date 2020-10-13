const getGameCode = () => {
  const currentLoc = window.location.href.substring(8); //remove https://
  return currentLoc.split('/').length >= 3 ? currentLoc.split('/')[1] : 'default-code';
};

export {
  getGameCode,
};
