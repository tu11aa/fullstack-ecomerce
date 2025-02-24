import React from "react";
import { useAuth } from "../contexts/auth/AuthContext";

const Profile = () => {
  const { user, isLoading, error } = useAuth().state;

  // console.log("isLoading", isLoading);
  // console.log("User: ", user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return <div>Profile</div>;
};

export default Profile;
