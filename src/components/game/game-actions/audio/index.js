import gameConfig from '../../../../config/game-config';

const audioAction = (path, audioId) => {
  const theAudio = gameConfig.items.find(aud => aud.id === audioId);
  if (!theAudio) {
    console.log('Audio not found', audioId, gameConfig.items);
    return;
  }
  const audioObj = new Audio(`${path}game/${theAudio.roomId}/${theAudio.image}`);
  audioObj.loop = false;
  audioObj.play();
};

export {
  audioAction,
};
