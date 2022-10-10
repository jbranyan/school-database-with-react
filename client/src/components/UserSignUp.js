import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";


function UserSignUp({ context }) {

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [emailAddress, setEmailAddress] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessages] = useState([]);
const history = useHistory();

//Take the information entered by the user and attempt to create a new account
const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
        firstName,
        lastName,
        emailAddress,
        password
    }
    //Attempts to create the new user and redirects to the course details page if successful
    //If not successful, an error message will display on the form
    context.data.createUser(user)
        .then(errors => {
            if(errors.length){
                setErrorMessages(errors);
                } else {
                    context.actions.signIn(
                        user.emailAddress,
                        user.password
                    )
                    .then(() => {
                        history.push('/');
                    });
            }
        })
        .catch( error => {
                console.log(error);
        })


}

//When a user cancels login, it redirects to the course detail page
const cancelLogin = (event)  => {
    event.preventDefault();
    history.push('/');
}

  return (
    <React.Fragment>
        <div className="form--centered">
            <h2>Sign Up</h2>

            { errorMessage.length > 0 &&
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        {Array.from(errorMessage).map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            }

            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                />
                <label htmlFor="emailAddress">Email Address</label>
                <input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    onChange={(e) => setEmailAddress(e.target.value)}
                    value={emailAddress}
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
            <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
        </div>
    </React.Fragment>

  )
}

export default UserSignUp