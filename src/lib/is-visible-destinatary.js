import gameConfig from '../config/game-config';
import { getNumberPlayers } from './get-number-players';

const getPlayerNumber = () =>
  gameConfig.players[Object.keys(gameConfig.players).find(code => window.location.href.indexOf(code)>=0)];

export const isVisibleForMe = (destinataries) => {
  if (!destinataries) return true;
  const numberPlayers = getNumberPlayers();
  const playerNumber = getPlayerNumber();
  return numberPlayers === 2 ?
    destinataries.ifTwo.indexOf(playerNumber) < 0 :
    destinataries.ifThree.indexOf(playerNumber) < 0;
};
