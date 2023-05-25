
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const handstick = document.querySelector('iframe');
const STORAGE_KEY = 'videoplayer-current-time';



const player = new Player(handstick, {
  id: 'vimeo-player',

});

player.on('timeupdate', throttle(function ({seconds}) {

    localStorage.setItem(STORAGE_KEY, seconds);

  }, 1000
));
player.setCurrentTime(localStorage.getItem(STORAGE_KEY) || 0);

// Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player, але враховуй, що у тебе плеєр доданий як npm пакет, а не через CDN.
// Вивчи документацію методу on() і почни відстежувати подію timeupdate - оновлення часу відтворення.
// Зберігай час відтворення у локальне сховище. Нехай ключем для сховища буде рядок "videoplayer-current-time".
// Під час перезавантаження сторінки скористайся методом setCurrentTime() з метою відновлення відтворення зі збереженої позиції.
// Додай до проекту бібліотеку lodash.throttle і зроби так, щоб час відтворення оновлювався у сховищі не частіше, ніж раз на секунду.