import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EventPage from "./pages/EventPage.jsx";
import CanidatePage from "./pages/CanidatePage.jsx";

import { Container } from "@material-ui/core";

export default function Routes() {
  return (
    <Container maxWidth="sm">
      <Router>
        <Switch>
          <Route exact path="/auth">
            <AuthPage />
          </Route>
          <Route exact path="/auth/register">
            <RegisterPage />
          </Route>
          <Route exact path="/auth/login">
            <LoginPage />
          </Route>
          <Route path="/events/:eventId">
            <EventPage />
          </Route>
          <Route path="/canidates/:canidateId">
            <CanidatePage />
          </Route>
          <Route path="*">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}
