import React from "react";
import { Fragment } from "react";

const Login = ({ userName, onClick, status }) => {
    return(
        <Fragment>
            <div className="login-container">
                <p className="user-name"><i className="bi bi-person-circle"></i>{userName}</p>
                <button className="btn-success btn login-btn" onClick={onClick} data-status={status}>Login</button>
                <input className="login-input" type="text"/>
            </div>
        </Fragment>
    )
};

export default Login;