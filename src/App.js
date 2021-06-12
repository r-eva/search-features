import './App.css';
import { Router, Switch, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Search from './pages/Search'
import History from './pages/History'

function App() {
  return (
    <Router history={History}>
      <Switch>
        <Route path='/' component={Landing} exact/>
        <Route path='/search' component={Search} exact />
      </Switch>
    </Router>
  );
}

export default App;
