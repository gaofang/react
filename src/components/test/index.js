/**
 * Created by work on 17/3/1.
 */
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Tcs from './Tcs';
import TcsM from './TcsM';
const isM = window.navigator.userAgent.match(/(iPhone|iPod|ios|iPad|Android|WindowsPhone|PlayBook|MeeGo)/i);
const gameRoom = isM ? <TcsM /> : <Tcs />;
const gameRoomS = isM ? './TcsM' : './Tcs';

ReactDOM.render(
  <AppContainer>
    {gameRoom}
  </AppContainer>,
  document.getElementById('approot')
);

// window.flexibility(document.documentElement);

if (module.hot) {
  module.hot.accept([gameRoomS], () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextComponents = require(gameRoomS).default; //eslint-disable-line
    ReactDOM.render(
      <AppContainer>
        <NextComponents />
      </AppContainer>,
      document.getElementById('approot')
    );
  });
}