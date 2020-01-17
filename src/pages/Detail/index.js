import axios from "axios";
import React from "react";
import { Button } from "antd";

import "./detail.less";

import { Foot } from "../../components/Foot";
import { from } from "rxjs";

export class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goods: null
    };
  }

  componentDidMount() {
    /////这是地址栏传过来的
    let goodsid = this.props.match.params.goodsid;
    console.log(goodsid);
    axios.get("/liebiao.json").then(({ data }) => {
      for (var i = 0; i < data.list.length; i++) {
        let goodsID = data.list[i].goodsID;
        if (goodsid == goodsID) {
          console.log(data.list[i]);
          return this.setState({
            goods: data.list[i]
          });
        }
      }
    });
  }

  jiarucar(goodid) {
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
        console.log(list);
        if (!flag && goods1 != null) {
          list.push(goods1);
        }
        localStorage.setItem(userid, JSON.stringify(list));
        if (window.confirm("加入成功 是否进入购物车结算")) {
          window.location.href = "/shopCar";
        }
      } else {
        alert("您目前还没有登录，即将前往登录页面");
        window.location.href = "/login";
      }
    });
  }
  lijimai(goodid) {
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
        console.log(list);
        if (!flag && goods1 != null) {
          list.push(goods1);
        }
        localStorage.setItem(userid, JSON.stringify(list));
        alert("加入成功 即将进入购物车结算页面");
        window.location.href = "/shopCar";
      } else {
        alert("您目前还没有登录，即将前往登录页面");
        window.location.href = "/login";
      }
    });
  }

  render() {
    let { goods } = this.state;
    let domlist =
      goods == null ? (
        <h1>玩命加载中</h1>
      ) : (
        <div>
          <dl id="fdtou">
            <dt>商品图片详情</dt>
            <dd>商品购买指南</dd>
          </dl>
          <div id="fdsheng">
            <div id="fd">
              <div id="wrap">
                <div id="content">
                  <img src={goods.src} id="smallImg" />
                </div>

                <div id="fdzhinan">
                  <ul>
                    <li>商品名称：{goods.goodsname}</li>
                    <li>原价¥：{goods.price}元</li>
                    <li>特惠价¥:{goods.newprice}元</li>
                    <li>好评：99%</li>
                    <li>
                      数量：
                      <select>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                        <option value="">6</option>
                        <option value="">7</option>
                        <option value="">8</option>
                        <option value="">9</option>
                        <option value="">10</option>
                      </select>
                    </li>
                    <li id="chicun">
                      尺寸： S<input type="radio" name="rc" />
                      M<input type="radio" name="rc" />
                      L<input type="radio" name="rc" />
                      XL
                      <input type="radio" name="rc" />
                      XXL
                      <input type="radio" name="rc" />
                    </li>
                    <li>
                      <Button
                        id="mai"
                        onClick={this.lijimai.bind(this, goods.goodsID)}
                        type="primary"
                      >
                        立即购买
                      </Button>
                      <Button
                        id="che"
                        onClick={this.jiarucar.bind(this, goods.goodsID)}
                        type="primary"
                      >
                        加入购物车
                      </Button>
                    </li>
                    <li>
                      <p id="wenxing">温馨提示</p>
                      全场购物满199元免运费
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    return (
      <div>
        {domlist}
        <Foot></Foot>
      </div>
    );
  }
}
