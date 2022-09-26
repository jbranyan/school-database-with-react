/* CourseDetail - This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route 
and rendering the course. The component also renders a "Delete Course" button that when clicked should send a DELETE request 
to the REST API's /api/courses/:id route in order to delete a course. This component also renders an "Update Course" button for navigating to the "Update Course" screen.*/

import React, {useState, useEffect} from 'react';
import {useParams, NavLink} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function CourseDetail(){
    const [course, setCourseDetail] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [userId, setUserId] = useState('');
    const [deleteCourseId, setDeleteCourse] = useState('');

    let { id } = useParams();


      useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/api/courses/${id}`);
            const courseData = await response.json();
            const {
                title,
                description,
                estimatedTime,
                materialsNeeded,
                userId
            } = courseData;

            setCourseDetail(courseData);
            setTitle(title);
            setDescription(description);
            setEstimatedTime(estimatedTime);
            setMaterialsNeeded(materialsNeeded);
            setUserId(userId);
        };
            fetchData();
        }, []);

        //TODO: Needs to be updated for authorized user and tested. 
        const deleteCourse = async () => {
            if(id){
                try{
                const response = await fetch(`http://localhost:5000/api/courses/${id}`, {method: "delete"});
                const courseData = await response.json();
                console.log('delete function');

                const result = {
                    course
                };
                setDeleteCourse(result);

                } catch (err) {
                    setDeleteCourse(err.message);
                }
            }
        }

    return(
        <React.Fragment>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                <nav>
                    <ul className="header--signedin">
                        <li>Welcome, Joe Smith!</li>
                        <li><a href="sign-out.html">Sign Out</a></li>
                    </ul>
                </nav>
            </div>
            <div className="actions--bar">
                <div className="wrap">
                    <NavLink exact to='/courses/:id/update' className='button'>Update Course</NavLink>
                    <button className="button" to='/' onClick={deleteCourse}>Delete Course</button>
                    <NavLink exact to='/' className="button button-secondary">Return to List</NavLink>
                </div>
            </div>
        <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{title}</h4>
                        {course.User ? <p>By {course.User.firstName} {course.User.lastName}</p> : <p></p>}

                        <ReactMarkdown children={description}/>
                    </div>
                    <div>
                        <h3 className="course--detail--title">Estimated Time</h3>
                        <p>{estimatedTime}</p>

                        <h3 className="course--detail--title">Materials Needed</h3>
                        <ul className="course--detail--list">
                            <ReactMarkdown children={materialsNeeded}/>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
        </React.Fragment>
    );
}

export default CourseDetail;