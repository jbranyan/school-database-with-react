/*UserSignIn - This component provides the "Sign In" screen by rendering a form that allows a user to sign in
  using their existing account information. The component also renders a "Sign In" button that when clicked signs
  in the user and a "Cancel" button that returns the user to the default route (i.e. the list of courses).
*/

 import { useRef } from 'react';
 import { Link, useHistory } from 'react-router-dom';

 const UserSignIn = ({context}) => {
   const emailAddress = useRef(null);
   const password = useRef(null);
   const history = useHistory();

   //Pass the credentials entered by the user, verify they are correct and sign in
   const handleSubmit = async(e) => {
     e.preventDefault();
     await context.actions.signIn(
       emailAddress.current.value,
       password.current.value
     );
     const { from } = history.location.state || { from: { pathname: '/'} };
     history.push(from.pathname);
   }

   return (
     <main>
       <div className="form--centered">
         <h2>Sign In</h2>
         <form onSubmit={handleSubmit}>
           <label htmlFor="emailAddress">Email Address</label>
           <input id="emailAddress" name="emailAddress" type="email" defaultValue="" ref={emailAddress} />
           <label htmlFor="password">Password</label>
           <input id="password" name="password" type="password" defaultValue="" ref={password} />
           <button className="button" type="submit">Sign In</button>
           <Link className="button button-secondary" to="/">Cancel</Link>
         </form>
         <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
       </div>
     </main>
   )
 }
 export default UserSignIn