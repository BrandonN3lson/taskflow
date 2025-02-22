import { NavBar } from "./components/NavBar";
import styles from "./App.module.css";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import "./api/axiosDefault";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import DashBoard from "./pages/Dashboard/DashBoard";
import AddTask from "./pages/Tasks/AddTask";
import { CategoryProvider } from "./context/CategoryContext";
import TaskDetail from "./pages/Tasks/TaskDetail";
import EditTask from "./pages/Tasks/EditTask";
import { About } from "./pages/About/About";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
