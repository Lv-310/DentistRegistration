import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../pagenotfound/pagenotfound.css'

import App from '../../App';

export default class PageNotFound extends Component {
    render() {
        return (
            <div id='containerPageNotFound'>
                <div className="container-fluid mt-5">
                    <h3 className="text-center">
                        No match for {window.location.pathname}
                    </h3>
                    <h3 className="text-center">
                        <Link to='/admin'> Redirect to the home page </Link> ?
                    </h3>
                </div>
            </div>
        )
    }
}