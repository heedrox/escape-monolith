import playerCodes from '@/config/player-codes';

export const getPlayerNumber = () =>
  playerCodes[Object.keys(playerCodes).find(code => window.location.href.indexOf(code)>=0)];
