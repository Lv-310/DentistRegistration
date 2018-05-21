import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import App from '../../App';

export default class PageNotFound extends Component {
    render() {
        return (
            <div id='PageNotFound'>
                <div className="container">
                    <h3 className="text-center">
                        No match for {window.location.pathname}
                    </h3>
                    <h3 className="text-center">
                        <Link to='/Home'> Redirect to the home page </Link> ?
                    </h3>
                </div>
            </div>
        )
    }
}