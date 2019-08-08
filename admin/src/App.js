import React from 'react';
import { Route, Switch } from "react-router-dom";

import ROUTES from "./routes";

import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min';

import WithDashboard from "./hoc/Dashboard";

import Login from './containers/login';
import Register from './containers/register';
import Comment from './containers/comment';
import User from './containers/user';
import { CreateCategory, CategoryList } from './containers/category';

function App() {
  return (
    <div className="uk-container uk-container-expand" style={{ padding: 0 }}>
      <main>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.REGISTER} component={Register} />

          <Route path={ROUTES.COMMENTS} component={WithDashboard(Comment)} />

          <Route path={ROUTES.USERS} component={ WithDashboard(User) } />

          <Route path={ROUTES.CREATE_CATEGORY} component={ WithDashboard(CreateCategory) } />
          <Route path={ROUTES.CATEGORIES} component={ WithDashboard(CategoryList) } />

        </Switch>
      </main>
    </div>
  );
}

export default App;
