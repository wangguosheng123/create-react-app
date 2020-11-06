import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";
import FormItem from "antd/lib/form/FormItem";

import "./login.less";
import { Foot } from "../../components/Foot";

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let username = values.userName;
        let userpwd = values.password;

        let users = localStorage.getItem("users");
        users = JSON.parse(users);

        let flag = false;
        for (var i = 0; i < users.length; i++) {
          let item = users[i];
          if (item.name === username) {
            if (item.pwd === userpwd) {
              flag = true;
              alert("恭喜您，登录成功");

              localStorage.setItem("token", username);
              // window.location.href = "./home";
              // window.location.reload();
              // return <Redirect to='/home' />
              this.props.history.push("/home")
              return;
            } else {
              alert("密码输入错误，请重新输入");
              return;
            }
          } else {
            flag = false;
          }
        }

        if (flag === false) {
          alert("您目前还没有注册，即将前往注册");
          // window.location.href = "./zhuce";
          // return <Redirect to='/zhuce' />
          this.props.history.push("/zhuce")
        }
      }
    });
  };
  quzhuce =()=>{
    this.props.history.push("/zhuce")
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
            <Row>
              <Col span={4} offset={4}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  用户名
                  <Form.Item>
                    {getFieldDecorator("userName", {
                      rules: [{ required: true, message: "请输入用户名!" }]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="请输入用户名"
                      />
                    )}
                  </Form.Item>
                  密码
                  <Form.Item>
                    {getFieldDecorator("password", {
                      rules: [{ required: true, message: "请输入密码!" }]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        type="password"
                        placeholder="请输入密码"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("remember", {
                      valuePropName: "checked",
                      initialValue: true
                    })(<Checkbox>记住密码</Checkbox>)}
                    <a style={{ marginLeft: 90 }} onClick={this.quzhuce}>
                      去注册
                    </a>
                  </Form.Item>
                  <FormItem>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      登录
                    </Button>
                  </FormItem>
                </Form>
              </Col>
            </Row>
          </li>
        </ul>
        <Foot/>
      </div>
    );
  }
}
export let Login = Form.create({ name: "normal_login" })(NormalLoginForm);
