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

// const datas = [
//   {
//     id: "ygGUe-q3cww",
//     title:
//       "Hydroponic vegetable farming in India-Complete information about hydroponic system",
//     dateofpublish: "Feb 20 2020",
//     duration: 21.58,
//     genre: "hydropronic date"
//   },
//   {
//     id: "HVPPsaI8tbE",
//     title:
//       "Best Hydroponic system in nominal cost | Made by Young Punjabi farmer",
//     dateofpublish: "Jan 31 2018",
//     duration: 6.5,
//     genre: "hydropronic"
//   },
//   {
//     id: "QSx6uprGqWc",
//     title:
//       "खजूर की खेती से 1 पेड़ से 50 हजार की कमाई || Date Plantation in India || Hello Kisaan",
//     dateofpublish: "Mar 13 2021",
//     duration: 16.51,
//     genre: "date"
//   },

//   {
//     id: "4QeRF3m5IlM",
//     title:
//       "Dates Palm Cultivation Process from planting until harvesting and packaging ||Agriculture Technology",
//     dateofpublish: "Mar 19 2020",
//     duration: 11.48,
//     genre: "date"
//   },
//   {
//     id: "jJakrE7_svo",
//     title: "Agriculture Technology - How to Grow and Care Date Palm Trees",
//     dateofpublish: "Jun 29 2020",
//     duration: 10.06,
//     genre: "date"
//   },
//   {
//     id: "1PrtocF6TOc",
//     title:
//       "Date farming खजूर की खेती पर संपूर्ण जानकारी Complete information on Date palm farming khajoor",
//     dateofpublish: "Aug 15 2020",
//     duration: 26.11,
//     genre: "date"
//   },
//   {
//     id: "u_UU5Zjxq8Y",
//     title:
//       "Better than vertical farming, UHDP MANGO FARMING,in india, @indoisraeltech @uhdpmango",
//     dateofpublish: "Sep 13 2020",
//     duration: 14.34,
//     genre: "mango"
//   },
//   {
//     id: "FEZY3uLLGBA",
//     title:
//       "कमर्शियल आम खेती | Mango Farming Profit Per Acre | Mango Farming Techniques",
//     dateofpublish: "May 27 2020",
//     duration: 14.41,
//     genre: "mango"
//   },
//   {
//     id: "ygRC5tNqT98",
//     title:
//       "Scientific methods of Mango Cultivation | Aam ki Unnat Baghwani | Tips for Profitable Farming",
//     dateofpublish: "Oct 15 2017",
//     duration: 7.55,
//     genre: "mango"
//   },
//   {
//     id: "tNw4CuGeHRk",
//     title:
//       "Flowering in 2.5 Years Old High Density Mango Farm | 2.5 साल पुराना उच्च घनत्व वाला आम का खेत",
//     dateofpublish: "Dec 24 2020",
//     duration: 6.26,
//     genre: "mango"
//   },
//   {
//     id: "tnqCYNNx4No",
//     title: "successful mango farming secrets||सफल आम की खेती के रहस्य",
//     dateofpublish: "May 16 2020",
//     duration: 19.34,
//     genre: "mango"
//   },
//   {
//     id: "-nFgDGDkdbo",
//     title: "UHDP Kesar Mango Farming यूएचडीपी केसर आम कि खेती",
//     dateofpublish: "Jul 25 2020",
//     duration: 11.01,
//     genre: "mango"
//   },
//   {
//     id: "jhWzVYlEN-Q",
//     title:
//       "How To Japanese Farmers Cultivate Expensive Mangoes || Agriculture Technology in Japan",
//     dateofpublish: "Feb 12 2020",
//     duration: 10.42,
//     genre: "mango"
//   }
// ];
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
      //const { data } = await axios.get("/api/products");
      // const { data } = await axios.get(
      //   "https://ecomm-demo.utpalpati.repl.co/product"
      // );
      // console.log("product data", data);

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
      let historyflag = 0;
      let historynewarr = state.history.map((item) => {
        if (item.id === action.payload.id) {
          historyflag = 1;
          return {
            ...item,
            ishistory: action.payload.ishistory,
            lastseen: action.payload.lastseen
          };
        }
        return item;
      });
      return historyflag === 0
        ? { ...state, history: [...state.history, action.payload] }
        : { ...state, history: historynewarr };

    case "REMOVE_FROM_HISTORY":
      return {
        ...state,
        history: state.history.map((item) => {
          if (item.id === action.payload) {
            return { ...item, ishistory: !item.ishistory };
          }
          return item;
        })
      };

    case "ADD_TO_LIKEDLIST":
      let likelistflag = 0;
      let likelistnewarr = state.likedlist.map((item) => {
        if (item.id === action.payload.id) {
          likelistflag = 1;
          return { ...item, islike: action.payload.islike };
        }
        return item;
      });
      return likelistflag === 0
        ? { ...state, likedlist: [...state.likedlist, action.payload] }
        : { ...state, likedlist: likelistnewarr };

    case "REMOVE_FROM_LIKEDLIST":
      return {
        ...state,
        likedlist: state.likedlist.map((item) => {
          if (item.id === action.payload) {
            return { ...item, islike: !item.islike };
          }
          return item;
        })
      };
    default:
      return console.log("error");
  }
}
