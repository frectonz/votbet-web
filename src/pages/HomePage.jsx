import React, { useState } from "react";
import NavBar from "../components/NavBar/index.jsx";
import { TabContext, TabPanel } from "@material-ui/lab";

import useAuth from "../hooks/useAuth.js";
import { useHistory } from "react-router-dom";

import ProfilePage from "./ProfilePage.jsx";
import EventsListPage from "./EventsListPage.jsx";
import WatchingEventsPage from "./WatchingEventsPage.jsx";

export default function HomePage() {
  const token = useAuth();
  const history = useHistory();

  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!token) {
    history.push("/auth");
  }

  return (
    <TabContext value={tabValue}>
      <NavBar tabValue={tabValue} handleTabChange={handleTabChange} />
      <TabPanel value="1">
        <EventsListPage />
      </TabPanel>
      <TabPanel value="2">
        <WatchingEventsPage />
      </TabPanel>
      <TabPanel value="3">
        <ProfilePage />
      </TabPanel>
    </TabContext>
  );
}
