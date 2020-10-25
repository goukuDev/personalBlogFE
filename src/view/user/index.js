import React,{Component} from 'react';
import style from './index.scss';

export default class Index extends Component {
  state = {
    year:null,
  }
  componentDidMount(){
    this.setState({
      year:(new Date).getFullYear()
    })
  }
  render(){
    return(
      <div className={style.logbox}> 
        <div className={style.box}>
          <div className={style.header}>有朋自远方来，不亦乐乎</div>
            {this.props.children}
          <div className={style.footer}></div>
        </div>
      </div>
    )
  }
}