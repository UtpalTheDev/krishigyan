import axios from "axios";

export async function history_video_add_call(url, payload, dispatch) {
  try {
    let response = await axios.post(url, payload);
    if (response.status === 200) {
      dispatch({
        type: "ADD_TO_HISTORY",
        payload: payload
      });
    }
  } catch (err) {
    console.log("history", err);
  }
}
export async function history_video_delete_call(url, payload, dispatch) {
  try {
    let response = await axios.delete(url, { data: payload });
    if (response.status === 200) {
      dispatch({
        type: "REMOVE_FROM_HISTORY",
        payload: payload
      });
      return "removed from history";
    }
  } catch (err) {
    console.log(err);
    return "not able to remove from history";
  }
}
export async function liked_video_add_call(url, payload, dispatch) {
  try {
    let response = await axios.post(url, payload);
    if (response.status === 200) {
      dispatch({
        type: "ADD_TO_LIKEDLIST",
        payload: payload.likedId
      });
      return "you have liked the video";
    }
  } catch (err) {
    // console.log(err);
    return "not able to like the video";
  }
}
export async function liked_video_delete_call(url, payload, dispatch) {
  try {
    let response = await axios.delete(url, { data: payload });
    if (response.status === 200) {
      dispatch({
        type: "REMOVE_FROM_LIKEDLIST",
        payload: payload.likedId
      });
      return "you have removed like";
    }
  } catch (err) {
    // console.log(err);
    return "not able to remove like";
  }
}
export async function playlist_add_call(url, payload, dispatch) {
  try {
    let response = await axios.post(url, payload);
    if (response.status === 200) {
      dispatch({
        type: "NEW_PLAYLIST",
        payload: payload.playlistobj
      });
      return "playlist created";
    }
  } catch (err) {
    // console.log(err);
    return "not able to create playlist";
  }
}
export async function playlist_video_add_call(url, payload, dispatch) {
  try {
    let response = await axios.post(url, payload);
    if (response.status === 200) {
      dispatch({
        type: "ADD_TO_PLAYLIST",
        payload: payload
      });

      return "video added to playlist";
    }
  } catch (err) {
    // console.log(err);
    return "not able to add to playlist";
  }
}
export async function playlist_video_delete_call(url, payload, dispatch) {
  try {
    let response = await axios.delete(url, { data: payload });
    if (response.status === 200) {
      dispatch({
        type: "REMOVE_FROM_PLAYLIST",
        payload: payload
      });
      return "video removed from playlist";
    }
  } catch (err) {
    // console.log(err);
    return "not able to remove from playlist";
  }
}
export async function playlist_delete_call(url, payload, dispatch) {
  try {
    let response = await axios.delete(url, { data: payload });
    if (response.status === 200) {
      dispatch({
        type: "REMOVE_PLAYLIST",
        payload: payload.playlistid
      });
      return "playlist deleted";
    }
  } catch (err) {
    // console.log(err);
    return "not able to delete playlist";
  }
}
