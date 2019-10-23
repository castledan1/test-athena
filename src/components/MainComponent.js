import React, { Component } from 'react';
import Users from "./components/UsersComponent";
import './assets/css/style.css';

class Main extends Component{

  constructor(props){
    super(props);
    
    this.state = {
      user : null,
      selectedUser : null
    };
  }

  onUserSelect( user ){
    this.setState({ selectedUser : user });
  }
  
  render() {
    return (
      <div className="container">
        <Users />
      </div>
    );
  }
}

export default Main;
