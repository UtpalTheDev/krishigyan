import axios from "axios";

export async function history_video_add_call(url, payload, dispatch) {
  try {
    dispatch({ type: "LOAD", payload: true });
    let response = await axios.post(url, payload);
    if (response.status === 200) {
      dispatch({
        type: "ADD_TO_HISTORY",
        payload: payload
      });
    }
    dispatch({ type: "LOAD", payload: false });
  } catch (err) {
    dispatch({ type: "LOAD", payload: false });
  }
}
export async function history_video_delete_call(url, payload, dispatch) {
  try {
    dispatch({ type: "LOAD", payload: true });
    let response = await axios.delete(url, { data: payload });
    if (response.status === 200) {
      dispatch({
        type: "REMOVE_FROM_HISTORY",
        payload: payload
      });
      dispatch({ type: "LOAD", payload: false });
      return "removed from history";
    }
  } catch (err) {
    dispatch({ type: "LOAD", payload: false });
    return "not able to remove from history";
  }
}
export async function liked_video_add_call(url, payload, dispatch) {
  try {
    dispatch({ type: "LOAD", payload: true });
    let response = await axios.post(url, payload);
    if (response.status === 200) {
      dispatch({
        type: "ADD_TO_LIKEDLIST",
        payload: payload.likedId
      });
      dispatch({ type: "LOAD", payload: false });
      return "you have liked the video";
    }
  } catch (err) {
    dispatch({ type: "LOAD", payload: false });
    return "not able to like the video";
  }
}
export async function liked_video_delete_call(url, payload, dispatch) {
  try {
    dispatch({ type: "LOAD", payload: true });
    let response = await axios.delete(url, { data: payload });
    if (response.status === 200) {
      dispatch({
        type: "REMOVE_FROM_LIKEDLIST",
        payload: payload.likedId
      });
      dispatch({ type: "LOAD", payload: false });
      return "you have removed like";
    }
  } catch (err) {
    dispatch({ type: "LOAD", payload: false });
    return "not able to remove like";
  }
}
export async function playlist_add_call(url, payload, dispatch) {
  try {
    dispatch({ type: "LOAD", payload: true });
    let response = await axios.post(url, payload);
    if (response.status === 200) {
      dispatch({
        type: "NEW_PLAYLIST",
        payload: payload.playlistobj
      });
      dispatch({ type: "LOAD", payload: false });
      return "playlist created";
    }
  } catch (err) {
    dispatch({ type: "LOAD", payload: false });
    return "not able to create playlist";
  }
}
export async function playlist_video_add_call(url, payload, dispatch) {
  try {
    dispatch({ type: "LOAD", payload: true });
    let response = await axios.post(url, payload);
    if (response.status === 200) {
      dispatch({
        type: "ADD_TO_PLAYLIST",
        payload: payload
      });
      dispatch({ type: "LOAD", payload: false });
      return "video added to playlist";
    }
  } catch (err) {
    dispatch({ type: "LOAD", payload: false });
    return "not able to add to playlist";
  }
}
export async function playlist_video_delete_call(url, payload, dispatch) {
  try {
    dispatch({ type: "LOAD", payload: true });
    let response = await axios.delete(url, { data: payload });
    if (response.status === 200) {
      dispatch({
        type: "REMOVE_FROM_PLAYLIST",
        payload: payload
      });
      dispatch({ type: "LOAD", payload: false });
      return "video removed from playlist";
    }
  } catch (err) {
    dispatch({ type: "LOAD", payload: false });
    return "not able to remove from playlist";
  }
}
export async function playlist_delete_call(url, payload, dispatch) {
  try {
    dispatch({ type: "LOAD", payload: true });
    let response = await axios.delete(url, { data: payload });
    if (response.status === 200) {
      dispatch({
        type: "REMOVE_PLAYLIST",
        payload: payload.playlistid
      });
      dispatch({ type: "LOAD", payload: false });
      return "playlist deleted";
    }
  } catch (err) {
    dispatch({ type: "LOAD", payload: false });
    return "not able to delete playlist";
  }
}
