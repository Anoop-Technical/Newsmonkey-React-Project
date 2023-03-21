import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    constructor() {
        super();
            this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=dd33e1fde3c6474b86c38526b68320a9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true, 
        });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
    }
    handlePrevClick = async () =>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=dd33e1fde3c6474b86c38526b68320a9&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true, 
        });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false,
        });
    }
    handleNextClick = async () =>{
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=dd33e1fde3c6474b86c38526b68320a9&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({
               loading: true, 
            });
            let data = await fetch(url);
            let parsedData = await data.json();
            
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false,
            });
        }
    }
    render() {
        return (
            <div className='container my-4'>
                <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
                <div className="container d-flex justify-content-between">
                    <button type='button' disabled={this.state.page<=1} className='btn btn-dark' onClick={this.handlePrevClick}>&larr;Pervious</button>
                    <button type='button' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className='btn btn-dark' onClick={this.handleNextClick}>Next&rarr;</button>
                </div>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-lg-4 col-md-6 col-sm-12 col-12" key = {element.url}>
                            <NewsItem title = {element.title?element.title:""} description = {element.description?element.description:""} imageUrl = {element.urlToImage} newsUrl = {element.url} />
                        </div>
                    })}
                </div>
            </div>
        )
    }
}

export default News
