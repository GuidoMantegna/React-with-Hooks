import React, { Fragment } from 'react';

function TipCard ({ product, info, children}) {

    return (
        <Fragment>
            <div className="tip-card text-dark bg-light">
                {children}
                <div className="card-header">{product}</div>
                <div className="tip-card-body">
                    <p className="tip-card-text">{info}</p>
                </div>
            </div>
        </Fragment>
    )
    
}

export default TipCard;