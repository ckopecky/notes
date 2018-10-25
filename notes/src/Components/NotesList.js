import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../index.css";
import axios from 'axios';
import house from '../house.png'

class NotesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
        }
    }

    componentDidMount() {
        const token = localStorage.getItem("jwt");
        let promise = axios.get(`http://localhost:7000/api/notes`, {headers: {Authorization: token}});
        promise
            .then((response) => {
                this.setState({
                    notes: response.data
                });
            })
            .catch((error) => {
                console.error(error);
            })
        }

        handleSignOut = () => {
            if (localStorage.getItem('jwt')) {
                localStorage.removeItem('jwt');
        
                this.props.history.push('/');
            }
        };

    render() {
        console.log(this.state.notes);
        return (
            <div>
                <div className="home-link"><Link exact to="/">
                <img className="house-pic"src={house} alt="home"/>Notepen</Link></div>
                <div className="main-note-container">
                <div>
                {
                    localStorage.getItem("jwt") && 
                    <div>
                        <div className="sign-out" onClick={this.handleSignOut}>Sign Out</div>  
                    </div>
                }
                {
                    !localStorage.getItem("jwt") &&
                    <div className="please-signin">
                        <Link className="link-style" to="/login">
                            <h1>Please Sign in to access list of notes</h1>
                        </Link>
                    </div>
                }
                <ul className="collection-of-notes">
                    {this.state.notes.map(note => {
                        return(
                            <li className="indiv-note" key={note._id}>
                                <h4>title:  {note.title}</h4>
                                <p>body: {note.body}</p>
                            </li>
                        )}
                    )}
                        </ul>
                    </div>
                </div>
                <div><Link to="/create"><h4 className="create-link">Create note</h4></Link></div>
            </div>
        );
}}

export default NotesList;