import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import styles from "../styles/NavBar.module.css";
import { useCurrentUser } from "../context/CurrentUserContext";

export const NavBar = () => {
    const currentUser = useCurrentUser();
    const loggedIn = <>{currentUser?.username}</>;
    return (
        <Navbar expand="md" fixed="top" className={`px-3 ${styles.NavBar}`}>
            <Container fluid width="100%">
                <Navbar.Toggle aria-controls="navbar" className="navbar-dark" />
                <div>
                    <Nav className="text-center d-none d-md-flex">
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
                            to="/tasks"
                        >
                            Tasks
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
                        <NavLink
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                            to="/logout"
                        >
                            Log out
                        </NavLink>
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
                            loggedIn
                        ) : (
                            <p className={styles.User}>please log in</p>
                        )}
                    </Navbar.Text>
                </div>
            </Container>

            <Navbar.Collapse id="navbar">
                <Nav className=" py-3 text-left d-md-none">
                    <NavLink
                        exact
                        className={styles.ToggleNavLinks}
                        activeClassName={styles.Active}
                        to="/"
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        className={styles.ToggleNavLinks}
                        activeClassName={styles.Active}
                        to="/tasks"
                    >
                        Tasks
                    </NavLink>
                    <NavLink
                        className={styles.ToggleNavLinks}
                        activeClassName={styles.Active}
                        to="/signup"
                    >
                        Sign up
                    </NavLink>
                    <NavLink
                        className={styles.ToggleNavLinks}
                        activeClassName={styles.Active}
                        to="/signin"
                    >
                        Sign in
                    </NavLink>
                    <NavLink
                        className={styles.ToggleNavLinks}
                        activeClassName={styles.Active}
                        to="/logout"
                    >
                        Log out
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
