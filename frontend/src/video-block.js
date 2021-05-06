import { useReduce } from "./Reducer-context";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Navbar } from "./Navbar";
import Navigator from "./Navigator";

export default function VideoBlock() {
  //console.log(routepath);
  let { videoId } = useParams();

  const [showmodal, setshowmodal] = useState(false);

  const { data, dispatch, playlist, likedlist } = useReduce();
  let videoobj = data.find((item) => item.id === videoId);
  // console.log("input", newplaylist);
  console.log("playlist", playlist);

  function Like_button(itempassed) {
    return likedlist.reduce(
      (defaultbutton, item) => {
        if (item.id === itempassed.id && item.islike !== false) {
          return (
            <button
              class="icon-button md"
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_LIKEDLIST", payload: item.id })
              }
            >
              <span class="material-icons">thumb_up</span>Unlike
            </button>
          );
        }
        return defaultbutton;
      },
      <button
        class="icon-button md"
        onClick={() =>
          dispatch({
            type: "ADD_TO_LIKEDLIST",
            payload: { ...itempassed, islike: true }
          })
        }
      >
        <span class="material-icons">thumb_up_off_alt</span>Like
      </button>
    );
  }

  return (
    <>
      <Navbar />
      <Link to="/" className="home">
        <button
          class="icon-button round lg"
          onClick={() => dispatch({ type: "ROUTING", payload: "home" })}
        >
          <span class="material-icons">home</span>
        </button>
      </Link>
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
              onClick={() => setshowmodal((prev) => !prev)}
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
              (item) => item.genre === videoobj.genre && item.id !== videoobj.id
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
                            dispatch({
                              type: "ADD_TO_HISTORY",
                              payload: {
                                ...item,
                                ishistory: true,
                                lastseen: new Date()
                              }
                            });
                          }}
                          alt="f"
                        />
                        <div className="recommendcard-duration md">
                          {item.duration}
                        </div>
                      </div>
                      <div className="recommendcard-desc">
                        <div className="recommendcard-title">{item.title}</div>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

function PlaylistModal({ setshowmodal, videoId }) {
  const [newplaylist, setnewplaylist] = useState("");
  const [showinput, setshowinput] = useState(false);

  let { dispatch, playlist } = useReduce();
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
                    onClick={() => {
                      dispatch({
                        type: "ADD_TO_PLAYLIST",
                        payload: {
                          videoid: videoId,
                          playlistid: item.id
                        }
                      });
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
                onClick={() => {
                  setshowinput(false);
                  newplaylist !== ""
                    ? dispatch({
                        type: "NEW_PLAYLIST",
                        payload: { id: uuid(), name: newplaylist, videos: [] }
                      })
                    : console.log("blank");
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
