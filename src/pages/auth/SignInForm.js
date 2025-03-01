import React, { useState } from "react";
import { toast } from 'react-toastify';
import { Container, Button, Form, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

import styles from "../../styles/Form.module.css";
import BtnStyles from "../../styles/Button.module.css";
import ContainerStyles from "../../styles/Container.module.css";

import { useSetCurrentUser } from "../../context/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefault";
import { setTokeTimestamp } from "../../utils/utils";
import { useRedirect } from "../../hooks/useRedirect";

/**
 * SignInForm
 * 
 * This component renders a sign-in form that allows users to log in.
 * It manages form input, handles validation, submits login data to the server,
 * and provides error messages if login fails. On successful login, it updates the user state
 * and redirects the user to the previous page.
 *
 * Features:
 * - Handles user authentication through API submission.
 * - Displays error messages for incorrect login attempts.
 * - Redirects users upon successful authentication.
 * - Uses React Bootstrap for form styling.
 * - Provides toast notifications for user feedback.
 *
 * External Dependencies:
 * - React Bootstrap (Container, Button, Form, Alert) for UI components.
 * - React Router (useHistory, Link) for navigation.
 * - react-toastify for user notifications.
 * - Custom styles from Form.module.css, Button.module.css, and Container.module.css.
 *
 * @returns {JSX.Element} The sign-in form page
 */
const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const history = useHistory();

  /**
   * Handles input change in the sign-in form fields.
   * 
   * @param {Object} e - Event object containing input field changes.
   */
  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handles form submission for signing in a user.
   * 
   * @param {Object} e - Event object for form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosRes.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokeTimestamp(data);
      history.goBack();
      toast.success(`Welcome ${data.user.username}`)
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        username: !username ? ["Username cannot be empty"] : [],
        password: error?.response.data.password,
      }));
      toast.error("Something went wrong, please try again!")
    }
  };

  const { username, password } = signInData;

  return (
    <Container className={` text-center ${ContainerStyles.Container}`}>
      <Form className={styles.Form} onSubmit={handleSubmit}>
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
            value={username}
            onChange={handleChange}
            onFocus={() =>
              setErrors((prevState) => ({ ...prevState, username: [] }))
            }
          />
        </Form.Group>
        {errors.username?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="d-none">Password</Form.Label>
          <Form.Control
            className={styles.FormInput}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            onFocus={() =>
              setErrors((prevState) => ({ ...prevState, password: [] }))
            }
          />
        </Form.Group>
        {errors.password?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

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
