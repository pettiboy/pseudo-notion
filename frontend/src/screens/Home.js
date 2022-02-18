import { useEffect } from "react";
import ResponsiveDrawer from "../components/ResponsiveDrawer";

const Home = (props) => {
  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ResponsiveDrawer />
    </>
  );
};

export default Home;
