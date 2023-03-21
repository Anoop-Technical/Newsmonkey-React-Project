import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl} = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={!imageUrl?"https://www.deccanherald.com/sites/dh/files/articleimages/2023/02/22/aws8f-cov-sho-sel-2-1193814-1677073817.jpg":imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a rel='noreferrer' href={newsUrl} target = "_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
