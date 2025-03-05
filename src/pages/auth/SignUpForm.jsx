import React, { useState } from "react";
import { toast } from 'react-toastify';

import { Container, Button, Form, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

import styles from "../../styles/Form.module.css";
import ContainerStyles from '../../styles/Container.module.css'
import BtnStyles from "../../styles/Button.module.css";
import { useRedirect } from "../../hooks/useRedirect";

/**
 * SignUpForm
 * 
 * This component renders a sign-up form that allows users to create an account.
 * It manages form input, handles validation, submits registration data to the server,
 * and provides error messages if registration fails. On successful registration, 
 * users are redirected to the sign-in page.
 *
 * Features:
 * - Handles user registration through API submission.
 * - Displays error messages for invalid input fields.
 * - Redirects users to the sign-in page upon successful registration.
 * - Uses React Bootstrap for form styling.
 * - Provides toast notifications for user feedback.
 *
 * External Dependencies:
 * - React Bootstrap (Container, Button, Form, Alert) for UI components.
 * - React Router (useHistory, Link) for navigation.
 * - react-toastify for user notifications.
 * - Custom styles from Form.module.css, Button.module.css, and Container.module.css.
 *
 * @returns {JSX.Element} The sign-up form page.
 */
const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    })
    const [errors, setErrors] = useState({});
    const {username, password1, password2} = signUpData;
    const history = useHistory()
    useRedirect('loggedIn')

    /**
     * Handles input change in the sign-up form fields.
     * 
     * @param {Object} e - Event object containing input field changes.
     */
    const handleChange = (e) => {
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value,
        })
    }

    /**
     * Handles form submission for signing up a user.
     * Sends registration data to the server and redirects to sign-in on success.
     * Displays error messages if the registration fails.
     * 
     * @param {Object} e - Event object for form submission.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signUpData)
            history.push('/signin')
            toast.success("You are now registered! please sign in")
            
        } catch (error) {
            setErrors(error.response?.data)
            toast.error("Something went wrong please try again!")
        }
    }

    return (
        <Container className={` text-center ${ContainerStyles.Container}`}>
            <Form className={styles.Form} onSubmit={handleSubmit}>
                <div className={`text-center ${styles.FormText}`}>
                    <h1>Sign Up</h1>
                </div>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label className="d-none">Username</Form.Label>
                    <Form.Control
                        className={styles.FormInput}
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        onFocus={() => setErrors((prevState) => ({...prevState, username: []}))}
                    />
                </Form.Group>
                {errors.username?.map((message, idx) => 
                    <Alert variant="warning" key={idx} >{message}</Alert>
                )}

                <Form.Group className="mb-3" controlId="password1">
                    <Form.Label className="d-none">Password1</Form.Label>
                    <Form.Control
                        className={styles.FormInput}
                        type="password"
                        placeholder="Password"
                        name="password1"
                        value={password1}
                        onChange={handleChange}
                        onFocus={() => setErrors((prevState) => ({...prevState, password1: []}))}
                    />
                </Form.Group>
                {errors.password1?.map((message, idx) => 
                    <Alert variant="warning" key={idx} >{message}</Alert>
                )}

                <Form.Group className="mb-3" controlId="password2">
                    <Form.Label className="d-none">Password2</Form.Label>
                    <Form.Control
                        className={styles.FormInput}
                        type="password"
                        placeholder="Re-enter Password"
                        name="password2"
                        value={password2}
                        onChange={handleChange}
                        onFocus={() => setErrors((prevState) => ({...prevState, password2: []}))}
                    />
                </Form.Group>
                {errors.password2?.map((message, idx) => 
                    <Alert variant="warning" key={idx} >{message}</Alert>
                )}

                <Container>
                    <Form.Text className="mb-2">
                    Already have an account?
                    <Link className={styles.Link} to="/signin">
                      <span> Sign in</span>
                    </Link>
                    </Form.Text>
                </Container>

                <Button className={BtnStyles.Button} type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default SignUpForm;
