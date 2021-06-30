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
    }
  } catch (err) {
    console.log(err);
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
    }
  } catch (err) {
    console.log(err);
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
    }
  } catch (err) {
    console.log(err);
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
    }
  } catch (err) {
    console.log(err);
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
    }
  } catch (err) {
    console.log(err);
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
    }
  } catch (err) {
    console.log(err);
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
    }
  } catch (err) {
    console.log(err);
  }
}
