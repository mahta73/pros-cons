import React, { Component, Fragment} from 'react';

import ShouldI from './shouldI/shouldI';

import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <ShouldI />
      </Fragment>
    );
  }
}

export default App;
