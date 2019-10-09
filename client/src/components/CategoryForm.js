import React, { Component } from 'react'

class CategoryForm extends Component {
    state = {
        category: ""
    }

    handleInput = (evnt) => {
        this.setState({ category: evnt.target.value })
    }

    handleSubmit = (evnt) => {
        evnt.preventDefault();
        this.props.addNewCategory(this.state.category)
        this.setState({ category: "" })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="category" onChange={this.handleInput} value={this.state.category} placeholder="Category" />
                <input type="submit" value="Add Category" />                
            </form>
        )
    }
}

export default CategoryForm