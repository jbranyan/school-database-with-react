import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import { useHistory } from "react-router-dom";

//TODO: Update User Name


function CreateCourse({context}){
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errorMessage, setErrorMessages] = useState([]);
    const userId = context.authenticatedUser.userId;
    const history = useHistory();

    function cancelCourseCreation(e) {
        e.preventDefault();
        history.push('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const course = {
            courseTitle,
            courseDescription,
            estimatedTime,
            materialsNeeded,
            userId
        }

        console.log('course ' + JSON.stringify(context.authenticatedUser));
        const username = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;

        context.data.createCourse(course, username, password)
        .then(errors => {
            if(errors.length){
                setErrorMessages(errors);
                } else {
                    history.push('/');
            }
        })
        .catch( error => {
                console.log(error);
                history.push('/error');
        })
    }


return(
    <React.Fragment>
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
                        <p>By {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}</p>

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
