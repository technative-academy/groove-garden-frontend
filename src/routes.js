import App from "./App";
import Home from "./components/Home/Home";
import MyCollections from "./components/MyCollections/MyCollections";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/my-collections",
        element: <MyCollections />,
      },
    ],
  },
];

export default routes;
