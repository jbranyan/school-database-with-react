/* UpdateCourse - This component provides the "Update Course" screen by rendering a form that allows a user to
   update one of their existing courses. The component also renders an "Update Course" button that when clicked
   sends a PUT request to the REST API's /api/courses/:id route. This component also renders a "Cancel" button
   that returns the user to the "Course Detail" screen.*/

import React, { useState, useEffect } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Form from './Form';

function UpdateCourse({context}){

    const history = useHistory();

    const [course, setCourse] = useState({
        title: " ",
        description: " ",
        estimatedTime: " ",
        materialsNeeded: " ",
            user: {
                id: '',
                firstName: '',
                lastName: '',
                emailAddress: ''
            }
        });

    let { id } = useParams();
    const [ errors, setErrorMessages] = useState([]);

    useEffect(() => {
        //Fetch the course details to display on the update form
        context.data.getCourse(id)
        .then(data =>
            setCourse({
                course: data,
                title: data.title,
                description: data.description,
                estimatedTime: data.estimatedTime,
                materialsNeeded: data.materialsNeeded,
                user: {
                    id: data.User.id,
                    firstName: data.User.firstName,
                    lastName: data.User.lastName,
                    emailAddress: data.User.emailAddress
                }
            })
        )
        .catch(err => console.log(err));
        }, [id]);

    //If a user selects cancel, route them to the course details page
    const cancel = () => {
        history.push('/');
    }

    const submit = () => {
        //Capture the authenticated user name and password
        const username = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;

        //Capture the updated course details and user id
        const updatedCourse = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: course.user.id
        }
        //Attempt to update the course for the authenticated user
        context.data.updateCourse(updatedCourse, id, username, password)
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
            <h2>Update Course</h2>

            <Form
                errors={errors}
                cancel={cancel}
                submit={submit}
                submitButtonText="Update Course"
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
                                        onChange={handleChange}
                                        value={title}
                                    />
                                </label>
                                <p>By {course.user?.firstName} {course.user?.lastName}</p>

                                <label htmlFor="description">
                                    Course Description
                                    <textarea
                                        id="description"
                                        name="description"
                                        type="text"
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
                                        type="text"
                                        value={materialsNeeded}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </React.Fragment>
            )} />

        </div>
    );
};

export default UpdateCourse;