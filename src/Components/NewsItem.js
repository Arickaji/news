import React from 'react'

const NewsItem = (props) => {
        let { title, description, imageUrl, newsUrl, author, date, source, badgeColor } = props;
        return (
            <div className="my-4">
                <div className="card">
                    <span className={`position-absolute top-0 translate-middle badge rounded-pill bg-${badgeColor}`} style={{ left: "85%", zIndex: '1' }}>
                        {source}
                    </span>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toUTCString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div >
        )
    }

export default NewsItem

