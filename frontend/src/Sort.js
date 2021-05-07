import { useReduce } from "./Reducer-context";

export default function Sort({ setshowsort }) {
  let { dispatch, sortBy } = useReduce();

  return (
    <>
      <div className="sortblock">
        <ul class="sortlist">
          <li>
            <input
              type="radio"
              name="sort"
              checked={sortBy === null}
              onClick={() => {
                dispatch({ type: "SORT", payload: null });
                setshowsort((prev) => !prev);
              }}
            />
            Relevance
          </li>
          <li>
            <input
              type="radio"
              name="sort"
              checked={sortBy === "Newest First"}
              onClick={() => {
                dispatch({ type: "SORT", payload: "Newest First" });
                setshowsort((prev) => !prev);
              }}
            />
            Oldest First
          </li>
          <li>
            <input
              type="radio"
              name="sort"
              checked={sortBy === "Oldest First"}
              onClick={() => {
                dispatch({ type: "SORT", payload: "Oldest First" });
                setshowsort((prev) => !prev);
              }}
            />
            Newest First
          </li>
        </ul>
      </div>
    </>
  );
}
