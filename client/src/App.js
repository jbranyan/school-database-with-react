
import React, {useState} from 'react';
import './styles/reset.css';
import './styles/global.css';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes } from 'react-router-dom';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
//import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';
// import UpdateCourse from './components/UpdateCourse';
// import Header from './components/Header';
import UserSignIn from './components/UserSignIn';
// import UserSignOut from './components/UserSignOut';
// import UserSignUp from './components/UserSignUp';


function App() {

  return (
    <Router>
    <div>
      <Routes>
        <Route exact path="/" element=<Courses/> />
        <Route exact path="/courses/:id" element=<CourseDetail/> />
        {/* <Route exact path="/courses/update/:id" element=<UpdateCourse/> /> */}
        <Route exact path="/courses/create" element=<CreateCourse/> />
        <Route exact path="/UserSignIn" element=<UserSignIn/> />
        {/* <Route exact path="/UserSignUp" element=<UserSignUp/> />
        <Route exact path="/UserSignOut" element=<UserSignOut/> /> */}
      </Routes>
    </div>
    </Router>
  );
}

export default App;
