/**
 * Created by work on 17/10/26.
 */
import styles from './Add.css';
class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  // handleMove = (e) => {
  //   e.t
  // };
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.box} onClick={() => console.log(document.documentElement.clientWidth)}>
          <span>12.5</span>
          <span>12.5</span>
          <span>12.5</span>
        </div>
        <input type="number" className={styles.ipt}/>
      </div>
    );
  }
}
export default Add;