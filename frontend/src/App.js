import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Loader from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useReduce } from "./reducer-context/Reducer-context";
// import VideoBlock from "./video-block";
// import {Home} from "./pages";
// import Playlist from "./Playlist/Playlist";
// import History from "./History/History";
// import Liked from "./Liked/Liked";
import PrivateRoute from "./PrivateRoute";
// import Login from "./Login";
// import Signup from "./Signup";
// import User from "./User";
// import NotFound from "./NotFound";
import {
  VideoBlock,
  Home,
  Playlist,
  History,
  Liked,
  Login,
  Signup,
  User,
  NotFound
} from "./pages";
export default function App() {
  const { loading } = useReduce();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<VideoBlock />} />
        <PrivateRoute path="/playlist" element={<Playlist />} />
        <PrivateRoute path="/history" element={<History />} />
        <PrivateRoute path="/liked" element={<Liked />} />
        <PrivateRoute path="/user" element={<User />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {loading && (
        <div className="loader">
          <Loader
            type="BallTriangle"
            color="green"
            height={100}
            width={100}
            timeout={1000000} //3 secs
          />
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
      />
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
