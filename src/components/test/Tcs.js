/**
 * Created by work on 17/3/10.
 */
import styles from './Tcs.css';
class Tcs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
      failed: false
    };
    this.snake = [];
    this.apple = [25, 25];
    this.interval = null;
    this.dir = [1, 0];
    this.colorList = ['#009966', '#0099FF', '#CC3366', '#FF6666', '#FF9933'];
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // randomColor = (cList) => {
  //   const randomNum = Math.floor(Math.random() * cList.length);
  //   return this.colorList[randomNum];
  // };

  cube = ({x, y, c}) => {
    return (
      <div
        className={styles.cube}
        style={{
          top: `${40 * y}px`,
          left: `${40 * x}px`,
          width: '40px',
          height: '40px',
          backgroundColor: c
        }}
      >
      </div>
    );
  };
  random = (color) => {
    const x = Math.floor(Math.random() * 29);
    const y = Math.floor(Math.random() * 14);
    const c = color || '#FF6666';
    return {x, y, c};
  };
  preduce = () => {
    const newCube = this.random();
    if (this.snake.some(item => item.x === newCube.x && item.y === newCube.y)) {
      this.preduce();
    }
    return newCube;
  };
  run = () => {
    clearInterval(this.interval);
    this.snake = [];
    const first = this.random('#FFCC00');
    this.snake.push(first);
    this.apple = this.preduce();
    this.interval = setInterval(() => {
      let snake = [];
      snake = this.snake.concat();
      if (snake[snake.length - 1].x === this.apple.x && snake[snake.length - 1].y === this.apple.y) {
        snake = this.move(snake, this.dir, false);
        this.apple = this.preduce();
      } else {
        snake = this.move(snake, this.dir, true);
      }
      const temp = snake.concat();
      temp.splice(temp.length - 1, 1);
      if (temp.some(item => item.x === snake[snake.length - 1].x && item.y === snake[snake.length - 1].y)) {
        clearInterval(this.interval);
        this.refs.audio.src = '../../../assets/failed.mp3';
        this.refs.audio.loop = false;
        this.refs.audio.play();
        this.setState({failed: true});
        return;
      }
      this.snake = snake;
      const newSnake = snake.concat();
      newSnake.push(this.apple);
      this.setState({all: newSnake});
    }, 120);
  };
  move = (list, dir, pass) => {
    const newList = list;
    const lastCube = list[list.length - 1];
    let x = lastCube.x + dir[0];
    let y = lastCube.y + dir[1];
    if (x < 0) {
      x = 29;
    } else if (x > 29) {
      x = 0;
    }
    if (y < 0) {
      y = 19;
    } else if (y > 14) {
      y = 0;
    }
    newList.push({x, y, c: lastCube.c});
    if (pass) {
      newList.shift();
    }
    return newList;
  };
  change = (e) => {
    if (e.keyCode === 37) {
      if (this.dir[0] !== 1) {
        this.dir = [-1, 0]; // left
        console.log('left');
      }
    } else if (e.keyCode === 38) {
      if (this.dir[1] !== 1) {
        this.dir = [0, -1]; // up
        console.log('up');
      }
    } else if (e.keyCode === 39) {
      if (this.dir[0] !== -1) {
        this.dir = [1, 0]; // right
        console.log('right');
      }
    } else if (e.keyCode === 40) {
      if (this.dir[1] !== -1) {
        this.dir = [0, 1]; // down
        console.log('down');
      }
    }
  };
  render() {
    return (
      <div className={styles.container}>
        <p className={styles.title}>tcs</p>
        <div className={styles.box} >
          {
            this.state.all.map(item => this.cube(item))
          }
        </div>
        <input ref="input" type="text" onKeyDown={(e) => this.change(e)}/>
        <div className={styles.btn}>
          <p>
            socre:
            {this.state.all.length === 0 ? 0 : this.state.all.length - 1}
          </p>
          <span
            onClick={() => {
              this.setState({failed: false});
              this.run();
              this.refs.input.focus();
              this.refs.audio.src = '../../../assets/bgm.mp3';
              this.refs.audio.loop = true;
              this.refs.audio.play();
            }}
          >
            start
          </span>
        </div>
        <audio ref="audio" src="../../../assets/bgm.mp3" loop>
        </audio>
        <div className={styles.fail} style={{display: this.state.failed ? 'block' : 'none'}}>
          Game Over!
        </div>
      </div>
    );
  }
}
export default Tcs;