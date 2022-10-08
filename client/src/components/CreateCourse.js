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

    function cancel(e) {
        history.push('/');
    }

    const submit = () => {

        const username = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;

        const newCourse = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        }

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
