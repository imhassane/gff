import React from 'react';
import { Route, Switch } from "react-router-dom";

import ROUTES from "./routes";

import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min';
import 'uikit/dist/js/uikit-icons.min';

import WithDashboard from "./hoc/Dashboard";

import Login from './containers/login';
import Register from './containers/register';
import { CommentsList } from './containers/comment';
import { UserList } from './containers/user';
import { CreateCategory, CategoryList } from './containers/category';
import { CreatePost, PostList, UpdatePost } from "./containers/post";
import { TagList, CreateTag } from "./containers/tag";
import { DocumentaryList, CreateDocumentary } from './containers/documentaries';
import { CreateNewsletter, NewsletterList, NewsletterDetail } from './containers/newsletter';
import { ReaderList } from './containers/reader';
import { FeedbackList } from './containers/feedback';

function Main() {
  return (
    <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.REGISTER} component={Register} />

          <Route path={ROUTES.COMMENTS} component={ WithDashboard(CommentsList) } />

          <Route path={ROUTES.USERS} component={ WithDashboard(UserList) } />

          <Route path={ROUTES.CREATE_CATEGORY} component={ WithDashboard(CreateCategory) } />
          <Route path={ROUTES.CATEGORIES} component={ WithDashboard(CategoryList) } />

          <Route path={ROUTES.CREATE_POST} component={ WithDashboard(CreatePost) } />
          <Route path={`${ROUTES.UPDATE_POST}:_id`} component={ WithDashboard(UpdatePost) } />
          <Route path={ROUTES.POSTS} component={ WithDashboard(PostList) } />

          <Route path={ROUTES.TAGS} component={ WithDashboard(TagList) } />
          <Route path={ROUTES.CREATE_TAG} component={ WithDashboard(CreateTag) } />

          <Route path={ROUTES.DOCUMENTARIES} component={ WithDashboard(DocumentaryList) } />
          <Route path={ROUTES.CREATE_DOCUMENTARY} component={ WithDashboard(CreateDocumentary)} />

          <Route path={ROUTES.LIST_NEWSLETTER} component={ WithDashboard(NewsletterList) } />
          <Route path={`${ROUTES.DETAIL_NEWSLETTER}:_id`} component={ WithDashboard(NewsletterDetail) } />
          <Route path={ROUTES.CREATE_NEWSLETTER} component={ WithDashboard(CreateNewsletter) } />
          <Route path={ROUTES.READERS} component={ WithDashboard(ReaderList) } />
          <Route path={ROUTES.MESSAGES} component={ WithDashboard(FeedbackList) } />

        </Switch>
  );
}

function App() {
  return (
    <div className="uk-container uk-container-expand" style={{ padding: 0, margin: 0 }}>
      <main style={{ minHeight: '100%', margin: 0, padding: 0 }}>
        <Main />
      </main>
    </div>
  );
}

export default App;
