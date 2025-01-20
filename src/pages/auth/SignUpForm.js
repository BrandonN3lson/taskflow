import React from "react";
import { Container, Button, Form } from "react-bootstrap";

import styles from "../../styles/SignInUpForm.module.css";
import BtnStyles from "../../styles/Button.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SignUpForm = () => {
    return (
        <Container className={` text-center ${styles.Container}`}>
            <Form className={styles.Form}>
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
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password1">
                    <Form.Label className="d-none">Password1</Form.Label>
                    <Form.Control
                        className={styles.FormInput}
                        type="password"
                        placeholder="Password"
                        name="password1"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password2">
                    <Form.Label className="d-none">Password2</Form.Label>
                    <Form.Control
                        className={styles.FormInput}
                        type="password"
                        placeholder="Re-enter Password"
                        name="password2"
                    />
                </Form.Group>

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
