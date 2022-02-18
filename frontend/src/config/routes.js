import Home from "../screens/Home";
import Login from "../screens/Login";

const routes = [
  {
    path: "",
    component: Home,
    name: "Home Page",
    protected: true,
  },
  {
    path: "/login",
    component: Login,
    name: "Login Screen",
    protected: false,
  },
];

export default routes;
