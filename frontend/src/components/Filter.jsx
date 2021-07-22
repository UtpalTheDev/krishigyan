import { useReduce, category } from "../reducer-context/Reducer-context";

export function Filter({ setshowfilter }) {
  let { dispatch, showCategory } = useReduce();
  return (
    <>
      <ul className="list filterlist">
        {Object.keys(category).map((item,index) => {
          return (
            <>
              <div key={index} style={{paddingLeft:"0.3rem"}}>{item}</div>
              {category[item].map((item1) => {
                return (
                  
                    <li key={item1}>
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
                  
                );
              })}
            </>
          );
        })}
      </ul>
      <button
        className="primary-button lg filterapply"
        onClick={() => setshowfilter((prev) => !prev)}
      >
        Apply
      </button>
    </>
  );
}
