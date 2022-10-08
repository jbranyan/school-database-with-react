/*Courses - This component provides the "Courses" screen by retrieving the list of courses from the
REST API's /api/courses route and rendering a list of courses. Each course needs to link to its
respective "Course Detail" screen. This component also renders a link to the "Create Course" screen. */

import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';

function Courses({context}){
    let [courses, setCourses] = useState([]);

    useEffect(() => {
        //Fetch the courses from the database
        context.data.getCourses()
        .then(data => setCourses(data))
        .catch(err => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    return(
        <div className="wrap main--grid">
            <React.Fragment>
            {courses.map(course =>
                <NavLink to={`/courses/${course.id}`} key={course.id} className="course--module course--link">
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </NavLink>
            )}
                <NavLink to="courses/create" className="course--module course--add--module">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </NavLink>
            </React.Fragment>
        </div>
    );
}

export default Courses;