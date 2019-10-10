import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SandwichDetail extends Component {
    state = {
        sandwich: {}
    };

    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <h1>Hello World</h1>
            </div>
        )
    }
}

export default SandwichDetail