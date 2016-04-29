/* global window: false */
import promisescript from 'promisescript';
export default class ReactInstrumentationPiano {

  constructor(config) {
    this.config = {
      externalScript: '//sandbox.tinypass.com/api/tinypass.min.js',
      ...config,
    };
  }

  get name() {
    return 'react-i13n-piano';
  }

  get eventHandlers() {
    return {
      pageview: this.pageview.bind(this),
    };
  }

  ensureScriptHasLoaded() {
    if (!this.script) {
      const pPiano = typeof this.config.loadExternalScript === 'function' ?
        this.config.loadExternalScript() :
        promisescript({
          url: `https:${ this.config.externalScript }`,
          type: 'script',
          exposed: 'tp',
        });
      this.script = pPiano.then(() => {
        if (typeof window !== 'undefined' && typeof window.tp !== 'undefined') {
          if (this.config.endpoint) {
            window.tp.push([ 'setEndpoint', this.config.endpoint ]);
          }
          if (this.config.aid) {
            window.tp.push([ 'setAid', this.config.aid ]);
          }
          if (this.config.debug) {
            window.tp.push([ 'setDebug', this.config.debug ]);
          }
          if (this.config.sandbox) {
            window.tp.push([ 'setSandbox', this.config.sandbox ]);
          }
          if (this.config.useTinypassAccounts) {
            window.tp.push([ 'setUseTinypassAccounts', this.config.useTinypassAccounts ]);
          }

          return new Promise((resolve, reject) => {
            window.tp.push([
              'init', () => {
                try {
                  if (this.config.initCallback) {
                    this.config.initCallback();
                  }
                } catch (initError) {
                  reject(initError);
                }
                resolve();
              },
            ]);
          });
        }
        throw new Error('window.tp does not exist');
      })
      .catch((event) => {
        /* eslint-disable no-console */
        console.error('An error loading or executing Piano has occured: ', event.message);
        /* eslint-enable no-console */
        throw event;
      });
    }
    return this.script;
  }

  generatePayload(payload, eventName) {
    const eventHandler = this.config.eventHandlers[eventName];
    let props = {};
    if (payload && payload.i13nNode && payload.i13nNode.getMergedModel) {
      props = Object.assign(payload, payload.i13nNode.getMergedModel());
    }
    if (eventHandler) {
      return eventHandler(props);
    }
    return props;
  }

  /* eslint-disable no-unused-vars */
  pageview(payload) {
    return this.ensureScriptHasLoaded().then(() => (
      this.updateTinypass(this.generatePayload(payload, 'pageview'))
    ));
  }
  /* eslint-enable no-unused-vars */

  updateTinypass() {
    /* eslint-disable id-match, camelcase */
    return window.tp.experience.execute();
    /* eslint-enable id-match, camelcase */
  }
}
