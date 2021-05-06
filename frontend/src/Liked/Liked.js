import { useReduce } from "../Reducer-context";
import { getSortedData, getFilteredData } from "../App";
import Navigator from "../Navigator";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar";

export default function Liked() {
  useEffect(() => {
    dispatch({ type: "CLEAR_FILTER" });
  }, []);
  let { likedlist, dispatch, sortBy, showCategory } = useReduce();
  let sortedData = getSortedData(likedlist, sortBy);
  console.log("sorted", sortedData);

  let filteredData = getFilteredData(sortedData, { showCategory });
  console.log("filtered", filteredData);

  function Likedlist() {
    return filteredData
      .filter((item) => item.islike !== false)
      .map((item) => {
        return (
          <>
            {" "}
            <div className="likedlist-card">
              <Link to={`/${item.id}`}>
                <div className="likedlist-card-data">
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
                    alt=""
                  />
                  <div className="likedlist-card-desc">{item.title}</div>
                </div>
              </Link>
              <button
                class="icon-button lg"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_LIKEDLIST",
                    payload: item.id
                  })
                }
              >
                <i class="far fa-thumbs-down"></i>
              </button>
            </div>
          </>
        );
      });
  }

  //console.log(playlist);
  return (
    <>
      <Navbar />

      <Navigator value="liked" />
      <div className="wrapper">
        {Likedlist().length === 0 ? (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
          >
            You Haven't Liked Any Video
          </div>
        ) : (
          Likedlist()
        )}
      </div>
    </>
  );
}
