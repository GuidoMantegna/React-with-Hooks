import { Fragment } from 'react';
import { Link } from 'react-router-dom'

function HomeCard ({ cardTitle, cardText, backgroundColor, cardBack, linkTo }) {

    const cardImg = {backgroundImage: `url(${cardBack})`,}
    const bodyStyle = {background: backgroundColor,}

    return (
        <Fragment>
                <div className="home-card" style={cardImg}>
                    <div className="home-card-body" style={bodyStyle}>
                        <Link to={linkTo} className="link">
                            <h5 className="home-card-title">{cardTitle}</h5>
                        </Link>
                        <p className="home-card-text">{cardText}</p>
                    </div>
                </div>
        </Fragment>    
    )
};

export default HomeCard;