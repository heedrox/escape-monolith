const getNumberPlayers = () => {
  const currentLoc = window.location.href.substring(8); //remove https://
  return currentLoc.split('/').length >= 3 ? parseInt(currentLoc.split('/')[2]) : 2;
};

export {
  getNumberPlayers,
};
