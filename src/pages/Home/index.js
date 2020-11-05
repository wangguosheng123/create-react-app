import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";

import { Banner } from "../../components/Banner";
import "./home.less";
import { Foot } from "../../components/Foot";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      rexiaoList: [],
      txuList: []
    };
    this.countFun = this.countFun.bind(this);
    this.timeId = null;
  }

  componentDidMount() {
    if (this.timeId) {
      clearTimeout(this.timeId);
    }
    this.countFun();
    axios.get("/rexiao.json").then(({ data }) => {
      //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处
      this.setState({
        rexiaoList: data.list
      });
    });
    axios.get("/txu.json").then(({ data }) => {
      //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处
      this.setState({
        txuList: data.list
      });
    });
  }

  countFun() {
    let end = Date.parse(new Date("2020-01-24"));
    let now = Date.parse(new Date());
    let msec = end - now;

    let day = parseInt(msec / 1000 / 60 / 60 / 24);
    let hr = parseInt((msec / 1000 / 60 / 60) % 24);
    let min = parseInt((msec / 1000 / 60) % 60);
    let sec = parseInt((msec / 1000) % 60);
    this.setState({
      day: day,
      hour: hr > 9 ? hr : "0" + hr,
      minuter: min > 9 ? min : "0" + min,
      second: sec > 9 ? sec : "0" + sec
    });
    this.timeId = setTimeout(() => {
      this.countFun();
    }, 1000 * 60);
  }
  componentWillUnmount() {
    clearTimeout(this.timeId);
  }

  render() {
    let { rexiaoList, txuList } = this.state;
    let domList = [];
    let glist = [];
    rexiaoList.map(goods => {
      return (
        domList.push(
          <li key={goods.goodsID}>
            <Link to={`/detail/${goods.goodsID}`}>
              <div className="img-box">
                <img src={goods.src} alt="" />
              </div>
              <div className="content">
                <p className="p1">{goods.goodsname}</p>
                <p className="p2">价格¥：{goods.price}元</p>
                <p className="p3">活动价¥：{goods.newprice}元</p>
              </div>
            </Link>
          </li>
        )
      );
    });

    txuList.map(goods => {
      return (
        glist.push(
          <li key={goods.goodsID}>
            <Link to={`/detail/${goods.goodsID}`}>
              <div className="img-box">
                <img src={goods.src} alt="" />
              </div>
            </Link>
          </li>
        )
      )
    });

    return (
      <div>
        <Banner />
        <dl id="miaosha">
          <dt>
            <img src={require("../../img/djs.png")} alt="" />
            每日秒杀
          </dt>
          <dd>秒杀商品每个id限购一件</dd>
          <dd>
            秒杀即将开始，距离开始还有
            <span id="showtime">
              {this.state.day}天{this.state.hour}小时{this.state.minuter}分
              {/* {this.state.second}秒 */}
            </span>
          </dd>
        </dl>
        <ul className="rexiao-list clr">{domList}</ul>
        <div className="txu">T恤上新</div>
        <ul className="txu-list clr">{glist}</ul>
        <Foot/>
      </div>
    );
  }
}
