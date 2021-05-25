import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect
} from "react";
import faker from "faker";
import axios from "axios";

import { datas } from "./Datas";

const Reducercontext = createContext();

export const category = {
  Fruit: ["Mango", "Apple", "Date"],
  Flower: ["Lily", "Marigold"],
  vegetable: ["Poatato", "Tomato", "Carrot", "Cauliflower", "Corn", "Brinjal"],
  Technique: ["Hydropronic", "Vertical"]
};

export function ReducerProvider({ children }) {
  //console.log("datas",datas)
  const [
    {
      route,
      playlist,
      data,
      history,
      likedlist,
      sortBy,
      showDuration,
      showCategory
    },
    dispatch
  ] = useReducer(reduce, {
    route: "home",
    playlist: [],
    data: [],

    history: [],
    likedlist: [],
    sortBy: null,
    showDuration: 0,
    showCategory: []
  });

  useEffect(() => {
    (async function () {
      const playlist = await axios.get(
        "https://videolib-demo.utpalpati.repl.co/playlist/"
      );
      console.log("playlist coming", playlist);
      const history = await axios.get(
        "https://videolib-demo.utpalpati.repl.co/history/"
      );
      console.log("history coming", history);
      const liked = await axios.get(
        "https://videolib-demo.utpalpati.repl.co/liked/"
      );
      console.log("liked coming", liked);
      const videodata = await axios.get(
        "https://videolib-demo.utpalpati.repl.co/video/"
      );
      console.log("data coming", data);

      dispatch({
        type: "LOAD_VIDEODATA",
        payload: videodata.data
      });
      dispatch({
        type: "LOAD_PLAYLIST",
        payload: playlist.data.playlistdata
      });
      dispatch({
        type: "LOAD_HISTORY",
        payload: history.data.historydata
      });
      dispatch({
        type: "LOAD_LIKEDLIST",
        payload: liked.data.likeddata
      });
      // dispatch({
      //   type: "LOAD_WISHLIST",
      //   payload: wishlist.data.items
      // });
      // setdata(data);
    })();
  }, []);
  return (
    <>
      <Reducercontext.Provider
        value={{
          route,
          playlist,
          data,

          history,
          likedlist,
          sortBy,
          showDuration,
          showCategory,
          dispatch
        }}
      >
        {children}
      </Reducercontext.Provider>
    </>
  );
}

export function useReduce() {
  return useContext(Reducercontext);
}

function reduce(state, action) {
  switch (action.type) {
    case "ROUTING":
      return { ...state, route: action.payload };

    case "PLAYING":
      return { ...state, videoobj: action.payload };

    case "SORT":
      return { ...state, sortBy: action.payload };
    case "LOAD_VIDEODATA":
      return { ...state, data: action.payload };
    case "LOAD_PLAYLIST":
      return { ...state, playlist: action.payload };
    case "LOAD_HISTORY":
      return { ...state, history: action.payload };
    case "LOAD_LIKEDLIST":
      return { ...state, likedlist: action.payload };
    case "FILTERCATEGORY":
      if (state.showCategory.includes(action.payload)) {
        return {
          ...state,
          showCategory: state.showCategory.filter(
            (item) => item !== action.payload
          )
        };
      } else {
        return {
          ...state,
          showCategory: [...state.showCategory, action.payload]
        };
      }
    case "CLEAR_FILTER":
      return {
        ...state,
        showCategory: []
      };

    case "NEW_PLAYLIST":
      let { id, name } = action.payload;
      if (
        state.playlist.find((item) => item.id === id || item.name === name) !==
        undefined
      ) {
        return { ...state };
      }
      return {
        ...state,
        playlist: [...state.playlist, action.payload]
      };

    case "REMOVE_PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.filter((item) => action.payload !== item.id)
      };

    case "ADD_TO_PLAYLIST": {
      let { playlistid, videoid } = action.payload;

      return {
        ...state,
        playlist: state.playlist.map((item) => {
          if (item.id === playlistid) {
            return {
              id: item.id,
              name: item.name,
              videos:
                item.videos.find((item1) => item1 === videoid) === undefined
                  ? item.videos.concat(videoid)
                  : item.videos
            };
          }
          return item;
        })
      };
    }

    case "REMOVE_FROM_PLAYLIST": {
      let { playlistid, videoid } = action.payload;
      console.log("reducer", playlistid, videoid);
      return {
        ...state,
        playlist: state.playlist.map((item) => {
          if (item.id === playlistid) {
            return {
              id: item.id,
              name: item.name,
              videos: item.videos.filter((item1) => item1 !== videoid)
            };
          }
          return item;
        })
      };
    }

    case "ADD_TO_HISTORY":
      let findhistory = state.history.find(
        (item) => item.historyId === action.payload.historyId
      );
      console.log("add to history", findhistory);
      if (findhistory) {
        let historynewarr = state.history.map((item) => {
          if (item.historyId === action.payload.historyId) {
            return {
              ...item,
              lastseen: action.payload.lastseen
            };
          }
          return item;
        });
        console.log("add to history", { ...state, history: historynewarr });

        return { ...state, history: historynewarr };
      } else {
        return { ...state, history: [...state.history, action.payload] };
      }

    case "REMOVE_FROM_HISTORY":
      return {
        ...state,
        history: state.history.filter((item) =>item.historyId!==action.payload.historyId
        )
      };

    case "ADD_TO_LIKEDLIST":
      return { ...state, likedlist: [...state.likedlist, action.payload] };

    case "REMOVE_FROM_LIKEDLIST":
      return {
        ...state,
        likedlist: state.likedlist.filter((item) => item !== action.payload)
      };
    default:
      return console.log("error");
  }
}
