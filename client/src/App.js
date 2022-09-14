/*TO Dos -Next Step
CourseDetail - This component provides the "Course Detail" screen by retrieving the detail
for a course from the REST API's /api/courses/:id route and rendering the course. The component
also renders a "Delete Course" button that when clicked should send a DELETE request to the
REST API's /api/courses/:id route in order to delete a course. This component also renders
an "Update Course" button for navigating to the "Update Course" screen.
*/

import React from 'react';
import './styles/reset.css';
import './styles/global.css';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes } from 'react-router-dom';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
// import CreateCourse from './components/CreateCourse';
// import Header from './components/Header';
// import UpdateCourse from './components/UpdateCourse';
// import UserSignIn from './components/UserSignIn';
// import UserSignOut from './components/UserSignOut';
// import UserSignUp from './components/UserSignUp';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route exact path="/" element=<Courses/> />
        <Route exact path="/courses/:id" element={<CourseDetail/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
