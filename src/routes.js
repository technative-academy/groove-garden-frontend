import App from "./App";
import Home from "./components/Home/Home";
import MyCollections from "./components/MyCollections/MyCollections";
import UploadSong from "./components/UploadSong/UploadSong";

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
    ],
  },
];

export default routes;
