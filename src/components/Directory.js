import React, { Component } from "react";
import Table from 'react-bootstrap/Table';

// import API from "../utils/API";

class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            search: "",
            results: []
        };
      }

    componentDidMount() {
        fetch("https://randomuser.me/api/?results=200&nat=us")
        // API.getUsers()
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        results: result.results
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

    handleInputChange = event => {

        const value = event.target.value;
        const name = event.target.name;

        const filteredUsers = this.state.results.filter(user => {
            let userName = user.name.first + user.name.last;
            userName = userName.toLowerCase();
            console.log(userName);
            
            return userName.includes(value);
        });
    
        this.setState({
            [name]: value,
            results: filteredUsers
        });

        console.log(this.state.search);
    };

    render() {
        const { error, isLoaded, results } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <form className="form">
                        <input
                            name="search"
                            onChange={this.handleInputChange}
                            type="text"
                            placeholder="Search"
                        />
                        {/* <button onClick={this.handleFormSubmit}>Submit</button> */}
                    </form>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>DOB</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(employee => (
                                <tr key={employee.id.value}>
                                    <td><img src={employee.picture.thumbnail} alt="" /></td>
                                    <td>{employee.name.first} {employee.name.last}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.dob.date}</td>
                                </tr>
                            ))}                        
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}

export default Directory;
