import PianoConfig from './example-config.js';
import React from 'react';
import PropTypes from 'prop-types';
import ReactInstrumentationPiano from './index.js';
/* eslint-disable id-match */
import { setupI13n } from 'react-i13n';
// Simulation of a basic App.
class DemoApp extends React.Component {

  static get propTypes() {
    return {
      /* eslint-disable id-match */
      i13n: PropTypes.object,
    };
  }

  shouldComponentUpdate() {
    return false;
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
