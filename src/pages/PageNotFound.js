import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PageNotFound extends Component {
    render() {
        return (
            <div className="pageNotFound text-center">
            <h1 className="text-center">404</h1>
            <Link to="/">
            Home
            </Link>
          </div>
        )
    }
}