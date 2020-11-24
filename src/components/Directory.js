// QUESTION: by 'destructuring'? here, does that make it possible NOT to use extends "React.Component" in the class creation?
import React, { Component } from "react";
import Table from 'react-bootstrap/Table';

// import API from "../utils/API";

// QUESTION: is it best practice to use class instead of functional components?
class Directory extends Component {
    // QUESTION: is it best practice to use constructor/ super when designating 'state'?
    constructor(props) {
        // QUESTION: why is "super" crossed out? Is it OK to remove "props" from super (and constructor)?
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            results: []
        };
      }

    componentDidMount() {
        fetch("https://randomuser.me/api/?results=200&nat=us")
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

    render() {
        const { error, isLoaded, results } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    {/* how do I use these props correctly? */}
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
                                // what's the bes 'key' to use, and why?
                                <tr key={employee.id.value}>
                                    <td>{employee.picture.thumbnail}</td>
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
