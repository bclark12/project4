import React from 'react';
import './App.css';



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
            category: "Burger",
            sandwiches: [
              {id: 5, name: "Gut Puncher", location: "Burger Town", 
              description: "Really good", createdOn: "2019-10-29T15:05:18.180058Z"},
              {id: 6, name: "Devils Lettuce", location: "Denver", 
              description: "High up on the list", createdOn: "2019-10-30T15:05:18.180058Z"}
            ]
          },
          4: {
            id: 4,
            category: "Vegan",
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
  render() {
    return (
      <div>
        <h1>hello world</h1>
        <li>{this.state.users[2].categories[3].sandwiches[0].name}</li>
      </div>
    )
  }
}

export default App;
