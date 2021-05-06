import { useReduce } from "./Reducer-context";

import { useState } from "react";
import { Link } from "react-router-dom";
import Sort from "./Sort";
import Filter from "./Filter";

export default function Navigator({ value }) {
  let { dispatch } = useReduce();

  const [showsort, setshowsort] = useState(false);
  const [showfilter, setshowfilter] = useState(false);
  return (
    <>
      <div className="navigator">
        <Link to="/">
          {" "}
          <button
            style={{ background: value === "home" ? "#f2f2f2" : "" }}
            onClick={() => dispatch({ type: "ROUTING", payload: "liked" })}
          >
            <span class="material-icons">home</span>
            <br />
            Home
          </button>
        </Link>
        <Link to="/playlist">
          {" "}
          <button
            style={{ background: value === "playlist" ? "#f2f2f2" : "" }}
            onClick={() => dispatch({ type: "ROUTING", payload: "playlist" })}
          >
            <span class="material-icons">video_library</span>
            <br />
            Playlist
          </button>
        </Link>

        <Link to="/liked">
          {" "}
          <button
            style={{ background: value === "liked" ? "#f2f2f2" : "" }}
            onClick={() => dispatch({ type: "ROUTING", payload: "liked" })}
          >
            <span class="material-icons">thumb_up_alt</span>
            <br />
            Liked
          </button>
        </Link>

        <Link to="/history">
          {" "}
          <button
            style={{ background: value === "history" ? "#f2f2f2" : "" }}
            onClick={() => dispatch({ type: "ROUTING", payload: "history" })}
          >
            <span class="material-icons">history</span>
            <br />
            History
          </button>
        </Link>

        <Link to="">
          <button onClick={() => setshowsort((prev) => !prev)}>
            <span class="material-icons">import_export</span>
            <br />
            Sort
          </button>
        </Link>
        <Link to="">
          <button onClick={() => setshowfilter((prev) => !prev)}>
            <span class="material-icons">filter_alt</span>
            <br />
            Filter
          </button>
        </Link>
      </div>

      <div
        className="sortpopup"
        style={{ display: showsort ? "block" : "none" }}
      >
        <Sort setshowsort={setshowsort} />
      </div>

      <div
        className="filterpopup"
        style={{ display: showfilter ? "block" : "none" }}
      >
        {showfilter ? <Filter setshowfilter={setshowfilter} /> : ""}
      </div>
    </>
  );
}
