import { useReduce } from "../Reducer-context";
import { useEffect, useState } from "react";
import { getSortedData, getFilteredData } from "../App";
import Navigator from "../Navigator";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar";
import axios from "axios";

export default function Playlist() {
  // useEffect(() => {
  //   dispatch({ type: "CLEAR_FILTER" });
  // }, []);

  let { data, playlist, dispatch, sortBy, showCategory } = useReduce();

  console.log("playlist", playlist);
  const [currentplaylist, setplaylist] = useState(0);

  // console.log("now", Object.keys(playlist)[0]);
  console.log("lop", currentplaylist);
  let datapass =
    playlist[currentplaylist] === undefined
      ? []
      : playlist[currentplaylist].videos;

  let dataarr = datapass.map((item) => {
    return data.find((item1) => item1.id === item);
  });

  let sortedData = getSortedData(dataarr, sortBy);
  // console.log("sorted", sortedData);
  let filteredData = getFilteredData(sortedData, { showCategory });
  // console.log("filtered", filteredData);

  function Showplaylist() {
    return filteredData.map((item) => {
      return (
        <>
          {" "}
          <div className="playlist-card">
            <Link to={`/${item.id}`}>
              {" "}
              <div className="playlist-card-data">
                <img
                  src={`https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`}
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_HISTORY",
                      payload: {
                        historyId: item.id,
                        lastseen: new Date()
                      }
                    });
                  }}
                  alt=""
                />
                <div className="playlist-card-desc">{item.title}</div>
              </div>
            </Link>
            <button
              class="icon-button lg"
              onClick={() => {
                playlist_video_delete_call(
                  "https://videolib-demo.utpalpati.repl.co/playlist/video/",
                  {
                    playlistid: playlist[currentplaylist].id,
                    videoid: item.id
                  }
                );
              }}
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </>
      );
    });
  }
  function Removeandupdate(index) {
    console.log("enter");
    setplaylist((prev) => {
      if (prev === index) {
        if (index + 1 < playlist.length) {
          console.log("index+1");
          return index;
        } else {
          console.log("index-1");
          return index - 1;
        }
      }
      console.log("index");
      if (prev === playlist.length - 1) {
        return prev - 1;
      }
      return prev;
    });
  }
  async function playlist_video_delete_call(url, payload) {
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
  async function playlist_delete_call(url, payload) {
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
  return (
    <>
      <Navbar />
      <Navigator value="playlist" />
      <div className="wrapper">
        <h4>
          {playlist[currentplaylist] !== undefined
            ? "Playlist Names"
            : "No Playlist Present"}
        </h4>
        <ul class="list playlistname">
          {playlist.map((item, index) => {
            return (
              <>
                <li
                  style={{
                    background: currentplaylist === index ? "#f2f2f2" : ""
                  }}
                >
                  <div onClick={() => setplaylist(index)}>{item.name}</div>
                  <button
                    class="icon-button md"
                    onClick={() => {
                      Removeandupdate(index);

                      playlist_delete_call(
                        "https://videolib-demo.utpalpati.repl.co/playlist/",
                        { playlistid: item.id }
                      );
                    }}
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </li>
              </>
            );
          })}
        </ul>

        <h3 class="">
          {playlist[currentplaylist] !== undefined
            ? `Playlist - ${playlist[currentplaylist].name}`
            : ""}
        </h3>

        <div className="playlistitem">
          {playlist[currentplaylist] !== undefined
            ? playlist[currentplaylist].videos.length !== 0
              ? Showplaylist()
              : ""
            : ""}
        </div>
      </div>
    </>
  );
}
