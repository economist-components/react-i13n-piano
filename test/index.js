/* eslint-disable id-match, id-length, no-undef, camelcase */
import PianoConfig from '../src/example-config.js';
import ReactI13nPiano from '../src/index';
import chai from 'chai';
import spies from 'chai-spies';
chai.use(spies).should();
mocha.setup({ globals: [ 'tp', 'init', 'jQuery*', 'setAdblockerCookie', 'script' ] });
describe('PianoPlugin is a i13n plugin for Piano', () => {
  describe('ensureScriptHasLoaded', () => {
    it('calls loadExternalScript if it was passed', () => {
      window.tp = [];
      const loadExternalScript = chai.spy(() => Promise.resolve());
      const plugin = new ReactI13nPiano({ ...PianoConfig, loadExternalScript });
      plugin.ensureScriptHasLoaded();
      loadExternalScript.should.have.been.called.exactly(1);
    });
  });
  describe('piano plugin', () => {
    it.skip('window.tp.experience.execute() is called with specific properties',
    /* eslint-disable prefer-arrow-callback, no-invalid-this */
    function () {
      this.timeout(5000);
      const TrackedApp = new ReactI13nPiano(PianoConfig);
      TrackedApp.updateTinypass = chai.spy(() => Promise.resolve());
      return TrackedApp.pageview().then(() => {
        TrackedApp.updateTinypass.should.have.been.called.exactly(1);
        const pianoTp = window.tp;
        pianoTp.should.have.property('aid', 'M3UZnikdix');
        pianoTp.should.have.property('customPageUrl', 'http://www.economist.com');
        pianoTp.should.have.property('endpoint', 'https://sandbox.tinypass.com/api/v3');
      });
    });
    /* eslint-enable prefer-arrow-callback, no-invalid-this */
  });
  describe('customEvent', () => {
    it('it calls ensureScriptHasLoaded and updateTinypass', (done) => {
      window.tp = {
        setCustomVariable: () => null,
        setPageURL: () => null,
        push: () => null,
      };
      const plugin = new ReactI13nPiano({ ...PianoConfig });
      plugin.ensureScriptHasLoaded = chai.spy(() => Promise.resolve());
      const payload = {
        example: 'test',
      };
      plugin.updateTinypass = chai.spy();
      plugin.generatePayload = chai.spy();
      plugin.customEvent(payload, 'pageview').then(() => {
        plugin.ensureScriptHasLoaded.should.have.been.called.exactly(1);
        plugin.updateTinypass.should.have.been.called.exactly(1);
        plugin.generatePayload.should.have.been.called.exactly(1);
        plugin.generatePayload.should.have.been.called.with(payload, 'pageview');
        done();
      })
      .catch((error) => {
        done(error);
      });
    });
  });
  describe('pageview', () => {
    it('calls customEvent', () => {
      window.tp = [];
      const plugin = new ReactI13nPiano({ ...PianoConfig });
      plugin.customEvent = chai.spy();
      plugin.pageview({
        example: 'test',
      });
      plugin.customEvent.should.have.been.called.exactly(1);
    });
  });
  describe('userinformationchange', () => {
    it('calls customEvent with an additional parameter', () => {
      window.tp = [];
      const plugin = new ReactI13nPiano({ ...PianoConfig });
      plugin.customEvent = chai.spy();
      const payload = {
        example: 'test',
      };
      plugin.userinformationchange(payload);
      plugin.customEvent.should.have.been.called.exactly(1);
      plugin.customEvent.should.have.been.called.with(payload, 'userinformationchange');
    });
  });
});
