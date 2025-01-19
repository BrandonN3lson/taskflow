import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import styles from "../styles/NavBar.module.css";

export const NavBar = () => {
    return (
        <Navbar

            expand="md"
            fixed="top"
            className={`px-3 ${styles.NavBar}`}
        >
            <Container fluid width="100%">
                <Navbar.Toggle aria-controls="navbar" className="navbar-dark"/>
                <div>
                    <Nav className="text-center d-none d-md-flex">
                        <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">
                            Dashboard
                        </NavLink>
                        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/tasks">
                            Tasks
                        </NavLink>
                        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">
                            Sign up
                        </NavLink>
                        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">
                            Sign in
                        </NavLink>
                        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/logout">
                            Log out
                        </NavLink>
                    </Nav>
                </div>

                <div>
                    <NavLink to="/">
                        <Navbar.Brand
                            className={`mx-auto ${styles.Title}`}
                            href="#home"
                        >
                            TaskFlow
                        </Navbar.Brand>
                    </NavLink>
                </div>

                <div>
                    <Navbar.Text>
                    <p className={styles.User}>User Logged In</p>
                    </Navbar.Text>
                </div>
            </Container>

            <Navbar.Collapse id="navbar">
                <Nav className=" py-3 text-left d-md-none">
                    <NavLink exact className={styles.ToggleNavLinks} activeClassName={styles.Active} to="/">
                        Dashboard
                    </NavLink>
                    <NavLink className={styles.ToggleNavLinks} activeClassName={styles.Active} to="/tasks">
                        Tasks
                    </NavLink>
                    <NavLink className={styles.ToggleNavLinks} activeClassName={styles.Active} to="/signup">
                        Sign up
                    </NavLink>
                    <NavLink className={styles.ToggleNavLinks} activeClassName={styles.Active} to="/signin">
                        Sign in
                    </NavLink>
                    <NavLink className={styles.ToggleNavLinks} activeClassName={styles.Active} to="/logout">
                        Log out
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
