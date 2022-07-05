import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Auth from "./ui/Auth";
import User from "./ui/User";
import Front from "./ui/Front";

// feat: 1. UI in Adapter - Page Route
function App() {
  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/user' component={User} />
          <Route path='/' component={Front} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
