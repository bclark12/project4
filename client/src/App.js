import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import UserForm from './components/UserForm'
import CategoryForm from './components/CategoryForm'
import SandwichForm from './components/SandwichForm'
import SandwichDetail from './components/SandwichDetail'

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
  <li>
    <Link to={`/sandwich/${sandwich.id}`}>
      {sandwich.id} - {sandwich.name}
    </Link>
  </li>
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

const getUsersFromServer = () =>
  fetch('/api/user/')
  .then(res => res.json())

const getCategoriesFromServer = () =>
  fetch('/api/category/')
  .then(res => res.json())

const getSandwichesFromServer = () =>
  fetch('/api/sandwich/')
  .then(res => res.json())

const matchingCategoriesAndSandwiches = (users, categories, sandwiches) =>
  users.reduce((obj, user) => {
    let matchingCategoryArr = categories.filter(category => category.user === user.id);
    let matchingObj = matchingCategoryArr.reduce((objTwo, category) => {
      category.sandwiches = sandwiches.filter(sandwich => sandwich.category === category.id);
      objTwo[category.id] = category
      return objTwo
    }, {})
    user.categories = matchingObj
    let defaultCategory = {
      0: {
        id: 0,
        category: "",
        user: user.id,
        sandwiches: []
      }
    }
    if (Object.keys(user.categories).length < 1) {
      user.categories = defaultCategory
    }
    user.currentCategory = Object.keys(user.categories)[0]
    obj[user.id] = user;
    return obj;
  }, {})

const getUsersAndCategoriesAndSandwichesFromServer = () =>
  getUsersFromServer().then(users => 
    getCategoriesFromServer().then(categories => 
      getSandwichesFromServer().then(sandwiches => 
        matchingCategoriesAndSandwiches(users, categories, sandwiches))))

const saveUserToServer = (newUser) =>
  fetch('/api/user/',
    { 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
    }).then(res => res.json())

const saveCategoryToServer = (newCategory) =>
  fetch('/api/category/',
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory)
    }).then(res => res.json())

const saveSandwichToServer = (newSandwich) =>
    fetch('/api/sandwich/',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSandwich)
      }).then(res => res.json())

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

  componentDidMount = () => {
    getUsersAndCategoriesAndSandwichesFromServer()
      .then(users => {
        this.setState({ users })
      })
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

  addNewUser = (newUserInfo) => {
    saveUserToServer(newUserInfo)
    .then(newUser => {
      let defaultCategory = {
        0: {
          id: 0,
          category: "",
          user: newUser.id,
          sandwiches: []
        }
      }
      let users = {...this.state.users};
      users[newUser.id] = newUser;
      users[newUser.id].categories = defaultCategory
      users[newUser.id].currentCategory = 0
      this.setState({ users, currentUser: newUser.id });
    })
  }

  addNewCategory = (category) => {
    saveCategoryToServer({ category, user: this.state.currentUser })
    .then(newCategory => {
      let users = {...this.state.users};
      newCategory.sandwiches = []
      console.log(newCategory)
      users[this.state.currentUser].categories[newCategory.id] = newCategory
      users[this.state.currentUser].currentCategory = newCategory.id
      this.setState({ users })
    })
  }

  addNewSandwich = (sandwich) => {
    sandwich.category = this.getCurrentUser().currentCategory
    saveSandwichToServer(sandwich)
    .then(newSandwich => {
      let users = {...this.state.users};
      let currentCategoryVar = this.state.users[this.state.currentUser].currentCategory
      users[this.state.currentUser].categories[currentCategoryVar].sandwiches.push(newSandwich);
      this.setState({ users })
    })
  } 
  
  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <div>
                {userList(this.getAllUsers(), this.state.currentUser, this.setCurrentUser)}
                {userCategoryList(this.getUserCategories(), 
                  this.getCurrentUser().currentCategory, this.setCurrentCategory)}
                {categorySandwichList(this.getCurrentCategory())}
                <UserForm addNewUser={this.addNewUser} />
                <CategoryForm addNewCategory={this.addNewCategory} />
                <SandwichForm addNewSandwich={this.addNewSandwich} currentCategory={this.getCurrentCategory} />
              </div>
            )}
          />
          <Route path="/sandwich/:id" component={SandwichDetail} />
        </Switch>
      </div>
    )
  }
}

export default App;
