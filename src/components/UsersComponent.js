import React, { Component } from 'react';
import { Form, FormGroup, Label, Input,Card, CardImg, CardImgOverlay, CardBody, CardTitle, Media, CardSubtitle } from 'reactstrap';

class Users extends Component{
    constructor(props){
        super(props);
        
        this.onFindUser = this.onFindUser.bind(this);

        this.state = {
            error: null,
            isLoaded: false,
            users: [],
            selectedUser : null,
            filtered : null
        };
    }
    onUserSelect( user ){
        this.setState({ selectedUser : user });
    }

    onFindUser( event ){
        const users = this.state.users;
        const filtered = users.filter( itUser => ( itUser.name.first + " " + itUser.name.last ).toLowerCase().indexOf( event.target.value.toLowerCase() ) > -1 );

        this.setState({ filtered: filtered });
    }

    renderUser( user ){
        if( user ){
            return(
                <div className="col-12">
                    <div className="text-center view overlay border border-light border-2" >
                        <Card className="rounded-0">
                            <div className="contentCardImage">
                                <CardImg width="100%" className="opacity-card" src={user.picture.large} alt={user.login.user} />
                            </div>
                            <CardImgOverlay className="align-items-center text-light imageOverlay">
                                <Media width="35%" className="rounded-circle mt-5 mb-5 border border-2 border-white" object src={user.picture.medium} />
                                <CardTitle >{user.name.title} {user.name.first} {user.name.last}</CardTitle>
                                <CardSubtitle>{user.location.country}</CardSubtitle>
                            </CardImgOverlay>
                            <CardBody className="text-left font-weight-bold">
                                <ul className="list-unstyled list-info">
                                    <li >
                                        <span className="small">Email Address</span>
                                        <p>{user.email}</p>
                                    </li>
                                    <li>
                                        <span className="small">Phone Number</span>
                                        <p>{user.phone}</p>
                                    </li>
                                    <li>
                                        <span className="small">Cell Number</span>
                                        <p>{user.cell}</p>
                                    </li>
                                    <li>
                                        <span className="small">Age</span>
                                        <p>{user.dob.age}</p>
                                    </li>
                                </ul>
                            </CardBody>
                        </Card>
                    </div>
                    
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }

    componentDidMount() {
        const url = "https://randomuser.me/api/";
        let arrayFetch = [];
        for(let i=0; i<18; i++){
            arrayFetch.push( fetch(url) );
        }
        const promises = Promise.all(arrayFetch);

        promises
            .then((results) => 
                Promise.all(results.map(r => r.json()))
            )
            .then(
                (results) => {
                    let users = [];
                    results.map( user => (
                        users.push( user.results[0])
                    ));
                    this.setState({
                        isLoaded: true,
                        users: users,
                        filtered : users
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            ) 
            
      }

    render(){
        const { error, isLoaded, filtered } = this.state;
        if( error ){
            return <div>Error: {error.message}</div>;
        }else if (!isLoaded){
            return <div>Loading...</div>;
        }else{
            return(
                <div className="row justify-content-center" >
                    <div className="col-12 col-md-6 ">
                        <header className="header" className="mt-5">
                        <h4 className="font-weight-bold">Users</h4>
                        <p className="small text-muted">If you want to get contact information to specific users, 
                            just type a name and then select him from the list below</p>
                        </header>
                        <Form>
                            <FormGroup>
                                <Label className="col-3 font-weight-bold small" >
                                    Find user:
                                </Label>
                                <div className="col-9 d-inline-block small">
                                    <Input onChange={this.onFindUser} type="text" id="formName" placeholder="Type a name" />
                                </div>
                            </FormGroup>
                        </Form>
                        {filtered.map(item => {
                            const classSelectableUser = item === this.state.selectedUser ? "selected seletable-user align-items-center ml-0" : "seletable-user align-items-center ml-0";
                            return(
                                <div key={item.login.username} className="col-6 mt-4 d-inline-block align-middle" >
                                    <Media onClick = {() => this.onUserSelect( item ) }  tag="li" className={classSelectableUser}>
                                        <Media left middle>
                                            <Media object className="rounded-circle" object src={item.picture.thumbnail} />
                                        </Media>
                                        <Media body className="ml-2">
                                            <Media heading middle className="font-weight-bold small" >{item.name.first} {item.name.last}</Media>
                                        </Media>
                                    </Media>
                                </div>
                            );
                        })}
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="row" >
                            {this.renderUser( this.state.selectedUser )}
                        </div>
                    </div>
                </div>
            );
        }
    }
} 

export default Users;