import React from 'react';
import ReactInstrumentationPiano from './index.js';
import PianoConfig from './example-config.js';
/* eslint-disable id-match */
import { setupI13n } from 'react-i13n';
// Simulation of a basic App.
class DemoApp extends React.Component {

  static get propTypes() {
    return {
      /* eslint-disable id-match */
      i13n: React.PropTypes.object,
    };
  }

  render() {
    return (
      <p>
        This plugin does not provide any visual output.
      </p>
    );
  }
}

const TrackedApp = setupI13n(DemoApp, {
  rootModelData: {
    product: 'The World If',
  },
  isViewportEnabled: true,
}, [ new ReactInstrumentationPiano(PianoConfig) ]);
export default(<TrackedApp />);
