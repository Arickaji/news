import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

// Api key : 813132cec6c84b93908a79b7429e9e26
// ctrl + shift + r to get the latest position without cache

const News = (props) =>{

    const [article, setarticle] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updateNews = async () =>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&country=${props.country}&language=en&page=${page}&pagesize=${props.pagesize}`;
        // this.setState({ loading: true });
        setloading(true)
        let response = await fetch(url);
        props.setProgress(30);
        let data = await response.json();
        props.setProgress(70);
        
        setarticle(data.articles)
        settotalResults(data.totalResults)
        props.setProgress(100);
        setloading(false)
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - News`;
        updateNews();
        // eslint-disable-next-line 
    }, [])


    // const handlePreBtn = async () => {
    //     setpage(page-1)
    //     updateNews();
    // }

    // const handleNextBtn = async () => {
    //     setpage(page+1)
    //     updateNews();
    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&country=${props.country}&language=en&page=${page+1}&pagesize=${props.pagesize}`;
        setpage(page+1)
        let response = await fetch(url);
        let data = await response.json();

        setarticle(article.concat(data.articles))
        settotalResults(data.totalResults)
    };

    return (
        <>
            <div className="container my-3">
                <h2 className="text-center" style={{marginTop:"65px"}}>News - Top {props.category} Headlines</h2>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={article.length}
                    next={fetchMoreData}
                    hasMore={article.length !== totalResults}>

                    <div className="container">
                        <div className="row">
                            {article.map((element) => {
                                // console.log(element.url);
                                return <div key={element.url} className="col-md-4">
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={!element.urlToImage ? "https://cdn.cnn.com/cnnnext/dam/assets/211110203224-vikings-helmet-file-super-tease.jpg" : element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} badgeColor={props.badgeColor} />
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
        </>
    )
}


News.defaultProps = {
    country: "IN",
    pageSize: 10,
    category: "general"
}

News.propstypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    badgeColor: PropTypes.string
}


export default News
