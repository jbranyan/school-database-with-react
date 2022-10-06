import React, {useState} from 'react';
import { useHistory } from "react-router-dom";


function CreateCourse({ context }){
    const [title, setCourseTitle] = useState('');
    const [description, setCourseDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errorMessage, setErrorMessages] = useState([]);
    const userId = context.authenticatedUser.id;
    const history = useHistory();

    function cancelCourseCreation(e) {
        e.preventDefault();
        history.push('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;

        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        }


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
                            id="title"
                            name="title"
                            type="text"
                            value={title}
                            onChange={(e) => setCourseTitle(e.target.value)}
                        />


                        {/* Update with logged in user's name  */}
                        <p>By {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
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
