import { useReduce } from "../Reducer-context";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "../Navbar";

import { getSortedData, getFilteredData } from "../App";
import Navigator from "../Navigator";

export default function Home() {
  const { data, route, dispatch, videobj, sortBy, showCategory } = useReduce();

  useEffect(() => {
    dispatch({ type: "CLEAR_FILTER" });
  }, []);

  let sortedData = getSortedData(data, sortBy);
  console.log("sorted", sortedData);
  let filteredData = getFilteredData(sortedData, { showCategory });
  console.log("filtered", filteredData);

  return (
    <>
      <Navigator value="home" />
      <Navbar />
      <div className="videos">
        {filteredData.map((item) => {
          return (
            <>
              <Link to={`${item.id}`}>
                <div>
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
                    <div className="videos-duration md">
                      {item.duration.toFixed(2)}
                    </div>
                  </div>
                  <div className="videos-desc">
                    <div className="videos-title">{item.title}</div>
                  </div>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
}
