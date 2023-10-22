import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

function getItemStorage() {
  const savedTime = localStorage.getItem(STORAGE_KEY);
  return savedTime ? parseFloat(savedTime) : 0;
}

player.on(
  'timeupdate',
  throttle(evt => {
    const currentTime = evt.seconds;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTime));
  }, 1000)
);

if (getItemStorage() > 0) {
  player.setCurrentTime(getItemStorage());
}
