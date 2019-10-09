import React, { Component } from 'react'

class SandwichForm extends Component {
    state = {
        name: "",
        location: "",
        description: ""
    }

    handleInput = (evnt) => {
        let newSandwich = {...this.state};
        newSandwich[evnt.target.name] = evnt.target.value
        this.setState(newSandwich)
    }

    handleSubmit = (evnt) => {
        evnt.preventDefault();
        this.props.addNewSandwich(this.state)
        this.setState({ name: "", location: "", description: "" })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" onChange={this.handleInput} value={this.state.name} placeholder="Name" />
                <input type="text" name="location" onChange={this.handleInput} value={this.state.location} placeholder="Location" />
                <input type="text" name="description" onChange={this.handleInput} value={this.state.description} placeholder="Description" />
                <input type="submit" value="Add Sandwich" />
            </form>
        )
    }
}

export default SandwichForm