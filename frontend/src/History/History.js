import { useReduce } from "../Reducer-context";
import TimeAgo from "react-timeago";
import { getSortedData, getFilteredData } from "../App";
import Navigator from "../Navigator";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Navbar } from "../Navbar";

export default function History() {
  useEffect(() => {
    dispatch({ type: "CLEAR_FILTER" });
  }, []);
  const { history, dispatch, sortBy, showCategory } = useReduce();
  console.log("history", history);

  let sortedData = getSortedData(history, sortBy);
  console.log("sorted", sortedData);
  let filteredData = getFilteredData(sortedData, { showCategory });
  console.log("filtered", filteredData);

  function History() {
    return filteredData
      .filter((item) => item.ishistory !== false)
      .map((item) => {
        return (
          <>
            {" "}
            <div class="history-card">
              <Link to={`/${item.id}`}>
                <div class="history-card-data">
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
                  <div className="history-card-desc">{item.title}</div>
                  <div className="watchedbefore sm">
                    {`Watched `}
                    <TimeAgo date={item.lastseen} />
                  </div>
                </div>
              </Link>
              <button
                class="icon-button lg"
                onClick={() =>
                  dispatch({ type: "REMOVE_FROM_HISTORY", payload: item.id })
                }
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </>
        );
      });
  }

  return (
    <>
      <Navbar />
      <Navigator value="history" />
      <h6>History</h6>
      <div className="wrapper">
        {History().length === 0 ? (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
          >
            You Haven't Watched Any Video
          </div>
        ) : (
          History()
        )}
      </div>
    </>
  );
}

/*              {`${item.lastseen.getDate()}/${
                item.lastseen.getMonth() + 1
              }/${item.lastseen.getFullYear()} At: ${item.lastseen.getHours()}:${item.lastseen.getMinutes()}`}*/
