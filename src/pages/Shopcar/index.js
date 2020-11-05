import axios from "axios";
import React from "react";
import { Steps, Icon } from "antd";

import { Foot } from "../../components/Foot";
import "./car.less";

const Step = Steps.Step;

export class Shopcar extends React.Component {
  constructor(props) {
    super(props);
    let userid = localStorage.getItem("token");
    let userids = localStorage.getItem(userid);
    let list = JSON.parse(userids);
    // list.map(car => { car.checked = false })
    this.state = {
      list,
      totalPrice: 0,
      totalJian: 0,
      sheng_list: [
        {
          city_id: "CH20",
          name: "湖北",
          en: ""
        }
      ],
      shiList: [
        {
          city_id: "CH2001",
          name: "武汉",
          en: ""
        }
      ],
      quList: [
        {
          city_id: "CH200106",
          name: "东西湖",
          en: "dongxihu"
        }
      ],
      newsheng_select_id: null,
      style: 0
    };
    this.quliebiao = this.quliebiao.bind(this);
    this.CheckedChange = this.CheckedChange.bind(this);
    this.shengbian = this.shengbian.bind(this);
    // this.shibian = this.shibian.bind(this);
  }
  // getList(gid){
  // 	let userid = localStorage.getItem("token")
  // 	let userids = localStorage.getItem(userid)
  // 	let  list = JSON.parse(userids)
  // 	return caozuo=list.filter(function(item){  return item.goodsID===gid})
  // }
  componentDidMount() {
    axios.get("/citylist/id/2").then(({ data }) => {
      //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处
      ////console.log(data.list)
      this.setState({
        sheng_list: data.list
      });
    });
  }
  componentDidUpdate() {
    let userid = localStorage.getItem("token");
    let userids = localStorage.getItem(userid);
    let newlist = JSON.parse(userids);
    console.log("更新了", newlist);
    if (newlist) {
      var bool = newlist.every((ele, index) => {
        if (ele.checked === 0) {
          return true;
        } else {
          return false;
        }
      });
      // console.log(bool)
      if (bool === true) {
        this.refs.quanxuan.checked = true;
      } else {
        this.refs.quanxuan.checked = false;
      }
    }
  }
  jia(index) {
    let userid = localStorage.getItem("token");
    let userids = localStorage.getItem(userid);
    let list = JSON.parse(userids);
    for (var i = 0; i < list.length; i++) {
      if (i === index) {
        if (list[i].num === 1) {
          break;
        }
        list[i].num = list[i].num - 1;
      }
    }
    console.log(list);
    localStorage.setItem(userid, JSON.stringify(list));
    this.setState({
      list
    });
    this.SumPrice();
  }

  jian(index) {
    console.log(index);
    let userid = localStorage.getItem("token");
    let userids = localStorage.getItem(userid);
    let list = JSON.parse(userids);
    for (var i = 0; i < list.length; i++) {
      if (i === index) {
        list[i].num += 1;
      }
    }
    console.log(list);
    localStorage.setItem(userid, JSON.stringify(list));
    this.setState({
      list
    });
    this.SumPrice();
  }

  removed(i) {
    console.log(i);
    let userid = localStorage.getItem("token");
    let userids = localStorage.getItem(userid);
    let list = JSON.parse(userids);
    list.splice(i, 1);
    localStorage.setItem(userid, JSON.stringify(list));
    this.setState({
      list
    });
    this.SumPrice();
  }
  // 获取单选框的值
  getCheckedChange(i, e) {
    console.log(e);
    let userid = localStorage.getItem("token");
    let userids = localStorage.getItem(userid);
    let newlist = JSON.parse(userids);
    let list = newlist.map((ele, index) => {
      if (index === i) {
        ele.checked = e.target.checked === true ? 0 : 1;
        return ele;
      } else {
        return ele;
      }
    });
    localStorage.setItem(userid, JSON.stringify(list));
    this.setState({
      list
    });
    this.SumPrice();
  }
  //点击全选和全不选
  CheckedChange(e) {
    let userid = localStorage.getItem("token");
    let userids = localStorage.getItem(userid);
    let newlist = JSON.parse(userids);
    if (e.target.checked === true) {
      let list = newlist.map((ele, index) => {
        ele.checked = 0;
        return ele;
      });
      localStorage.setItem(userid, JSON.stringify(list));
      this.setState({
        list
      });
    } else if (e.target.checked === false) {
      let list = newlist.map((ele, index) => {
        ele.checked = 1;
        return ele;
      });
      localStorage.setItem(userid, JSON.stringify(list));
      this.setState({
        list
      });
    }
    this.SumPrice();
  }

  //计算总价
  SumPrice() {
    let sum = 0;
    let jian = 0;
    let userid = localStorage.getItem("token");
    let userids = localStorage.getItem(userid);
    let list = JSON.parse(userids);
    list.forEach((ele, index) => {
      if (ele.checked === 0) {
        sum += ele.num * ele.newprice;
        jian += ele.num;
      }
    });
    this.setState({
      totalPrice: sum,
      totalJian: jian
    });
  }
  quliebiao() {
    // window.location.href = "/goods";
    this.props.history.push("/goods")
  }

