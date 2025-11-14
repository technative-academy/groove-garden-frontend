import App from "./App";
import Home from "./components/Home/Home";
import MyCollections from "./components/MyCollections/MyCollections";
import UploadSong from "./components/UploadSong/UploadSong";
import Register from "./components/Register/Register";

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
      {
        path: "/upload-song",
        element: <UploadSong />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
];

export default routes;
