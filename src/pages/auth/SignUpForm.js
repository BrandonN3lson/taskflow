import React, { useState } from "react";
import { toast } from 'react-toastify';

import { Container, Button, Form, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

import styles from "../../styles/Form.module.css";
import ContainerStyles from '../../styles/Container.module.css'
import BtnStyles from "../../styles/Button.module.css";
import { useRedirect } from "../../hooks/useRedirect";

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

    const handleChange = (e) => {
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value,
        })
    }

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
                <Form.Text className={`text-center ${styles.FormText}`}>
                    <h1>Sign Up</h1>
                </Form.Text>
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
