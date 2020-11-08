import React from "react";
import TopBar from "./TopBar.jsx";
import { Paper, Tabs, Tab } from "@material-ui/core";
import { Event, Visibility, PersonPin } from "@material-ui/icons";

export default function NavBar({ handleTabChange, tabValue }) {
  return (
    <>
      <TopBar />
      <Paper square>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="nav bar tabs"
        >
          <Tab icon={<Event />} label="Events" value="1" />
          <Tab icon={<Visibility />} label="Watching" value="2" />
          <Tab icon={<PersonPin />} label="Profile" value="3" />
        </Tabs>
      </Paper>
    </>
  );
}
