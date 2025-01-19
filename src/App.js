
import { NavBar } from './components/NavBar';
import styles from './App.module.css'
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <div className={styles.App}>
      <NavBar/>
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={()=><h1>Dashboard</h1> } />
          <Route exact path="/tasks" render={()=><h1>Tasks</h1> } />
          <Route exact path="/signin" render={()=><h1>Sign in</h1> } />
          <Route exact path="/signup" render={()=><h1>Sign up</h1> } />
          <Route exact path="/logout" render={()=><h1>Log out</h1> } />
          <Route render={()=><p>Page not found!</p> } />
        </Switch>
        
        

      </Container>
      
    </div>
  );
}

export default App;