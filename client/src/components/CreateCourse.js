import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Form from './Form';

function CreateCourse({ context }){
    const [course, setCourse] = useState({
        title: " ",
        description: " ",
        estimatedTime: " ",
        materialsNeeded: " ",
    });
    const [errors, setErrorMessages] = useState([]);
    const userId = context.authenticatedUser.id;
    const history = useHistory();

    //If a user selects the cancel button, route them back to the course list
    function cancel(e) {
        history.push('/');
    }

    //Handles the submit functionality when a user selects the submit button
    const submit = () => {
        //Set the authenticated user name and password
        const username = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;

        const newCourse = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        }
        //Attempt to create the course for an authenticated user
        //If errors, capture the error messages to display
        context.data.createCourse(newCourse, username, password)
        .then(errors => {
            if(errors.length){
                setErrorMessages(errors);
                } else {
                    history.push('/');
            }
        })
        .catch( error => {
                console.log(error);
        })
    }

    //Capture user changes made on the form
    function handleChange(e){
        const { name, value } = e.target;
        setCourse(prevState => ({
            ...prevState,
            [name]: value
        }));
      };

    const {
        title,
        description,
        estimatedTime,
        materialsNeeded
    } = course

return(
    <div className="wrap">
            <h2>Create Course</h2>

            <Form
                errors={errors}
                cancel={cancel}
                submit={submit}
                submitButtonText="Create Course"
                elements={() => (
                    <React.Fragment>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="title">
                                    Course Title
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        value={title}
                                        onChange={handleChange}
                                    />
                                </label>

                                <p>By {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}</p>

                                <label htmlFor="description">
                                    Course Description
                                    <textarea
                                        id="description"
                                        name="description"
                                        onChange={handleChange}
                                        value={description}
                                    />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">
                                    Estimated Time
                                    <input
                                        id="estimatedTime"
                                        name="estimatedTime"
                                        type="text"
                                        onChange={handleChange}
                                        value={estimatedTime}
                                    />
                                </label>

                                <label htmlFor="materialsNeeded">
                                    Materials Needed
                                    <textarea 
                                        id="materialsNeeded" 
                                        name="materialsNeeded" 
                                        onChange={handleChange}
                                        value={materialsNeeded}
                                    />
                                </label>
                            </div>
                        </div>
                    </React.Fragment>
                )}/>
        </div>
    );
}

export default CreateCourse;
