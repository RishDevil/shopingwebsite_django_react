import React from "react";
import { Route } from "react-router-dom";
import ArrayList from "./ArrayList";
import ArticleDetail from "./ArticleDetail";
import login from "./login";
import logout from "./logout";
import signup from "./signup";
import cart from "./cart";

const BaseRouter = () => {
  return (
    <div>
      <Route exact path="/" component={ArrayList} />
      <Route exact path="/:articleID" component={ArticleDetail} />
      <Route exact path="/article/registration" component={login} />
      <Route exact path="/article/logout" component={logout} />
      <Route exact path="/article/signup/" component={signup} />
      <Route exact path="/article/cart" component={cart} />
    </div>
  );
};

export default BaseRouter;
