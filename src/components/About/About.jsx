// import React from 'react';
// import { Container } from '@material-ui/core';
// import useStyles from './Styles';
// import InfiniteScrollPosts from '../Posts/InfiniteScrollPosts';

// const About = () => {
//   const classes = useStyles()

//   return (
//     <Container
//       className={classes.homeContainer}
//       maxWidth="lg"
//       style={{ margin: '100px auto 20px' }}>
//      {/* <div>About</div> */}
//      {/* <img style={{width: '200px'}} src='https://media0.giphy.com/media/Lr4HRF6DEEJo90SQXF/giphy.gif?cid=6c09b952b76587897d4ccc54bcd9f79e9d4fcabb8397a3b1&rid=giphy.gif&ct=s'/> */}
    
//     <InfiniteScrollPosts />
//     </Container>
//   );
// };

// export default About;

import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
console.log('ksjjkfj')

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
    state: {
      progress: 0
    },
    setProgress: (progress) => {
      this.setState({progress : progress})
    }
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalize(this.props.category)} | News monkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d093053d72bc40248998159804e0e67d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  render() {
    return (
      <div className="container my-4">
        <h1 className="text-light text-center" style={{ marginTop: "90px" }}>
          News monkey - Top {this.capitalize(this.props.category)} headlines
        </h1>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<div>loading</div>}
        >
          <div className="container">
            <div className="row my-4">
              {this.state.articles.map((element) => {
                return (
                  <div key={element.url} className="col-md-4">
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://www.caspianpolicy.org/no-image.png"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
