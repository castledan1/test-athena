import React, { Component } from 'react';
import Users from "./components/UsersComponent";
import { } from "bootstrap-social";
import './App.css';

class App extends Component{

  constructor(props){
    super(props);
    
    this.state = {
      user : null
    };
  }

  render() {
    return (
      <div className="container">
        <Users />
      </div>
    );
  }
}

export default App;
