import { useReduce } from "../reducer-context/Reducer-context";

export function Sort({ setshowsort }) {
  let { dispatch, sortBy } = useReduce();

  return (
    <>
      <div className="sortblock">
        <ul class="sortlist">
          <li>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                padding: "0.3rem 0",
                background: sortBy === null ? "lightgrey" : ""
              }}
              onClick={() => {
                dispatch({ type: "SORT", payload: null });
                setshowsort((prev) => !prev);
              }}
            >
              Relevance
            </div>
          </li>
          <li>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                padding: "0.3rem 0",
                background: sortBy === "Newest First" ? "lightgrey" : ""
              }}
              onClick={() => {
                dispatch({ type: "SORT", payload: "Newest First" });
                setshowsort((prev) => !prev);
              }}
            >
              Newest First
            </div>
          </li>
          <li>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                padding: "0.3rem 0",
                background: sortBy === "Oldest First" ? "lightgrey" : ""
              }}
              onClick={() => {
                dispatch({ type: "SORT", payload: "Oldest First" });
                setshowsort((prev) => !prev);
              }}
            >
              Oldest First
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
