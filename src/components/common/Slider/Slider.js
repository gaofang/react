import styles from './Slider.css';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowLocal: 1,
      direction: false,
      move: false,
      slideImgs: this.props.imgs
    };
    this.timeOut = null;
    this.touchStart = 0;
    this.touchEnd = 0;
    this.cloneImgs = this.props.imgs.concat();
    this.point = 0;
  }

  componentDidMount() {
    this.goPlay();
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }

  turn(n) {
    clearTimeout(this.timeOut);
    const slideImgs = this.state.slideImgs.concat();
    let direction;
    if (n === 1) {
      const moveImg = slideImgs.shift();
      slideImgs.push(moveImg);
      direction = true;
    } else {
      const moveImg = slideImgs.pop();
      slideImgs.unshift(moveImg);
      direction = false;
    }
    this.cloneImgs.forEach((item, index) => {
      if (item === slideImgs[1]) {
        this.setState({
          slideImgs,
          direction,
          move: true,
          nowLocal: index
        }, () => {
          this.timeOut = setTimeout(() => {
            this.setState({move: false});
          }, 500);
        });
      }
    });
  }

  turnTo = (n) => {
    let nowItem;
    const slideImgs = this.state.slideImgs.concat();
    this.cloneImgs.forEach((item, index) => {
      if (index === n) {
        nowItem = item;
        if (n > this.state.nowLocal) {
          while (1) {
            const moveImg = slideImgs.shift();
            slideImgs.push(moveImg);
            if (slideImgs[1] === nowItem) {
              break;
            }
          }
        } else {
          while (1) {
            const moveImg = slideImgs.pop();
            slideImgs.unshift(moveImg);
            if (slideImgs[1] === nowItem) {
              break;
            }
          }
        }
        this.setState({
          nowLocal: n,
          slideImgs
        });
      }
    });
  };

  handleTouchStart = (e) => {
    clearInterval(this.autoPlayFlag);
    this.touchStart = e.changedTouches[0].pageX;
  };
  handleTouchEnd = (e) => {
    this.touchEnd = e.changedTouches[0].pageX;
    const moveDis = this.touchEnd - this.touchStart;
    if (moveDis >= 50) {
      this.turn(0);
    } else if (moveDis <= -50) {
      this.turn(1);
    }
    this.autoPlayFlag = setInterval(() => {
      this.turn(1);
    }, this.props.delay * 1000);
  };
  // 开始自动轮播
  goPlay() {
    clearInterval(this.autoPlayFlag);
    if (this.props.autoplay) {
      this.autoPlayFlag = setInterval(() => {
        this.turn(1);
      }, this.props.delay * 1000);
    }
  }

  render() {
    let imgBoxMove;
    if (this.state.direction) {
      imgBoxMove = this.state.move ? styles['img-box'] : styles['img-box1'];
    } else {
      imgBoxMove = this.state.move ? styles['img-box-l'] : styles['img-box1-l'];
    }
    return (
      <div
        className={styles.wrap}
        onMouseOver={this.props.pause ? () => {
          clearInterval(this.autoPlayFlag);
        } : null}
        onMouseOut={this.props.pause ? () => {
          if (this.props.autoplay) {
            this.autoPlayFlag = setInterval(() => {
              this.turn(1);
            }, this.props.delay * 1000);
          }
        } : null}
      >
        {
          this.props.arrows ?
            <div className={styles.arrowsWrap}>
              <span
                onClick={() => {
                  this.turn(-1);
                }}
              >
              </span>
              <span
                onClick={() => {
                  this.turn(1);
                }}
              >
              </span>
            </div>
            :
            null
        }
        {
          this.props.dot ?
            <div className={styles.dotWrap}>
              {
                this.props.imgs.map((items, index) => {
                  return (
                    <span
                      onClick={this.props.dotBtn ? () => {
                        this.turnTo(index);
                      } : null}
                      className={this.state.nowLocal === index ? styles.nowDot : styles.dot}
                    >
                    </span>
                  );
                })
              }
            </div>
            :
            null
        }
        <div
          className={imgBoxMove}
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
        >
          {
            this.state.slideImgs.map((item) => {
              return (
                <div
                  style={{
                    width: `${1 / this.props.imgs.length * 100}%`,
                    float: 'left',
                    fontSize: 0
                  }}
                >
                  <img
                    src={item.imgUrl}
                    alt=""
                    style={{
                      width: '100%'
                    }}
                  />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  imgs: React.PropTypes.array.isRequired,
  autoplay: React.PropTypes.bool,
  delay: React.PropTypes.number.isRequired,
  pause: React.PropTypes.bool,
  arrows: React.PropTypes.bool,
  dot: React.PropTypes.bool,
  dotBtn: React.PropTypes.bool
};

export default Slider; //eslint-disable-line