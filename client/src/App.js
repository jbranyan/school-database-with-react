import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  let [courses, setCourses] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")

    .then(res => res.json())
    .then(responseData => setCourses(responseData))
  }, [])

  return (
    <div className="App">
       {courses}
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
