import React from "react";
import { Fragment } from "react";
import './styles/NotFound.css'

const NotFound = ({ userName, onClick, status }) => {
    return(
        <Fragment>
            <div className="not-found">
                <div className="not-found-img">
                    <h2>404: Not Found :(</h2>
                </div>
            </div>
        </Fragment>
    )
};

export default NotFound;