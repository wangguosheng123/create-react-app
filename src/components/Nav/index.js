import { NavLink } from "react-router-dom";
import React from "react";
import { Layout, Menu } from "antd";

import "./nav.less";
const { Header } = Layout;

export class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navs: [
        { text: "首页", path: "/home" },
        { text: "衬衣", path: "/goods" },
        { text: "卫衣", path: "/goods" },
        { text: "羽绒服", path: "/goods" },
        { text: "外套", path: "/goods" },
        { text: "针织衫", path: "/goods" },
        { text: "裤装", path: "/goods" },
        { text: "鞋", path: "/goods" },
        { text: "家具配饰", path: "/goods" },
        { text: "内衣袜品", path: "/goods" }
      ],
      username: null
    };
    this.tuchudenglv = this.tuchudenglv.bind(this);
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    this.setState({
      username: token
    });
  }

  tuchudenglv() {
    localStorage.removeItem("token"); //删除指定的本地存储值
    alert("退出登录成功，即将回到主页");
    this.setState({
      username: null
    });
  }
  render() {
    let { username } = this.state;

    let domdenglv =
      username == null ? (
        <a href="/login">登录</a>
      ) : (
        <span onClick={this.tuchudenglv}>{username}退出登录</span>
      );

    let domlist = this.state.navs.map((list, i) => {
      return (
        <Menu.Item className="nav" key={i}>
          <NavLink to={list.path}>{list.text}</NavLink>
        </Menu.Item>
      );
    });

    return (
      <div>
        <ul className="top">
          <li>
            <a href="/shopcar">购物车</a>
          </li>
          <li>
            <a href="/zhuce">注册</a>
          </li>
          <li>
            <a href="/home">欢迎您</a>
          </li>
          <li>{domdenglv}</li>
        </ul>

        <Layout className="layout">
          <Header>
            <div className="logo">
              <img
                src="http://i4.vanclimg.com/cms/20160923/logo18546.png"
                alt=""
              ></img>
            </div>
            <Menu
              // theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["0"]}
              style={{ lineHeight: "64px" }}
            >
              {domlist}
            </Menu>
          </Header>
        </Layout>
      </div>
    );
  }
}
