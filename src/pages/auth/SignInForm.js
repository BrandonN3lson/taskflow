import React from "react";
import { Container, Button, Form } from "react-bootstrap";
import styles from "../../styles/SignInUpForm.module.css";
import BtnStyles from "../../styles/Button.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SignInForm = () => {
    return (
        <Container className={` text-center ${styles.Container}`}>
            <Form className={styles.Form}>
                <Form.Text className={`text-center ${styles.FormText}`}>
                    <h1>Sign In</h1>
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

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="d-none">Password</Form.Label>
                    <Form.Control
                        className={styles.FormInput}
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                </Form.Group>

                <Container>
                    <Form.Text className="mb-2">
                    Don't have an account?
                    <Link className={styles.Link} to="/signup">
                      <span> Sign up</span>
                    </Link>
                    </Form.Text>
                </Container>

                <Button className={BtnStyles.Button} type="submit">
                    Log in
                </Button>
            </Form>
        </Container>
    );
};

export default SignInForm;
