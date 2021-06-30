import { useReduce } from "./Reducer-context";
import { useState,useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Navbar } from "./Navbar";
import axios from "axios";
import { useLogin } from "./LoginContext";
import { toast } from "react-toastify";

import {
  liked_video_add_call,
  liked_video_delete_call,
  history_video_add_call,
  playlist_add_call,
  playlist_video_add_call
} from "./api/serverRequests";

export default function VideoBlock() {
  let { videoId } = useParams();
  const navigate = useNavigate();
  const [showmodal, setshowmodal] = useState(false);

  const { data, dispatch, likedlist } = useReduce();
  const { isUserLogIn } = useLogin();
  let videoobj;
  if (data.length > 0) {
    videoobj = data.find((item) => item.id === videoId);
  }
  function Like_button(itempassed) {
    return likedlist.reduce(
      (defaultbutton, item) => {
        if (item === itempassed.id) {
          return (
            <button
              class="icon-button md"
              onClick={async () => {
                let likedmsg = await liked_video_delete_call(
                  "https://videolib-demo-1.utpalpati.repl.co/liked/",
                  { likedId: item },
                  dispatch
                );
                const notify = () => toast.dark(likedmsg);
                notify();
              }}
            >
              <span class="material-icons">thumb_up</span>Unlike
            </button>
          );
        }
        return defaultbutton;
      },
      <button
        class="icon-button md"
        onClick={async () => {
          if (isUserLogIn) {
            let likedmsg = await liked_video_add_call(
              "https://videolib-demo-1.utpalpati.repl.co/liked/",
              { likedId: itempassed.id },
              dispatch
            );
            const notify = () => toast.dark(likedmsg);
            notify();
          } else {
            navigate("/login");
          }
        }}
      >
        <span class="material-icons">thumb_up_off_alt</span>Like
      </button>
    );
  }
  useEffect(()=>{
    videoobj===undefined && navigate("/404")
  },[])
  return (
    <>
      <Navbar />
      <Link to="/" className="home">
        <button class="icon-button round lg">
          <span class="material-icons">home</span>
        </button>
      </Link>
      {data.length > 0 && videoobj!==undefined && (
        <div className="element-wrapper">
          <div className="iframe-wrapper">
            <iframe
              height="200"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autohide=0&showinfo=0&watch-later=0&controls=captions`}
              title="YouTube video player"
              frameborder="0"
              allowfullscreen="allowFullscreen"
              className="iframe"
            ></iframe>
            <br />
            <div class="xl video-title">{videoobj.title}</div>
            <div className="iframe-button">
              {Like_button(videoobj)}

              <button
                class="icon-button md"
                onClick={() => {
                  if (isUserLogIn) {
                    setshowmodal((prev) => !prev);
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <span class="material-icons">playlist_add</span>Save
              </button>
            </div>
          </div>
          {showmodal === true ? (
            <PlaylistModal setshowmodal={setshowmodal} videoId={videoId} />
          ) : (
            ""
          )}
          <div className="recommends">
            Recommended
            {data
              .filter(
                (item) =>
                  item.genre === videoobj.genre && item.id !== videoobj.id
              )
              .map((item) => {
                return (
                  <>
                    <Link to={`/${item.id}`} className="recommend">
                      <div className="recommend-flexwrapper">
                        <div className="image-wrapper">
                          <img
                            src={`https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`}
                            onClick={() => {
                              history_video_add_call(
                                "https://videolib-demo-1.utpalpati.repl.co/history/",
                                {
                                  historyId: item.id,
                                  lastseen: new Date()
                                },
                                dispatch
                              );
                            }}
                            alt="f"
                          />
                          <div className="recommendcard-duration md">
                            {item.duration}
                          </div>
                        </div>
                        <div className="recommendcard-desc">
                          <div className="recommendcard-title">
                            {item.title}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

function PlaylistModal({ setshowmodal, videoId }) {
  const [newplaylist, setnewplaylist] = useState("");
  const [showinput, setshowinput] = useState(false);

  const { dispatch, playlist } = useReduce();

  return (
    <>
      <div className="playlistmodal">
        <div className="playlists">
          <div className="modalheader">
            <div>Save to...</div>
            <button
              class="icon-button sm"
              onClick={() => setshowmodal((prev) => !prev)}
            >
              <i class="fas fa-times"></i>
            </button>
          </div>

          <ul class="list">
            {playlist.map((item) => {
              return (
                <>
                  <li
                    onClick={async () => {
                      let playlistmsg = await playlist_video_add_call(
                        "https://videolib-demo-1.utpalpati.repl.co/playlist/video",
                        {
                          videoid: videoId,
                          playlistid: item.id
                        },
                        dispatch
                      );
                      const notify = () => toast.dark(playlistmsg);
                      notify();
                      setshowmodal((prev) => !prev);
                    }}
                  >
                    <span>{item.name}</span>
                    {item.videos.reduce((total, item1) => {
                      if (item1 === videoId) {
                        return <i class="fas fa-check-circle"></i>;
                      }
                      return total;
                    }, <i class="fas fa-plus"></i>)}
                  </li>
                </>
              );
            })}
          </ul>

          <div className="createplaylist">
            <button
              className="secondary-button"
              onClick={() => setshowinput(true)}
              style={{ display: showinput === true ? "none" : "block" }}
            >
              Create Playlist
            </button>

            <div
              style={{
                display: showinput === false ? "none" : "block",
                textAlign: "center"
              }}
            >
              <label class="input md">
                <input
                  type="text"
                  class="input-text"
                  onChange={(event) => setnewplaylist(event.target.value)}
                  value={newplaylist}
                  required
                  style={{ width: "90%" }}
                />

                <span class="placeholder">Enter Playlist Name</span>
              </label>

              <button
                class="secondary-button"
                onClick={async () => {
                  if (newplaylist !== "") {
                    let playlistmsg = await playlist_add_call(
                      "https://videolib-demo-1.utpalpati.repl.co/playlist/",
                      {
                        playlistobj: {
                          id: uuid(),
                          name: newplaylist,
                          videos: []
                        }
                      },
                      dispatch
                    );
                    const notify = () => toast.dark(playlistmsg);
                    notify();
                  }
                  setshowinput(false);
                  setnewplaylist("");
                }}
              >
                add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
