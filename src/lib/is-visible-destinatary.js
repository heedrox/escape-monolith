import { getNumberPlayers } from './get-number-players';
import { getPlayerNumber } from '@/lib/get-player-number';

export const isVisibleForMe = (destinataries) => {
  if (!destinataries) return true;
  const numberPlayers = getNumberPlayers();
  const playerNumber = getPlayerNumber();
  return numberPlayers === 2 ?
    destinataries.ifTwo.indexOf(playerNumber) < 0 :
    destinataries.ifThree.indexOf(playerNumber) < 0;
};

