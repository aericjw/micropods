import translations from './translations';
import pubSub from './pubSub';
import dynatraceShared from './dynatraceShared';

const micropods = {
  translations,
  pubSub,
  dynatraceShared,
};

declare global {
  interface Window {
    micropods: typeof micropods;
  }
}

window.micropods = micropods;
