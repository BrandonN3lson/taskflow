import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

import styles from "../styles/NavBar.module.css";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../context/CurrentUserContext";
import axios from "axios";
import { removeTokenTimestamp } from "../utils/utils";
import ToggleOutside from "../hooks/ToggleOutside";
import { useCategories } from "../context/CategoryContext";

export const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();
  const { categories } = useCategories();

  const { expanded, setExpanded, ref } = ToggleOutside();

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

  const handleAddTaskClick = (event) => {
    if (!categories || categories.results.length === 0) {
      event.preventDefault();
      toast.error("You must create a category before adding a task!");
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
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/about"
      >
        About
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/add-task"
        onClick={handleAddTaskClick}
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
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/about"
      >
        About
      </NavLink>
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
