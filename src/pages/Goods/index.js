import axios from "axios";
import React from "react";
import { Pagination, Button, LocaleProvider } from "antd";
import zhCN from "antd/es/locale-provider/zh_CN";

import "./goods.less";

import { Link } from "react-router-dom";

import { Foot } from "../../components/Foot";

export class Goods extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goodsList: [],
      goodslength: 0,
      index: 0,
      skip: 10
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios.get("/goods.json").then(({ data }) => {
      console.log(this.state.index);
      let goodsList = data.list.slice(this.state.index, this.state.skip);
      this.setState({
        goodsList,
        goodslength: data.list.length
      });
    });
  }

  jiaru(goodid) {
    axios.get("/liebiao.json").then(({ data }) => {
      //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处
      let shu = data.list;
      //   console.log(shu)
      // 这是从json文件中找当前id的商品
      let flag = true;
      let goods1 = null;
      let list = [];
      let userid = localStorage.getItem("token");
      if (userid != null) {
        let userids = localStorage.getItem(userid);
        userids = JSON.parse(userids);
        for (var i = 0; i < shu.length; i++) {
          let item = shu[i];
          if (item.goodsID == goodid) {
            item.num = 1;
            item.checked = 1;
            goods1 = item;
          }
        }
        if (userids == null || userids.length == 0) {
          //如果没有存 则直接添加新值
          // console.log(goods1)
          list.push(goods1);
          localStorage.setItem(userid, JSON.stringify(list));
          alert("加入购物车成功");
        } else {
          //如果之前存过值 则将原来的值取出来 转换成数组
          //再加入新的值
          for (var i = 0; i < userids.length; i++) {
            let numitem = userids[i];
            if (numitem.goodsID == goodid) {
              // console.log(numitem.goodsID)
              numitem.num++;
              flag = true;
              break;
            } else {
              flag = false;
            }
          }
          list = userids;
        }
        //  console.log(list)
        if (!flag && goods1 != null) {
          list.push(goods1);
        }
        localStorage.setItem(userid, JSON.stringify(list));
        if (window.confirm("加入成功 是否进入购物车结算")) {
          window.location.href = "./shopCar";
        }
      } else {
        alert("您目前还没有登录，即将前往登录页面");
        window.location.href = "./login";
      }
    });
  }

  onChange(pageNumber) {
    this.setState({
      index: (pageNumber - 1) * 10,
      skip: pageNumber * 10
    });
    axios.get("/goods.json").then(({ data }) => {
      console.log(this.state.index);
      let goodsList = data.list.slice(this.state.index, this.state.skip);
      this.setState({
        goodsList,
        goodslength: data.list.length
      });
    });
  }

  render() {
    let { goodsList } = this.state;
    let glist = [];
    goodsList.map(goods => {
      glist.push(
        <li id="lbdianji" key={goods.goodsID}>
          <Link className="lbtu" to={`/detail/${goods.goodsID}`}>
            <img src={goods.src} />
          </Link>
          <p>商品名：{goods.goodsname}</p>
          <p>原价¥:{goods.price}元</p>
          <Button onClick={this.jiaru.bind(this, goods.goodsID)} type="dashed">
            加入购物车
          </Button>
          <div id="lbding">
            <img src={goods.src} />
            <dl>
              <dd>商品名:{goods.goodsname}</dd>
              <dd>商品编号:{goods.goodsID}</dd>
              <dt>
                <span className="shuo">现售价¥：{goods.newprice}元</span>
              </dt>
            </dl>
          </div>
        </li>
      );
    });

    return (
      <div>
        <div id="lbtou">
          <span>全部商品</span>
        </div>
        <div id="lbxu">
          {/* <input type="radio" name="paixu" value="asc" checked onClick={this.shengxu} />商品价格升序
		                 <input type="radio" name="paixu" value="desc" onClick={this.jiangxu} />商品价格降序
		                 <input type="text" id="search" value=""/><button onClick={this.sosuo} id="btn1" >搜索</button> */}
        </div>
        <div id="lbxian"></div>
        <ul id="lbshangping" className="clr">
          {glist}
        </ul>
        <div className="fenye">
          <LocaleProvider locale={zhCN}>
            <Pagination
              showQuickJumper
              defaultCurrent={1}
              total={25}
              onChange={this.onChange}
            />
          </LocaleProvider>
        </div>
        <Foot></Foot>
      </div>
    );
  }
}
