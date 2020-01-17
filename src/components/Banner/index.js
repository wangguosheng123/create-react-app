import { Link } from "react-router-dom";
import React from "react";

import ReactSwiper from "reactjs-swiper"; //

// 引入swiper的css的样式
// import "Swiper/dist/css/swiper.min.css";

import axios from "axios";

import "./banner.less";

export class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerList: []
    };
  }

  componentDidMount() {
    axios.get("./banner.json").then(({ data }) => {
      let bannerList = data.list.map(goods => {
        return { image: goods.banner, link: "./goods", title: "轮播图" };
      });
      this.setState({ bannerList });
    });
  }

  render() {
    let { bannerList } = this.state;
    console.log(bannerList);
    const swiperOptions = {
      preloadImages: true,
      autoplay: 2000,
      autoplayDisableOnInteraction: true
    };

    return (
      <div className="bannerbox">
        {/* <div className="swiper-container">
          <div className="swiper-wrapper">{domList}</div>
          <div className="swiper-pagination"></div>

          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div> */}
        <ReactSwiper
          swiperOptions={swiperOptions}
          showPagination
          items={bannerList}
          className="swiper-example"
        />
      </div>
    );
  }
}
