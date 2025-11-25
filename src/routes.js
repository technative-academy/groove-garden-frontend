import App from "./App";
import Home from "./components/Home/Home";

import UploadSong from "./components/UploadSong/UploadSong";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Playlist from "./components/Playlist/Playlist/Playlist";
import AddPlaylist from "./components/Playlist/Add/Add";
import PlaylistById from "./components/Playlist/PlaylistById/PlaylistById";
import Add from "./components/Playlist/Add/Add";

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
        path: "upload-song",
        element: <UploadSong />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "my-playlist",
        element: <Playlist />,
      },
      {
        path: "add-playlist",
        element: <AddPlaylist />,
      },
      {
        path: "my-playlist-by-id",
        element: <PlaylistById />,
        children: [{ path: "add-song", element: <Add /> }],
      },
    ],
  },
];

export default routes;
