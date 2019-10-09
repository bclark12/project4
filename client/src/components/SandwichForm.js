import React, { Component } from 'react'

class SandwichForm extends Component {
    state = {
        name: "",
        location: "",
        description: ""
    }

    render() {
        return (
            <form>
                <input type="text" name="name" value={this.state.name} placeholder="Name" />
                <input type="text" name="location" value={this.state.location} placeholder="Location" />
                <input type="text" name="description" value={this.state.description} placeholder="Description" />
            </form>
        )
    }
}

export default SandwichForm