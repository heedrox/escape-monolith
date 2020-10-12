import gameConfig from '../config/game-config';

const getPlayerNumber = () =>
  gameConfig.players[Object.keys(gameConfig.players).find(code => window.location.href.indexOf(code)>=0)];

export const isCorruptedForMe = (destinataries) => {
  if (!destinataries) return true;
  const playerNumber = getPlayerNumber();
  return destinataries.indexOf(playerNumber) < 0;
};
