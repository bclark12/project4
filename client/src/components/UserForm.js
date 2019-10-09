import React, { Component } from 'react'

class UserForm extends Component {
    state = {
        username: "",
        email: "",
    }

    handleInput = (evnt) => {
        let newUser = {...this.state};
        newUser[evnt.target.name] = evnt.target.value;
        this.setState(newUser)
    }

    handleSubmit = (evnt) => {
        evnt.preventDefault();
        this.props.addNewUser(this.state)
        this.setState({ username: "", email: "" })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" onChange={this.handleInput} value={this.state.username} placeholder="Username" />
                <input type="email" name="email" onChange={this.handleInput} value={this.state.email} placeholder="Email" />
                <input type="submit" value="Add User" />
            </form>
        )
    }
}

export default UserForm