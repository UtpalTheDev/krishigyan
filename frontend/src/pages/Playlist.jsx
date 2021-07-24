import { useReduce } from "../reducer-context/Reducer-context";
import { useEffect, useState } from "react";
import { getSortedData, getFilteredData } from "../App";
import { Link } from "react-router-dom";
import { Navbar, Navigator } from "../components";
import { toast } from "react-toastify";
import {
  playlist_delete_call,
  playlist_video_delete_call
} from "../api/serverRequests";

export function Playlist() {
  let { data, playlist, dispatch, sortBy, showCategory } = useReduce();

  const [currentplaylist, setplaylist] = useState(0);

  let datapass =
    playlist[currentplaylist] === undefined
      ? []
      : playlist[currentplaylist].videos;

  let dataarr = datapass.map((item) => {
    return data.find((item1) => item1.id === item);
  });

  let sortedData = getSortedData(dataarr, sortBy);
  let filteredData = getFilteredData(sortedData, { showCategory });

  function Showplaylist() {
    return filteredData.map((item) => {
      return (
        
          <div key={item.id} className="playlist-card">
            <Link to={`/video/${item.id}`}>
              {" "}
              <div
                className="playlist-card-data"
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_HISTORY",
                    payload: {
                      historyId: item.id,
                      lastseen: new Date()
                    }
                  });
                }}
              >
                <img
                  src={`https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`}
                  alt=""
                />
                <div className="playlist-card-desc">{item.title}</div>
              </div>
            </Link>
            <button
              className="icon-button lg"
              onClick={async () => {
                let playlistmsg = await playlist_video_delete_call(
                  "https://videolib-demo-1.utpalpati.repl.co/playlist/video/",
                  {
                    playlistid: playlist[currentplaylist].id,
                    videoid: item.id
                  },
                  dispatch
                );
                const notify = () => toast.dark(playlistmsg);
                notify();
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        
      );
    });
  }
  function Removeandupdate(index) {
    setplaylist((prev) => {
      if (prev === index) {
        if (index + 1 < playlist.length) {
          return index;
        } else {
          return index - 1;
        }
      }
      if (prev === playlist.length - 1) {
        return prev - 1;
      }
      return prev;
    });
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
        <ul className="list playlistname">
          {playlist.map((item, index) => {
            return (
              
                <li
                  key={item.id}
                  style={{
                    background: currentplaylist === index ? "#f2f2f2" : ""
                  }}
                >
                  <div onClick={() => setplaylist(index)}>{item.name}</div>
                  <button
                    className="icon-button md"
                    onClick={() => {
                      (async function () {
                        let playlistmsg = await playlist_delete_call(
                          "https://videolib-demo-1.utpalpati.repl.co/playlist/",
                          { playlistid: item.id },
                          dispatch
                        );
                        Removeandupdate(index);
                        const notify = () => toast.dark(playlistmsg);
                        notify();
                      })();
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </li>
              
            );
          })}
        </ul>

        <h3 className="">
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
