import "./styles.css";
import { Routes, Route } from "react-router-dom";
import VideoBlock from "./video-block";
import Home from "./Home/Home";
import Playlist from "./Playlist/Playlist";
import History from "./History/History";
import Liked from "./Liked/Liked";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:videoId" element={<VideoBlock />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/history" element={<History />} />
        <Route path="/Liked" element={<Liked />} />
      </Routes>
    </div>
  );
}

export function getSortedData(videolist, sortBy) {
  if (sortBy === "Oldest First") {
    return [...videolist].sort(
      (a, b) => new Date(a.dateofpublish) - new Date(b.dateofpublish)
    );
  }
  if (sortBy === "Newest First") {
    return [...videolist].sort(
      (a, b) => new Date(b.dateofpublish) - new Date(a.dateofpublish)
    );
  }
  return videolist;
}

export function getFilteredData(sortedData, { showCategory }) {
  return sortedData.filter((item) =>
    showCategory.length !== 0 ? showCategory.includes(item.genre) : true
  );
}
