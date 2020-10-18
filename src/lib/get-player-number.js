import gameConfig from '@/config/game-config';

export const getPlayerNumber = () =>
  gameConfig.players[Object.keys(gameConfig.players).find(code => window.location.href.indexOf(code)>=0)];
