import React, { useState } from "react";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

const Logout = ({ navigateTo = "/login" }) => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    setDisabled(true);
    signOut(auth)
      .then(() => {
        navigate(navigateTo);
      })
      .catch((error) => {
        console.error(error);
        setDisabled(false);
      });
  };

  return (
    <Button disabled={disabled} onClick={logout} color="error" fullWidth={true}>
      Logout
    </Button>
  );
};

export default Logout;
