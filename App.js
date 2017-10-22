import React from 'react';
import { connect, Provider } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import store from './src/store';
import AppNavigator from './src/navigator';

class App extends React.Component {
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.nav })}
      />
    );
  }
}

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  nav: React.PropTypes.shape.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(App);


export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
