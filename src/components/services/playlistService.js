import apiService from "./apiService";

const editMyPlaylist = async (id, title, desciption) => {
  return apiService("api/auth/register", {
    method: "PATCH",
    body: JSON.stringify({ id, title, desciption }),
  });
};

const playlistService = {
  editMyPlaylist,
};

export default playlistService;
