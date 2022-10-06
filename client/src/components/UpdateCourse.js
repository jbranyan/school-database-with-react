// UpdateCourse - This component provides the "Update Course" screen by rendering a form that allows a user to 
// update one of their existing courses. The component also renders an "Update Course" button that when clicked 
// sends a PUT request to the REST API's /api/courses/:id route. This component also renders a "Cancel" button 
// that returns the user to the "Course Detail" screen.


import React, { useState, useEffect } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Form from './Form';

function UpdateCourse({context}){

    const history = useHistory();
    const username = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;

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
                    lastName: data.User.LastName,
                    emailAddress: data.User.emailAddress
                }
            })
        )
        .catch(err => console.log(err));
        }, [id]);

    const cancel = () => {
        history.push('/');
    }

    const submit = () => {

        const updatedCourse = {
            title,
            description,
            estimatedTime,
            materialsNeeded
        }

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
                history.push('/error');
        })

    }

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
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitButtonText="Update Course"
                elements={() => (
                    <React.Fragment>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">
                                    Course Title
                                    <input 
                                        id="courseTitle"
                                        name="courseTitle"
                                        type="text"
                                        onChange={handleChange}
                                        value={title}
                                    />
                                </label>
                                <p>By {course.firstName} {course.lastName}</p>

                                <label htmlFor="courseDescription">
                                    Course Description
                                    <textarea
                                        id="courseDescription"
                                        name="courseDescription"
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