// This config is for example only.
/* global window: false */
const aid = 'M3UZnikdix';
const dev = {
  debug: true,
  externalScript: `//sandbox.tinypass.com/xbuilder/experience/load?aid=${ aid }`,
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
