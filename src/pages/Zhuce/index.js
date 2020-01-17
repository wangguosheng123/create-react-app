import { Form, Input, Checkbox, Button, AutoComplete } from "antd";
import React from "react";

import { Foot } from "../../components/Foot";
import "./zhuce.less";

const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        let user = {
          name: values.name,
          pwd: values.password
        };
        let list = [];
        let users = localStorage.getItem("users");
        let flag = false;

        //判断之前有没有存过数据
        if (users == null) {
          //如果没有存 则直接添加新值
          list.push(user);
          localStorage.setItem("users", JSON.stringify(list));
          alert("恭喜您，注册成功，即将前往登录页面");
          window.location.href = "/login";
        } else {
          //如果之前存过值 则将原来的值取出来 转换成数组
          users = JSON.parse(users);
          //再加入新的值
          for (var i = 0; i < users.length; i++) {
            let name = users[i].name;
            if (name == values.name) {
              flag = true;
              alert("您已经注册过了，即将前往登录页面");
              window.location.href = "/login";
              return;
            } else {
              flag = false;
            }
          }
          if (flag == false) {
            users.push(user);
            //再把加了新值的数组重新丢回到本地存储内
            list = users;
            localStorage.setItem("users", JSON.stringify(list));
            alert("恭喜您，注册成功，即将前往登录页");
            window.location.href = "/login";
          }
        }
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("两次密码不一致，请检查!");
    } else {
      callback();
    }
  };
  checkAccount(rule, value, callback) {
    let re = /[0-9A-Za-z]{4,10}$/gi;
    if (re.test(value)) {
      callback();
    } else {
      callback("请输入4-10有数字，字母组成的密码");
    }
  }

  yonghuming(rule, value, callback) {
    let yh = /^[A-Za-z_$][A-Za-z0-9_$]{3,11}$/gi;

    if (yh.test(value)) {
      callback();
    } else {
      callback("请输入由数字字母_$组成长度4到12位不能以数字开头用户名");
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 }
      },
      wrapperCol: {
        sm: { span: 10 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        sm: {
          span: 16,
          offset: 4
        }
      }
    };

    autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <div>
        <ul id="main">
          <li>
            <img
              id="img1"
              src="http://i1.vanclimg.com/cms/20160902/login120412_newlogo.jpg"
              alt=""
            />
          </li>
          <li id="zhuce">
            <Form onSubmit={this.handleSubmit}>
              <Form.Item {...formItemLayout} label="用户名：">
                {getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "请输入用户名!" },
                    {
                      validator: this.yonghuming
                    }
                  ]
                })(
                  <Input placeholder="请输入由数字字母_$组成长度4到12位不能以数字开头用户名" />
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label="密码：">
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "请输入密码!"
                    },
                    {
                      validator: this.validateToNextPassword
                    },
                    {
                      validator: this.checkAccount
                    }
                  ]
                })(
                  <Input
                    type="password"
                    placeholder="请输入4-10位有数字字母的密码"
                  />
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label="确认密码：">
                {getFieldDecorator("confirm", {
                  rules: [
                    {
                      required: true,
                      message: "请确认密码!"
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(
                  <Input
                    type="password"
                    onBlur={this.handleConfirmBlur}
                    placeholder="请确认密码"
                  />
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator("agreement", {
                  valuePropName: "checked"
                })(
                  <Checkbox>
                    我已经阅读
                    <a href="javascript:;" style={{ marginRight: 120 }}>
                      协议
                    </a>
                  </Checkbox>
                )}
                已注册，去<a href="login">登录</a>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  注册
                </Button>
              </Form.Item>
            </Form>
          </li>
        </ul>
        <Foot></Foot>
      </div>
    );
  }
}

export let Zhuce = Form.create({ name: "register" })(RegistrationForm);
