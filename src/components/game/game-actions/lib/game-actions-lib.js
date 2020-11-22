export default {
  send(gameState, action) {
    gameState.update( { action });
    setTimeout(() => {
      gameState.update( { action: null });
    }, 1000);
  },
  isAction(gameState, actionId) {
    return gameState.action && (gameState.action.id === actionId);
  }
}
