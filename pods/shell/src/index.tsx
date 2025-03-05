import('./shared/shared');
import('./bootstrap');

const script = document.createElement('script');
script.type = 'text/javascript';
script.src =
  'https://js-cdn.dynatracelabs.com/jstag/145e049b9b1/bf08595vkm/ff67370a529557de_complete.js';
script.crossOrigin = 'anonymous';
document.head.appendChild(script);

document.addEventListener('click', (event) => {
  console.log('Listening');
  console.log(event.target);
  const moduleElement = event.target.closest('[data-scope]');
  if (moduleElement) {
    console.log(
      `Interacted with ${moduleElement.dataset.module} from ${moduleElement.dataset.scope}`,
    );
  }
});

const originalRequire = __webpack_require__;

__webpack_require__ = new Proxy(originalRequire, {
  apply(target, thisArg, args) {
    const moduleRequest = args[0];
    if (typeof moduleRequest === 'string' && moduleRequest.includes('/')) {
      const [scope, moduleName] = moduleRequest.split('/');
      console.log(`Dynamically loaded: ${moduleName} fro scope ${scope}`);
    }
    return target.apply(thisArg, args);
  },
});
