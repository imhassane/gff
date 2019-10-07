import React from 'react';
import { Route, Switch } from "react-router-dom";

import ROUTES from "./routes";

import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min';
import 'uikit/dist/js/uikit-icons.min';

import WithDashboard from "./hoc/Dashboard";

import Login from './containers/login';
import Register from './containers/register';
import { Home } from "./components/home";
import { CommentsList } from './containers/comment';
import { UserList, UserProfile, ChangePassword, ManageUser } from './containers/user';
import { CreateCategory, CategoryList } from './containers/category';
import { CreatePost, PostList, UpdatePost } from "./containers/post";
import { TagList, CreateTag } from "./containers/tag";
import { DocumentaryList, CreateDocumentary } from './containers/documentaries';
import { CreateNewsletter, NewsletterList, NewsletterDetail } from './containers/newsletter';
import { ReaderList } from './containers/reader';
import { FeedbackList } from './containers/feedback';
import { PageList, CreatePage, PageDetail, PageUpdate, PageDelete } from './containers/page';
import { NotificationList } from './containers/notification';
import { UserPictureUpdate } from './containers/upload';
import { MenuPage } from './containers/menu';

function Main() {
  return (
    <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Route exact path={ROUTES.REGISTER} component={Register} />

          <Route exact path={ROUTES.ME} component={ WithDashboard(UserProfile) } />
          <Route exact path={ROUTES.CHANGE_PICTURE} component={ WithDashboard(UserPictureUpdate) } />
          <Route exact path={ROUTES.CHANGE_PASSWORD} component={ WithDashboard(ChangePassword) } />
          <Route exact path={`${ROUTES.USER}:_id`} component={ WithDashboard(ManageUser) } />

          <Route exact path={ROUTES.COMMENTS} component={ WithDashboard(CommentsList) } />

          <Route exact path={ROUTES.PAGES} component={ WithDashboard(PageList) } />
          <Route exact path={ROUTES.MANAGE_MENU} component={ WithDashboard(MenuPage) } />
          <Route exact path={ROUTES.CREATE_PAGE} component={ WithDashboard(CreatePage) } />
          <Route exact path={`${ROUTES.PAGE_DETAIL}:_id`} component={ WithDashboard(PageDetail) } />
          <Route exact path={`${ROUTES.PAGE_UPDATE}:_id`} component={ WithDashboard(PageUpdate) } />
          <Route exact path={`${ROUTES.PAGE_DELETE}:_id`} component={ WithDashboard(PageDelete) } />
          
          <Route exact path={ROUTES.USERS} component={ WithDashboard(UserList) } />

          <Route exact path={ROUTES.CREATE_CATEGORY} component={ WithDashboard(CreateCategory) } />
          <Route exact path={ROUTES.CATEGORIES} component={ WithDashboard(CategoryList) } />

          <Route exact path={ROUTES.CREATE_POST} component={ WithDashboard(CreatePost) } />
          <Route exact path={`${ROUTES.UPDATE_POST}:_id`} component={ WithDashboard(UpdatePost) } />
          <Route exact path={ROUTES.POSTS} component={ WithDashboard(PostList) } />

          <Route exact path={ROUTES.TAGS} component={ WithDashboard(TagList) } />
          <Route exact path={ROUTES.CREATE_TAG} component={ WithDashboard(CreateTag) } />

          <Route exact path={ROUTES.DOCUMENTARIES} component={ WithDashboard(DocumentaryList) } />
          <Route exact path={ROUTES.CREATE_DOCUMENTARY} component={ WithDashboard(CreateDocumentary)} />

          <Route exact path={ROUTES.LIST_NEWSLETTER} component={ WithDashboard(NewsletterList) } />
          <Route exact path={`${ROUTES.DETAIL_NEWSLETTER}:_id`} component={ WithDashboard(NewsletterDetail) } />
          <Route exact path={ROUTES.CREATE_NEWSLETTER} component={ WithDashboard(CreateNewsletter) } />
          <Route exact path={ROUTES.READERS} component={ WithDashboard(ReaderList) } />
          <Route exact path={ROUTES.MESSAGES} component={ WithDashboard(FeedbackList) } />

          <Route exact path={ROUTES.LIST_NOTIFICATION} component={ WithDashboard(NotificationList) } />
          <Route exact path={`${ROUTES.DETAIL_NOTIFICATION}:_id`} component={ WithDashboard(NotificationList) } />


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
