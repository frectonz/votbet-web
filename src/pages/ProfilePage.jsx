import React from "react";
import User from "../components/User.jsx";
import Loading from "../components/Loading.jsx";

import { useMe } from "../hooks/auth.hooks";

export default function ProfilePage() {
  const { data, isFetching } = useMe();

  if (isFetching) {
    return <Loading />;
  }

  return <div>{data && <User showControls={true} {...data?.data} />}</div>;
}
