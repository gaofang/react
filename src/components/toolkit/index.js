import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Add from './Add/Add';

const html = document.documentElement;
const width = html.clientWidth;
if (width > 414) {
  html.style.fontSize = '55px';
} else {
  html.style.fontSize = `${width / 7.5}px`;
}

ReactDOM.render(
  <AppContainer>
    <Add />
  </AppContainer>,
  document.getElementById('approot')
);

// window.flexibility(document.documentElement);

if (module.hot) {
  module.hot.accept(['./Add/Add'], () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextComponents = require('./Add/Add').default; //eslint-disable-line
    ReactDOM.render(
      <AppContainer>
        <NextComponents />
      </AppContainer>,
      document.getElementById('approot')
    );
  });
}