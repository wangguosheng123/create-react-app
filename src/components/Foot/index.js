import React from "react";

import "./foot.less";

export class Foot extends React.Component {
  constructor(porps) {
    super(porps);

    this.state = {
      // img1: require("../../img/kefu1.png"),
      // img2: require("../../img/kefu2.png"),
      // img3: require("../../img/APP.png"),
      img4: require("../../img/1.png"),
      img5: require("../../img/2.jpg"),
      img6: require("../../img/3.png"),
      img7: require("../../img/4.jpg"),
      img8: require("../../img/5.jpg"),
      img9: require("../../img/app1.png"),
      img10: require("../../img/app2.png"),
      img11: require("../../img/app3.png")
    };
  }

  render() {
    let {
      // img1,
      // img2,
      // img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10,
      img11
    } = this.state;
    return (
      <div>
        <div id="guanyu">
          <ul id="kefu">
            <li>
              <a >
                <span id="kefu1">
                  <i className="iconfont">&#xe7bb;</i>
                </span>
              </a>
              <a >
                <p id="p1">7*9小时在线客服</p>
              </a>
            </li>
            <li>
              <a >
                <span id="kefu2">
                  <i className="iconfont">&#xe67d;</i>
                </span>
              </a>
              <a >
                <p>7天内退货</p>
              </a>
              <a >
                <p>购物满199元免运费</p>
              </a>
            </li>
            <li>
              <a >
                <span id="kefu3">
                  <i className="iconfont">&#xe652;</i>
                </span>
              </a>
              <a >
                <p>下载凡客客户端</p>
              </a>
            </li>
          </ul>
          <ul id="guanYuFanKe">
            <li>
              <a >关于凡客</a>
            </li>
            <li>
              <a >新手指南</a>
            </li>
            <li>
              <a >配送范围及时间</a>
            </li>
            <li>
              <a >支付方式</a>
            </li>
            <li>
              <a >售后服务</a>
            </li>
            <li>
              <a >帮助中心</a>
            </li>
          </ul>
        </div>

        <div id="bottom">
          <p>
            Copyright 2007 - 2018 vancl.com All Rights Reserved 京ICP证100557号
            京公网安备11011502002400号 出版物经营许可证新出发京批字第直110138号
            凡客诚品（北京）科技有限公司
          </p>
          <ul id="chengxing">
            <li>
              <a >
                <img src={img4} alt="" />
              </a>
            </li>
            <li>
              <a >
                <img src={img5} alt="" />
              </a>
            </li>
            <li>
              <a>
                <img src={img6} alt="" />
              </a>
            </li>
            <li>
              <a >
                <img src={img7} alt="" />
              </a>
            </li>
            <li>
              <a >
                <img src={img8} alt="" />
              </a>
            </li>
          </ul>
        </div>

        <ul id="ding">
          <li>
            <a >
              <img src={img9} alt="" />
            </a>
            <p>下载APP</p>
          </li>
          <li>
            <a >
              <img src={img10} alt="" />
            </a>
            <p>在线客服</p>
          </li>
          <li>
            <a>
              <img src={img11} alt="" />
            </a>
            <p>回顶部</p>
          </li>
        </ul>
      </div>
    );
  }
}
