import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";

import styles from "../styles/NavBar.module.css";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../context/CurrentUserContext";
import axios from "axios";
import { removeTokenTimestamp } from "../utils/utils";
import ToggleOutside from "../hooks/ToggleOutside";

export const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const {expanded, setExpanded, ref} = ToggleOutside();

  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      history.push("/signin");
      removeTokenTimestamp();
    } catch (error) {
      console.log(error);
    }
  };

  const loggedIn = (
    <>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/"
      >
        Dashboard
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/add-task"
      >
        Add Task
      </NavLink>

      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        Log out
      </NavLink>
    </>
  );
  const loggedOut = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        Sign up
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        Sign in
      </NavLink>
    </>
  );
  return (
    <Navbar
      expanded={expanded}
      expand="md"
      fixed="top"
      className={`px-3 ${styles.NavBar}`}
    >
      <Container fluid width="100%">
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="navbar"
          className="navbar-dark"
        />
        <div>
          <Nav className="text-center d-none d-md-flex">
            {currentUser ? loggedIn : loggedOut}
          </Nav>
        </div>

        <div>
          <NavLink to="/" className={`mx-auto ${styles.Title}`}>
            TaskFlow
          </NavLink>
        </div>

        <div>
          <Navbar.Text>
            {currentUser ? (
              <p className={styles.User}>{currentUser?.username}</p>
            ) : (
              <p className={styles.User}>please log in</p>
            )}
          </Navbar.Text>
        </div>
      </Container>

      <Navbar.Collapse id="navbar">
        <Nav className=" py-3 text-left d-md-none">
          {currentUser ? loggedIn : loggedOut}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
