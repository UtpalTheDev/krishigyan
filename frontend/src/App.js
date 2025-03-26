import "./styles.css";
import { Routes, Route } from "react-router-dom";
import {BallTriangle} from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useReduce } from "./reducer-context/Reducer-context";
import PrivateRoute from "./PrivateRoute";

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
  console.log("llllllllll",process.env.REACT_APP_backend_url)
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<VideoBlock />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<PrivateRoute />}>
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/history" element={<History />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/user" element={<User />} /> 
        </Route>
       
      </Routes>
      {loading && (
        <div className="loader">
          <BallTriangle
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
