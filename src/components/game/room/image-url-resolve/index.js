import { isAdmin } from '@/lib/is-admin';
import { isVisibleForMe } from '@/lib/is-visible-destinatary';
import { getPlayerNumber } from '@/lib/get-player-number';
import { getNumberPlayers } from '@/lib/get-number-players';

export const imageUrlResolve = (item, publicPath, isThumbnail) => {
  if (item.corrupted && !isAdmin() && isVisibleForMe(item.destinataries)) {
    return `${publicPath}game/common/corrupted-image.jpg`;
  }
  if (item.different) {
    return isVisibleForMe(item.destinataries) ?
      `${publicPath}game/${item.roomId}/${item.imageA}` :
      `${publicPath}game/${item.roomId}/${item.imageB}`;
  }
  if (item.differentMultiple) {
    const playerNumber = getPlayerNumber() || (getNumberPlayers());
    const byImageForMe = img => img.whoSees.indexOf(playerNumber) >= 0;
    const theImage = item.images.filter(byImageForMe)[0].image;
    return `${publicPath}game/${item.roomId}/${theImage}`;
  }
  if (isThumbnail) {
    if (item.type === 'VIDEO') return `${publicPath}game/common/play-video.jpg`;
    if (item.type === 'MP3') return `${publicPath}game/common/play-audio-thumb.jpg`;
    if (item.type === 'PDF') return `${publicPath}game/common/file.png`;
  }
  return `${publicPath}game/${item.roomId}/${item.image}`
};
