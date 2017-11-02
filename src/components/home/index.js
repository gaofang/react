import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Home from './Home';

ReactDOM.render(
  <AppContainer>
    <Home />
  </AppContainer>,
  document.getElementById('approot')
);

// window.flexibility(document.documentElement);

if (module.hot) {
  module.hot.accept(['./Home'], () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextComponents = require('./Home').default; //eslint-disable-line
    ReactDOM.render(
      <AppContainer>
        <NextComponents />
      </AppContainer>,
      document.getElementById('approot')
    );
  });
}