/* eslint-disable id-match, no-undef, camelcase */
import PianoConfig from '../src/example-config.js';
import ReactI13nPiano from '../src/index';
import chai from 'chai';
import spies from 'chai-spies';
chai.use(spies);
chai.should();
mocha.setup({ globals: [ 'tp', 'init', 'jQuery*' ] });
describe('PianoPlugin is a i13n plugin for Piano', () => {
  describe('ensureScriptHasLoaded', () => {
    it('calls loadExternalScript if it was passed', () => {
      const loadExternalScript = chai.spy(() => Promise.resolve());
      const plugin = new ReactI13nPiano({ loadExternalScript });
      plugin.ensureScriptHasLoaded();
      loadExternalScript.should.have.been.called(1);
    });
  });
  describe('piano plugin', () => {
    it('window.tp.experience.execute() is called with specific properties',
    () => {
      const TrackedApp = new ReactI13nPiano(PianoConfig);
      TrackedApp.updateTinypass = chai.spy(() => Promise.resolve());
      return TrackedApp.pageview().then(() => {
        TrackedApp.updateTinypass.should.have.been.called(1);
        const pianoTp = window.tp;
        pianoTp.should.have.property('aid', 'M3UZnikdix');
        pianoTp.should.have.property('customPageUrl', 'http://www.economist.com');
        pianoTp.should.have.property('endpoint', 'https://sandbox.tinypass.com/api/v3');
      });
    });
  });
});
