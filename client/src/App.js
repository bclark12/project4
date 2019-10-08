import React from 'react';
import './App.css';

const userPreview = (user) => {
  return (
  <option value={user.id}>{user.username}</option>
  )
}

const userList = (users, currentUserId, onChange) => {
  return (
  <select value={currentUserId} onChange={(evnt) => onChange(evnt.target.value)}>
    {users.map(userPreview)}
  </select>
  )
}

const categoryPreview = (category) => {
  return (
  <option value={category.id}>{category.category}</option>
  )
}

const userCategoryList = (categories, currentCategoryId, onChange) => {
  return (
    <select value={currentCategoryId} onChange={(evnt) => onChange(evnt.target.value)}>
      {categories.map(categoryPreview)}
    </select>
  )
}

const sandwichPreview = (sandwich) => (
  <li>{sandwich.id} - {sandwich.name}</li>
)

const sandwichList = (sandwichesArray) => (
  <ul>
    {sandwichesArray.map(sandwichPreview)}
  </ul>
)

const categorySandwichList = (category) => (
  <div>
    {category.category}
    {sandwichList(category.sandwiches)}
  </div>
)


class App extends React.Component{
  state = {
    currentUser: 1,
    users: {
      1: {
        id: 1,
        username: "Bob",
        email: "foo@foo.com",
        currentCategory: 1,
        categories: {
          1: {
            id: 1,
            category: "Burger",
            sandwiches: [
              {id: 1, name: "Gut Puncher", location: "Burger Town", 
              description: "Really good", createdOn: "2019-09-28T15:05:18.180058Z"},
              {id: 2, name: "Devils Lettuce", location: "Denver", 
              description: "High up on the list", createdOn: "2019-09-29T15:05:18.180058Z"}
            ]
          },
          2: {
            id: 2,
            category: "Vegan",
            sandwiches: [
              {id: 3, name: "lettuce", location: "hippy place", 
              description: "green", createdOn: "2019-09-30T15:05:18.180058Z"},
              {id: 4, name: "vegan chicken", location: "Ashville", 
              description: "made by a hippy", createdOn: "2019-10-28T15:05:18.180058Z"}
            ]
          }
        }
      },
      2: {
        id: 2,
        username: "Rick",
        email: "rick@foo.com",
        currentCategory: 3,
        categories: {
          3: {
            id: 3,
            category: "Burger2",
            sandwiches: [
              {id: 5, name: "Gut Puncher", location: "Burger Town", 
              description: "Really good", createdOn: "2019-10-29T15:05:18.180058Z"},
              {id: 6, name: "Devils Lettuce", location: "Denver", 
              description: "High up on the list", createdOn: "2019-10-30T15:05:18.180058Z"}
            ]
          },
          4: {
            id: 4,
            category: "Vegan2",
            sandwiches: [
              {id: 7, name: "lettuce", location: "hippy place", 
              description: "green", createdOn: "2019-11-29T15:05:18.180058Z"},
              {id: 8, name: "vegan chicken", location: "Ashville", 
              description: "made by a hippy", createdOn: "2019-11-30T15:05:18.180058Z"}
            ]
          }
        }
      }
    }
  }

  getAllUsers = () =>
    Object.values(this.state.users)

  setCurrentUser = (currentUser) => {
    this.setState({ currentUser })
  }

  getCurrentUser = () => 
    this.state.users[this.state.currentUser]

  getUserCategories = () =>
    Object.values(this.getCurrentUser().categories)

  setCurrentCategory = (currentCategory) => {
    let users = {...this.state.users}
    users[this.state.currentUser].currentCategory = currentCategory
    this.setState({ users })
  }

  getCurrentCategory = () =>
    this.getCurrentUser().categories[this.getCurrentUser().currentCategory]
  

  render() {
    return (
      <div>
        {userList(this.getAllUsers(), this.state.currentUser, this.setCurrentUser)}
        {userCategoryList(this.getUserCategories(), this.getCurrentUser().currentCategory, this.setCurrentCategory)}
        {categorySandwichList(this.getCurrentCategory())}
      </div>
    )
  }
}

export default App;
