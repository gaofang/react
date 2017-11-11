import styles from './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <button
          className={styles.btn}
          onClick={() => window.location.assign('test-snake.html')}
        >Play a Game
        </button>
        <button
          className={styles.btn}
          onClick={() => window.location.assign('resume.html')}
        >Look my Resume
        </button>
        <button
          className={styles.btn}
          onClick={() => window.location.assign('https://github.com/gaofang')}
        >Back to my Github
        </button>
      </div>
    );
  }
}
export default Home;