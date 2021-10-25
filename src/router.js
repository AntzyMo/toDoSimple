import React from 'react';
import { Router, Route, Switch, Link} from 'dva/router';
import Layout from './routes/layout/Layout.jsx';
import Index from './routes/page1';
import Inde2 from './routes/page2';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div>
      {/* <Link to="/page1">页面1</Link>
      <Link to="/page2">页面2</Link> */}

      <Switch>
        <Route path="/" exact component={Layout} />
        {/* <Route path="/page1"  component={Index} />
        <Route path="/page2"  component={Inde2} /> */}
      </Switch>
      </div>
    </Router>
  );
}

export default RouterConfig;
