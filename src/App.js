import { NavBar } from "./components/NavBar";
import styles from "./App.module.css";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import "./api/axiosDefault";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import DashBoard from "./pages/auth/Dashboard/DashBoard";
import AddTask from "./pages/Tasks/AddTask";
import { CategoryProvider } from "./context/CategoryContext";
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
                            path="/tasks"
                            render={() => <h1>Tasks</h1>}
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
                            path="/add-task"
                            render={() => <AddTask />}
                        />
                        <Route
                            exact
                            path="/logout"
                            render={() => <h1>Log out</h1>}
                        />
                        <Route render={() => <p>Page not found!</p>} />
                    </Switch>
                </Container>
            </div>
        </CategoryProvider>
    );
}

export default App;
