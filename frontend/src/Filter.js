import { useReduce } from "./Reducer-context";
import { category } from "./Reducer-context";

export default function Filter({ setshowfilter }) {
  let { dispatch, showCategory } = useReduce();
  return (
    <>
      <ul class="list filterlist">
        {Object.keys(category).map((item) => {
          return (
            <>
              <div>{item}</div>
              {category[item].map((item1) => {
                return (
                  <>
                    <li>
                      <input
                        type="checkbox"
                        style={{ cursor: "pointer" }}
                        checked={showCategory.includes(item1.toLowerCase())}
                        onChange={() =>
                          dispatch({
                            type: "FILTERCATEGORY",
                            payload: item1.toLowerCase()
                          })
                        }
                      />
                      {item1}
                    </li>
                  </>
                );
              })}
            </>
          );
        })}
      </ul>
      <button
        class="primary-button lg filterapply"
        onClick={() => setshowfilter((prev) => !prev)}
      >
        Apply
      </button>
    </>
  );
}
