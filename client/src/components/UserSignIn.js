/*UserSignIn - This component provides the "Sign In" screen by rendering a form that allows a user to sign in
using their existing account information. The component also renders a "Sign In" button that when clicked signs
 in the user and a "Cancel" button that returns the user to the default route (i.e. the list of courses).*/

import React, {useState, useRef, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthProvider';
import axios from '../axios';
const LOGIN_URL = '/api/users';


function UserSignIn() {
    const { setAuth } = useContext(AuthContext);
    //set the focus on the first input
    const userRef = useRef(null);
    //set the focus on the error
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(()  => {
        userRef.current.focus();
    }, [])

    //empty out if the error message if the user is updating their info
    useEffect(()  => {
        setErrorMessage('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(LOGIN_URL, JSON.stringify({emailAddress: username, password}),
                {
                    header: {'Content-Type' : 'application/json'},
                    withCredentials: true
                }
            );
            // console.log(JSON.stringify(response?.data));
            setAuth({username, password});
            setUsername('');
            setPassword('');
            setSuccess(true);
        } catch (error){
            console.log(error);
        }

    }

    const cancelLogin = (event)  => {
        event.preventDefault();
        navigate('/');
    }

  return (
    <React.Fragment>
        <div>Courses</div>
            <div className="form--centered">
                <p ref={errorRef} className= {errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                <h2>Sign In</h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Email Address</label>
                    <input
                        id="username"
                        name="username"
                        type="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
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
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={cancelLogin}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <a href="sign-up.html">sign up</a>!</p>
            </div>
    </React.Fragment>

  );
}

export default UserSignIn;