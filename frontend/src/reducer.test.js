import { reducer } from "./Reducer-context";
/*-------------playlist test-------------- */
describe("reducer playlist test", () => {
  it("should add new playlist", () => {
    const initialState = {
      playlist: []
    };
    const addPlaylist = {
      type: "NEW_PLAYLIST",
      payload: {
        id: "123",
        name: "aaa",
        videos: []
      }
    };
    let state = reducer(initialState, addPlaylist);
    expect(state).toEqual({
      playlist: [
        {
          id: "123",
          name: "aaa",
          videos: []
        }
      ]
    });
    const addPlaylist2 = {
      type: "NEW_PLAYLIST",
      payload: {
        id: "124",
        name: "jaa",
        videos: []
      }
    };
    state = reducer(state, addPlaylist2);
    expect(state).toEqual({
      playlist: [
        {
          id: "123",
          name: "aaa",
          videos: []
        },
        {
          id: "124",
          name: "jaa",
          videos: []
        }
      ]
    });
  });

  it("should remove playlist", () => {
    const initialState = {
      playlist: [
        {
          id: "123",
          name: "aaa",
          videos: []
        },
        {
          id: "124",
          name: "jaa",
          videos: []
        }
      ]
    };
    const removePlaylist = {
      type: "REMOVE_PLAYLIST",
      payload: "123"
    };
    let state = reducer(initialState, removePlaylist);
    expect(state).toEqual({
      playlist: [
        {
          id: "124",
          name: "jaa",
          videos: []
        }
      ]
    });
  });

  it("should add video to specified playlist", () => {
    const initialState = {
      playlist: [
        {
          id: "123",
          name: "aaa",
          videos: []
        },
        {
          id: "124",
          name: "jaa",
          videos: []
        }
      ]
    };
    const addVideoToPlaylist = {
      type: "ADD_TO_PLAYLIST",
      payload: {
        playlistid: "123",
        videoid: "111"
      }
    };
    let state = reducer(initialState, addVideoToPlaylist);
    expect(state).toEqual({
      playlist: [
        {
          id: "123",
          name: "aaa",
          videos: ["111"]
        },
        {
          id: "124",
          name: "jaa",
          videos: []
        }
      ]
    });
  });

  it("should remove specific video from specified playlist", () => {
    const initialState = {
      playlist: [
        {
          id: "123",
          name: "aaa",
          videos: ["111"]
        },
        {
          id: "124",
          name: "jaa",
          videos: []
        }
      ]
    };
    const removeVideoFromPlaylist = {
      type: "REMOVE_FROM_PLAYLIST",
      payload: {
        playlistid: "123",
        videoid: "111"
      }
    };
    let state = reducer(initialState, removeVideoFromPlaylist);
    expect(state).toEqual({
      playlist: [
        {
          id: "123",
          name: "aaa",
          videos: []
        },
        {
          id: "124",
          name: "jaa",
          videos: []
        }
      ]
    });
  });
});

/*------------history test----------------------*/

describe("reducer history test", () => {
  it("should add to history ", () => {
    const initialState = {
      history: []
    };
    const addToHistory = {
      type: "ADD_TO_HISTORY",
      payload: {
        historyId: "151",
        lastseen: Date()
      }
    };

    let state = reducer(initialState, addToHistory);
    expect(state).toEqual({
      history: [
        {
          historyId: "151",
          lastseen: Date()
        }
      ]
    });
  });

  it("should remove from history ", () => {
    const initialState = {
      history: [
        {
          historyId: "151",
          lastseen: new Date()
        }
      ]
    };
    const removeFromHistory = {
      type: "REMOVE_FROM_HISTORY",
      payload: {
        historyId: "151"
      }
    };

    let state = reducer(initialState, removeFromHistory);
    expect(state).toEqual({
      history: []
    });
  });
});

/*-------likedlist test----------*/
describe("reducer likedlist test", () => {
  it("should add video to likedlist", () => {
    const initialState = {
      likedlist: []
    };
    const addToLikedlist = {
      type: "ADD_TO_LIKEDLIST",
      payload: "111"
    };
    let state = reducer(initialState, addToLikedlist);
    expect(state).toEqual({
      likedlist: ["111"]
    });
  });
  it("should remove video from likedlist", () => {
    const initialState = {
      likedlist: ["111"]
    };
    const addToLikedlist = {
      type: "REMOVE_FROM_LIKEDLIST",
      payload: "111"
    };
    let state = reducer(initialState, addToLikedlist);
    expect(state).toEqual({
      likedlist: []
    });
  });
});
