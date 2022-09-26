import React, {useEffect, useState} from 'react';
import {useParams, NavLink, renderMatches} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from "react-router-dom";

//TODO: Update User Name


function CreateCourse(){
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errorMessage, setErrorMessages] = useState([]);
    

    const navigate = useNavigate();

    function cancelCourseCreation(event) {
        event.preventDefault();
        navigate('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const course = {courseTitle, courseDescription, estimatedTime, materialsNeeded}
        fetch("http://localhost:5000/api/courses", {
            method: 'POST',
            headers: {"Content-type": "application/json" },
            body: JSON.stringify(course)
        })
        .then(res => {
            console.log(res.ok);
            if(!res.ok){
                if(res.status === 400){
                    console.log('400');
                    setErrorMessages(res.message);
                } else if(res.status === 401){
                    console.log('401');
                    //TODO: redirect to sign in page
                } else {
                    console.log('else');
                    //TODO:redirect to error page
                }
            }
        })
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
        <div className="wrap">
            <h2>Create Course</h2>

                { errorMessage.length > 0 &&
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {Array.from(errorMessage).map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                    </div>
                }


            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input
                            id="courseTitle"
                            name="courseTitle"
                            type="text"
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                        />


                        {/* Update with logged in user's name  */}
                        <p>By Joe Smith</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea
                            id="courseDescription"
                            name="courseDescription"
                            value={courseDescription}
                            onChange={(e) => setCourseDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            value={estimatedTime}
                            onChange={(e) => setEstimatedTime(e.target.value)}
                        />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea 
                            id="materialsNeeded" 
                            name="materialsNeeded" 
                            value={materialsNeeded}
                            onChange={(e) => setMaterialsNeeded(e.target.value)}
                            />
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={cancelCourseCreation}>Cancel</button>
            </form>
        </div>
    </React.Fragment>

);
}

export default CreateCourse;
