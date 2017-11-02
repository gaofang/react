/**
 * Created by work on 17/3/10.
 */
import styles from './Tcs.css';
import pause from './img/pause.png';
import goon from './img/restore.png';
class Tcs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
      status: 0   // 0 未开始  1 游戏进行 2 游戏暂停 3 游戏结束
    };
    this.snake = [];
    this.apple = [25, 25];
    this.interval = null;
    this.dir = [1, 0];
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  cube = ({x, y, c}) => {
    return (
      <div
        className={styles.cube}
        style={{
          top: `${25 * y}px`,
          left: `${25 * x}px`,
          width: '25px',
          height: '25px',
          backgroundColor: c
        }}
      >
      </div>
    );
  };
  random = (color) => {
    const x = Math.floor(Math.random() * 14);
    const y = Math.floor(Math.random() * 20);
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
  run = (defApple, defSnake) => {
    clearInterval(this.interval);
    this.snake = defSnake;
    this.apple = defApple;
    this.interval = setInterval(() => {
      let snake = [];
      snake = this.snake.concat();
      if (snake[snake.length - 1].x === this.apple.x && snake[snake.length - 1].y === this.apple.y) {
        snake = this.move(snake, this.dir, false);
        this.refs.eatAppleAudio.loop = false;
        this.refs.eatAppleAudio.play();
        this.apple = this.preduce();
      } else {
        snake = this.move(snake, this.dir, true);
      }
      const temp = snake.concat();
      temp.splice(temp.length - 1, 1);
      if (temp.some(item => item.x === snake[snake.length - 1].x && item.y === snake[snake.length - 1].y)) {
        clearInterval(this.interval);
        this.refs.audio.src = 'failed.mp3';
        this.refs.audio.loop = false;
        this.refs.audio.play();
        this.setState({status: 3});
        return;
      }
      this.snake = snake;
      const newSnake = snake.concat();
      newSnake.push(this.apple);
      this.setState({all: newSnake});
    }, 150);
  };
  move = (list, dir, pass) => {
    const newList = list;
    const lastCube = list[list.length - 1];
    let x = lastCube.x + dir[0];
    let y = lastCube.y + dir[1];
    if (x < 0) {
      x = 14;
    } else if (x > 14) {
      x = 0;
    }
    if (y < 0) {
      y = 20;
    } else if (y > 20) {
      y = 0;
    }
    newList.push({x, y, c: lastCube.c});
    if (pass) {
      newList.shift();
    }
    return newList;
  };
  handlePause = () => {
    if (this.state.status === 1) {
      this.setState({status: 2});
      clearInterval(this.interval);
      this.refs.audio.pause();
    } else if (this.state.status === 2) {
      this.setState({status: 1});
      this.run(this.apple, this.snake);
      // this.refs.audio.src = '../../../assets/bgm.mp3';
      // this.refs.audio.loop = true;
      this.refs.audio.play();
      this.refs.input.focus();
    }
  };
  handleReplay = () => {
    this.refs.input.focus();
    this.setState({status: 1});
    this.snake = [];
    this.snake.push(this.random('#FFCC00'));
    this.run(this.preduce(), this.snake);
    this.refs.audio.src = 'bgm.mp3';
    this.refs.audio.loop = true;
    this.refs.audio.play();
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
      <div
        className={styles.container}
      >
        <div className={styles.dashboard}>
          <div className={styles.box}>
            {
              this.state.all.map(item => this.cube(item))
            }
          </div>
          <div className={styles.btn}>
            <p>
              {this.state.all.length === 0 ? 0 : this.state.all.length - 1}
            </p>
            <img
              src={this.state.status === 2 ? goon : pause}
              alt=""
              onClick={this.handlePause}
            />
          </div>
          <audio ref="audio" src="bgm.mp3" loop>
          </audio>
          <audio ref="eatAppleAudio" src="1795.wav" loop>
          </audio>
          <div className={styles.failBox} style={{display: this.state.status === 0 ? 'block' : 'none'}}>
            <div className={styles.panel}>
              <p style={{fontSize: '36px', marginBottom: '25px'}}>React Gluttonous Snake</p>
              <button onClick={this.handleReplay}>PLAY</button>
            </div>
          </div>
          <div className={styles.failBox} style={{display: this.state.status === 2 ? 'block' : 'none'}}>
            <div className={styles.panel}>
              <p style={{color: 'yellow'}}>PAUSE</p>
              <div><span>PRESENT</span><span>{this.state.all.length === 0 ? 0 : this.state.all.length - 1}</span></div>
              <button onClick={this.handlePause}>GO ON</button>
            </div>
          </div>
          <div className={styles.failBox} style={{display: this.state.status === 3 ? 'block' : 'none'}}>
            <div className={styles.panel}>
              <p style={{color: '#ff6666'}}>GAME OVER!</p>
              <div><span>SCORE</span><span>{this.state.all.length === 0 ? 0 : this.state.all.length - 1}</span></div>
              <button onClick={this.handleReplay}>ONE MORE GAME</button>
            </div>
          </div>
        </div>
        <input ref="input" type="text" className={styles.ipt} onKeyDown={(e) => this.change(e)}/>
      </div>
    );
  }
}
export default Tcs;