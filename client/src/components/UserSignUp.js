import React, {useState, useRef, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";


function UserSignUp() {

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [emailAddress, setEmailAddress] = useState('');
const [password, setPassword] = useState('');
const navigate = useHistory();


const handleSubmit = async (e) => {
    e.preventDefault();


}


const cancelLogin = (event)  => {
    event.preventDefault();
    navigate('/');
}

  return (
    <React.Fragment>
        <div className="wrap header--flex">
            <h1 className="header--logo"><a href="index.html">Courses</a></h1>
            <nav>
                <ul className="header--signedout">
                    <li><a href="sign-up.html">Sign Up</a></li>
                    <li><a href="sign-in.html">Sign In</a></li>
                </ul>
            </nav>
        </div>
        <div className="form--centered">
            <h2>Sign Up</h2>
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input 
                    id="firstName" 
                    name="firstName" 
                    type="text" 
                    onChange={(e) => setFirstName(e.target.value)}
                    value=""
                />
                <label htmlFor="lastName">Last Name</label>
                <input 
                    id="lastName" 
                    name="lastName" 
                    type="text" 
                    onChange={(e) => setLastName(e.target.value)}
                    value=""
                />
                <label htmlFor="emailAddress">Email Address</label>
                <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="email" 
                    onChange={(e) => setEmailAddress(e.target.value)}
                    value=""
                />
                <label htmlFor="password">Password</label>
                <input 
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={cancelLogin}>Cancel</button>
            </form>
            <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
        </div>
    </React.Fragment>

  )
}

export default UserSignUp