import React, { Component } from 'react';

import { Tabs } from './Tabs'

import 'whatwg-fetch'

import '../assets/css/Tab3.css'
import { Link } from 'react-router-dom'


export class Tab3 extends Component {
	constructor(props) {
		super(props)
		this.state = {
			arr: [],
			totalPrice: 0
		}
	}
	//获取输入框的值
	handInputChange = (e, i) => {
		console.log(e.target.value)
		//文本框的值 e.target.value 需要赋值给 json 数据的下标为index
		this.setState({
			arr: this.state.arr.map((ele, index) => {
				if (index == i) {
					ele.num = e.target.value
					return ele
				} else {
					return ele
				}
			})
		})
		this.SumPrice()
	}
	//add 加
	add = (e, i) => {
		console.log(e.target.value)
		//文本框的值 e.target.value 需要赋值给 json 数据的下标为index
		this.setState({
			arr: this.state.arr.map((ele, index) => {
				if (index == i) {
					ele.num = ele.num * 1 + 1
					return ele
				} else {
					return ele
				}
			})
		})
		this.SumPrice()

	}
	//减
	jian = (e, i) => {
		// console.log(e.target.value)
		//文本框的值 e.target.value 需要赋值给 json 数据的下标为index
		this.setState({
			arr: this.state.arr.map((ele, index) => {
				if (index == i) {
					if (ele.num == 0) {
						ele.num = 1
						return ele

					} else {
						ele.num = ele.num * 1 - 1
						return ele

					}

				} else {
					return ele
				}
			})
		})
		this.SumPrice()
	}
	//删除
	del = (e, i) => {
		this.setState({
			arr: this.state.arr.filter((ele, index) => {
				if (index != i) {
					return true
				}
			})
		})
	}
	//获取单选框的值
	getCheckedChange = (e, i) => {
		//console.log(e.target.checked)
		//文本框的值 e.target.value 需要赋值给 json 数据的下标为index
		this.setState({
			arr: this.state.arr.map((ele, index) => {
				if (index == i) {
					ele.checked = e.target.checked
					return ele
				} else {
					return ele
				}
			})
		})
		this.SumPrice()
	}
	//点击全选和全不选
	CheckedChange = (e) => {
		if (e.target.checked == true) {
			this.setState({
				arr: this.state.arr.map((ele, index) => {
					ele.checked = true
					return ele
				})
			})

		} else if (e.target.checked == false) {
			this.setState({
				arr: this.state.arr.map((ele, index) => {
					ele.checked = false
					return ele
				})
			})
		}
		this.SumPrice()
	}
	//计算总价
	SumPrice = () => {
		var sum = 0
		this.state.arr.forEach((ele, index) => {
			sum += ele.num * ele.new_price
		})
		this.setState({
			totalPrice: sum
		})
	}
	render() {
		// console.log(this.state.arr)
		return (
			<p className="shopCar">

				<p className='header'>

					<Link to="/tab1">返回</Link>
					<h3>购物车</h3>

				</p>

				<p className='section'>
					<p className='list'>
						{
							this.state.arr.map((ele, index) => {
								return (
									<p className='item' key={index}>

										<p className='radio'>
											<input type="checkbox" checked={ele.checked} onChange={
												(e) => {
													this.getCheckedChange(e, index)
												}
											} />
										</p>

										<p className='le'>
											<img src={ele.img} alt="" />
										</p>

										<p className='center'>
											<h3>{ele.name}</h3>
											<p className='num'>
												<button onClick={(e) => {
													// console.log(e,index)
													this.jian(e, index)
												}}>-</button>
												{/*获取文本框的值*/}
												<input type="text" value={ele.num} onChange={(e) => {
													// console.log(e,index)
													this.handInputChange(e, index)
												}} />
												<button onClick={(e) => {
													// console.log(e,index)
													this.add(e, index)
												}}>+</button>
											</p>

											<p className="price">
												<p>单价: {ele.new_price} 总价:{ele.new_price * ele.num}</p>
											</p>

										</p>
										<p className='ri'>
											<button onClick={(e) => {
												this.del(e, index)
											}}>删除</button>
										</p>
									</p>
								)
							})
						}
					</p>
				</p>

				<p className="footer">
					全选: <input type="checkbox" ref="quanxuan" onChange={
						(e) => {this.CheckedChange(e)}} />
					合计: {this.state.totalPrice}<button onClick={(e) => {
							this.props.history.push('/sub')
							//使用数组的过滤方法来选择更新之后的值
							var newArr = this.state.arr.filter((ele, index) => {
								if (ele.checked == true) {
									return true
								} else {
									return false
								}
							})
							//使用浏览器缓存来传递数据,因为h5
							window.localStorage.setItem("shuju", JSON.stringify(newArr))
						}
					}>结算</button>
				</p>

			</p>
		);
	}
	//渲染页面
	componentDidMount() {
		var url = './shopping.json'

		fetch(url)
			.then((res) => { return res.json() })
			.then((res) => {
				this.setState({
					arr: res
				})
			})
	}
	//页面更新
	componentDidUpdate() {
		// console.log("更新了")
		var bool = this.state.arr.every((ele, index) => {
			if (ele.checked == true) {
				return true
			} else {
				return false
			}
		})
		// console.log(bool)
		if (bool == true) {
			this.refs.quanxuan.checked = true
		} else {
			this.refs.quanxuan.checked = false
		}
	}



}