  //   地点的变化
  shengbian() {
    console.log(66666);
    var newsheng_select_id = document.getElementById("sheng").value; ////得到现在下拉框里面省份的id,因为id是唯一的
    var sheng_info = this.state.sheng_list.filter(function(shengfen) {
      ///此处里面的shengfen是从sheng_list取出来的每一省份
      return shengfen.city_id === newsheng_select_id; ///因为shengfen是一个小的对象，所以点出里面的id,
    })[0]; ///因为得到的是一个集合，所以取小标0， 最后就得到了下拉框里省份的小集合
    console.log(sheng_info);
    let shi_list = sheng_info["list"]; ///此处就得到了下拉框里面省份下面城市的集合
    console.log(shi_list);
    this.setState({
      shiList: shi_list
    });
  }
  shibian = () => {
    var newshi_select_id = document.getElementById("shi").value;
    // console.log(newshi_select_id)
    var newsheng_select_id = document.getElementById("sheng").value; ////得到现在下拉框里面省份的id,因为id是唯一的
    var sheng_info = this.state.sheng_list.filter(function(shengfen) {
      ///此处里面的shengfen是从sheng_list取出来的每一省份
      return shengfen.city_id === newsheng_select_id; ///因为shengfen是一个小的对象，所以点出里面的id,
    })[0]; ///因为得到的是一个集合，所以取小标0， 最后就得到了下拉框里省份的小集合
    var shi_list = sheng_info["list"]; ///此处就得到了下拉框里面省份下面城市的集合
    // console.log(shi_list)

    var shi_info = shi_list.filter(function(chengshi) {
      return chengshi.city_id === newshi_select_id;
    })[0];
    console.log(66666);
    let qu_list = shi_info["list"];
    if (shi_info["list"]) {
      ////看有没有list，没有就是说明是直辖市
      this.setState({
        quList: qu_list
      });
    } else {
      console.log("没有");
      this.setState({
        style: 1
      });
    }
  };

  render() {
    let { list, sheng_list, shiList, quList } = this.state;
    let domcar = [];
    if (list != null) {
      domcar = list.map((car, i) => (
        <li key={i}>
          <div className="left clr">
            <input
              type="checkbox"
              checked={car.checked === 0}
              onChange={this.getCheckedChange.bind(this, i)}
              defaultValue
            />
          </div>
          <dl className="right clr">
            <dd>{car.goodsname}</dd>
            <dd>
              <img src={car.src} alt="" />
            </dd>
            <dd>¥：{car.newprice}元</dd>
            <dt className="num">
              <button onClick={this.jia.bind(this, i)}>-</button>
              <input type="text" value={car.num} />
              <button onClick={this.jian.bind(this, i)}>+</button>
            </dt>
            <dd>¥{car.newprice * car.num}元</dd>
            <dd onClick={this.removed.bind(this, i)}>删除</dd>
          </dl>
        </li>
      ));
    } else {
      domcar = (
        <p className="tishi">小主，您喜欢的宝贝还没有加入购物车,加油喔！</p>
      );
    }

    let shengdom = sheng_list.map(s => (
      <option key={s.city_id} placeholder="请选择省份" value={s.city_id}>
        {s.name}
      </option>
    ));

    let shidom = shiList.map(shi => (
      <option key={shi.city_id} value={shi.city_id} placeholder="请选择城市">
        {shi.name}
      </option>
    ));

    let qudom =
      this.state.style === 1 ? (
        <option value=""></option>
      ) : (
        quList.map(qu => (
          <option key={qu.city_id} placeholder="请选择地区">
            {qu.name}
          </option>
        ))
      );

    return (
      <div>
        <div className="mycar clr">
          <div className="left">
            <img src={require("../../img/gowu.png")} alt="" />
            我的购物车
          </div>
          <div className="jidu">
            <Steps>
              <Step
                status="finish"
                title="完成登录"
                icon={<Icon type="user" />}
              />
              <Step
                status="finish"
                title="挑选宝贝"
                icon={<Icon type="solution" />}
              />
              <Step
                status="process"
                title="付款成功"
                icon={<Icon type="loading" />}
              />
              <Step
                status="wait"
                title="包邮到家"
                icon={<Icon type="smile-o" />}
              />
            </Steps>
          </div>
        </div>
        <ul className="select-all">
          <li>
            <input
              type="checkbox"
              ref="quanxuan"
              onChange={this.CheckedChange}
              defaultValue
            />
            全选
          </li>
          <li>商品信息</li>
          <li>单价</li>
          <li>数量</li>
          <li>小计</li>
          <li>操作</li>
        </ul>
        <ul className="carmain">{domcar}</ul>
        <div className="carfoot">
          <span>合计¥:{this.state.totalPrice}元</span>
          <span>数量总结：{this.state.totalJian}件</span>
          <button onClick={this.quliebiao}>&lt;&lt;继续购物</button>
        </div>

        <div id="dizhi">
          请输入地址：
          <select id="sheng" onChange={this.shengbian}>
            {shengdom}
          </select>
          省{" "}
          <select id="shi" onChange={this.shibian}>
            {shidom}
          </select>
          市 <select id="qu">{qudom}</select>
          区 <input type="text" placeholder="请填写详细地址" />{" "}
          <span className="jiesuan">&hearts;结算&gt;&gt;</span>
        </div>
        <Foot/>
      </div>
    );
  }
}
