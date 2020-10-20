import React,{Component} from 'react';
import style from './index.scss';

export default class Index extends Component {
  render(){
    return(
      <div className={style.logbox}> 
        <div className={style.header}>有朋自远方来，不亦乐乎</div>
        {this.props.children}
        <div className={style.footer}>
          coffeeHouse
        </div>
      </div>
    )
  }
}