import React, { Component } from 'react'

class CategoryForm extends Component {
    state = {
        category: ""
    }

    render() {
        return (
            <form>
                <input type="text" name="category" value={this.state.category} placeholder="Category" />
            </form>
        )
    }
}

export default CategoryForm