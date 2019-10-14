import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

const deleteSandwichFromServer = (id) =>
fetch(`/api/sandwich/${id}/`,
{
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify()
})

class SandwichDetail extends Component {
    state = {
        sandwich: {},
        redirectToHome: false
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
    

    deleteSingleSandwich = () => {
        deleteSandwichFromServer(this.state.sandwich.id)
        .then(() => {
            this.props.setSandwiches()
            this.setState({redirectToHome: true})
        })
    }
    
    render() {
        if(this.state.redirectToHome) {
           return( <Redirect to="/" /> )
        }
        return (
            <div className="body">
                <Link to="/">Home</Link>
                <div></div>
                <h1>{this.state.sandwich.name}</h1>
                <ul>
                    <li>{this.state.sandwich.location}</li>
                    <li>{this.state.sandwich.description}</li>
                    <li>{this.state.sandwich.createdOn}</li>                    
                </ul>
                <button onClick={this.deleteSingleSandwich}>Delete</button>
            </div>
        )
    }
}

export default SandwichDetail