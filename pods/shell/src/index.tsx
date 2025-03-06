import('./shared/shared');
import('./bootstrap');

const script = document.createElement('script');
script.type = 'text/javascript';
script.src =
  'https://js-cdn.dynatracelabs.com/jstag/145e049b9b1/bf08595vkm/ff67370a529557de_complete.js';
script.crossOrigin = 'anonymous';
document.head.appendChild(script);
