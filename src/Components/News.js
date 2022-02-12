import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

// Api key : 813132cec6c84b93908a79b7429e9e26
// ctrl + shift + r to get the latest position without cache

export default class News extends Component {

    static defaultProps = {
        country: "IN",
        pageSize: 10,
        category: "general"
    }

    static propstypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        badgeColor: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        // always remember that always use super () in constructer
        super(props);
        console.log("this is a News component constructer");
        this.state = {
            article: [],
            loading: false,
            page: 1,
            totalResults: []
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=${this.props.apiKey}&country=${this.props.country}&language=en&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        this.setState({ loading: true });
        const response = await fetch(url);
        this.props.setProgress(30);
        const data = await response.json();
        this.props.setProgress(70);
        this.setState({ article: data.articles, totalResults: data.totalResults, loading: false })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePreBtn = async () => {
        this.setState({ page: this.page - 1 })
        this.updateNews();
    }

    handleNextBtn = async () => {
        console.log("Next");
        this.setState({ page: this.state.page + 1 })
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=${this.props.apiKey}&country=${this.props.country}&language=en&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        let response = await fetch(url);
        let data = await response.json();
        this.setState({ article: this.state.article.concat(data.articles), totalResults: data.totalResults, loading: false })
    }


    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center">News - Top {this.props.category} Headlines</h2>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length !== this.state.totalResults}
                    loader={<Spinner></Spinner>}>

                    <div className="container">
                        <div className="row">
                            {!this.state.loading && this.state.article.map(element => {
                                // console.log(element.url);
                                return <div key={element.url} className="col-md-4">
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={!element.urlToImage ? "https://cdn.cnn.com/cnnnext/dam/assets/211110203224-vikings-helmet-file-super-tease.jpg" : element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} badgeColor={this.props.badgeColor} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="row">
                    {!this.state.loading && this.state.article.map(element => {
                        // console.log(element.url);
                        return <div key={element.url} className="col-md-4">
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={!element.urlToImage ? "https://cdn.cnn.com/cnnnext/dam/assets/211110203224-vikings-helmet-file-super-tease.jpg" : element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} badgeColor={this.props.badgeColor} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-secondary" onClick={this.handlePreBtn}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} type="button" className="btn btn-secondary" onClick={this.handleNextBtn}>Next &rarr;</button>
                </div> */}
            </div >
        )
    }
}
