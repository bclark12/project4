import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SandwichDetail extends Component {
    state = {
        sandwich: {}
    };

    getSingleSandwich = () => {
        fetch(`/api/sandwich/${this.props.match.params.id}/`)
        .then(res => res.json())
        .then(sandwich => {
            this.setState({ sandwich })
        })
    }

    componentDidMount = () => {
        this.getSingleSandwich();
    }

    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <h1>{this.state.sandwich.name}</h1>
                <ul>
                    <li>{this.state.sandwich.location}</li>
                    <li>{this.state.sandwich.description}</li>
                    <li>{this.state.sandwich.createdOn}</li>
                    
                </ul>
            </div>
        )
    }
}

export default SandwichDetail