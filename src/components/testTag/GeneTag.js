/**
 * Created by work on 17/11/1.
 */
import styles from './GeneTag.css';
class GeneTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: ''
    };
  }
  addZ = (num) => {
    let newN = 0;
    if (typeof num === 'number' || typeof num === 'string') {
      newN = num.toString().length <= 1 ? `0${num.toString()}` : num.toString();
    }
    return newN;
  };
  handleGene = () => {
    const now = new Date();
    const tag = `v0.1.0-build${now.getFullYear()}${this.addZ(now.getMonth() + 1)}` +
      `${this.addZ(now.getDate())}${this.addZ(now.getHours())}${this.addZ(now.getMinutes())}`;
    this.setState({tag}, () => {
      this.refs.tagP.select();
      try {
        document.execCommand('copy');
        // this.setState({toastOpen: true, toastMsg: '已成功复制订单编号到剪贴板!'});
        console.log('已成功复制!');
      } catch (err) {
        console.log('未能复制成功,请手动复制!');
        // this.setState({toastOpen: true, toastMsg: '未能复制成功,请手动复制!'});
      }
    });
    // window.clipboardData.setData('Text', tag);
  };
  render() {
    return (
      <div className={styles.container} ref="other">
        <button className={styles.btn} onClick={this.handleGene}>Gene Tag</button>
        <input
          ref='tagP'
          className={styles.tag}
          value={this.state.tag}
          readOnly="readOnly"
        />
      </div>
    );
  }
}
export default GeneTag;