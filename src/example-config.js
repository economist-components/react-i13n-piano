// This config is for example only.
/* global window: false */
const dev = {
  endpoint: 'https://sandbox.tinypass.com/api/v3',
  aid: 'M3UZnikdix',
  debug: true,
  externalScript: '//sandbox.tinypass.com/api/tinypass.min.js',
};
const PianoConfig = {
  ...dev,
  eventHandlers: {
    pageview(
      nodeProps,
      User = { status: 'anonymous' },
      pathname = 'http://www.economist.com') {
      // Do your custom manipulation here.
      window.tp.setCustomVariable('userState', User.status);
      window.tp.setPageURL(pathname);
    },
  },
};
export default PianoConfig;
