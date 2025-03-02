import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer } from 'react-toastify';
import { Container } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';

import styles from "./App.module.css";

import "./api/axiosDefault";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import DashBoard from "./pages/Dashboard/DashBoard";
import AddTask from "./pages/Tasks/AddTask";
import TaskDetail from "./pages/Tasks/TaskDetail";
import EditTask from "./pages/Tasks/EditTask";
import { NavBar } from "./components/NavBar";
import { CategoryProvider } from "./context/CategoryContext";
import { About } from "./pages/About/About";

/**
* App Component
* 
* The main application component that sets up routing, context providers, 
* navigation and notifications.
* 
* Features:
* - Wraps the app in `CategoryProvider` to manage category state.
* - Displays the `NavBar` across all pages.
* - Uses `react-toastify` for success/error notifications.
* - Defines routes for authentication, task management, and an About page.
* - Handles a "Page not found" fallback for undefined routes.
* 
* External Dependencies:
* - React Router (`Switch`, `Route`) for navigation.
* - `ToastContainer` from `react-toastify` for notifications.
* - `Container` from `react-bootstrap` for layout styling.
* - Global styles from `App.module.css`.
* - Task Flow API configuration (`./api/axiosDefault`).
* 
* @returns {JSX.Element} The main application layout with routing.
*/
function App() {
    return (
        <CategoryProvider>
            <div className={styles.App}>
                <NavBar />
                <Container className={styles.Main}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <h1>
                                    <DashBoard />
                                </h1>
                            )}
                        />
                        <Route
                            exact
                            path="/signin"
                            render={() => <SignInForm />}
                        />
                        <Route
                            exact
                            path="/signup"
                            render={() => <SignUpForm />}
                        />
                        <Route
                            exact
                            path="/about"
                            render={() => <About/>}
                        />
                        <Route
                            exact
                            path="/add-task"
                            render={() => <AddTask />}
                        />
                        <Route
                            exact
                            component={TaskDetail}
                            path="/task-detail/:taskId"
                            render={() =><TaskDetail/>}
                        />
                        <Route
                            exact
                            path="/tasks/:taskId/edit"
                            render={() => <EditTask/>}
                        />
                        
                        <Route render={() => <Container fuid className="text-center"><p className={styles.PageNotFound}>Page not found!</p></Container>} />
                    </Switch>
                </Container>
            </div>
            <ToastContainer />
        </CategoryProvider>
    );
}

export default App;
