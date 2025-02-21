import { createSlice } from "@reduxjs/toolkit";


//   name: "repository",
//   initialState: {
//     loading: "",
//     error: "",
//     empty: "",
//     flagScroll: false,
//     currentPage: 1,
//     perPage: 10,
//     totalCount: 0,
//     lastSearchedUser: "",
//     repositories: [],
//   },
//   reducers: {
//     repositoryLoading(state, action) {
//       state.loading = "pending";
//       state.flagScroll = true;
//       state.error = "";
//       state.empty = "";
//     },
//     repositoryReceived(state, action) {
//       state.currentPage = action.payload;
//       state.loading = "";
//       state.flagScroll = false;
//       state.totalCount = action.payload.total_count;
//       if (Array.isArray(action.payload) && action.payload.length > 0) {
//         state.repositories =
//           state.currentPage === 1
//             ? action.payload
//             : [...state.repositories, ...action.payload];
//         state.currentPage += 1;
//         state.lastSearchedUser = action.payload;
//       } else {
//         state.empty = "Данные не найдены. Попробуйте ввести другой запрос";
//       }
//     },
//     repositoryRejected(state, action) {
//       state.empty = "";
//       state.loading = "rejected";
//       state.error = action.payload;
//     },
//     setCurrentPage(state, action) {
//       state.currentPage = action.payload;
//     },
//   },
// });

const repositorySlice = createSlice({
    name: "repository",
    initialState: {
      loading: "",
      error: "",
      empty: "",
      flagScroll: false,
      currentPage: 1,
      perPage: 10,
      totalCount: 0,
      repositories: [],
      lastSearchedUser: "", 
    },
    reducers: {
      repositoryLoading(state) {
        state.loading = "pending";
        state.flagScroll = true;
        state.error = "";
        state.empty = "";
      },
      repositoryReceived(state, action) {
        state.loading = "";
        state.flagScroll = false;
        state.totalCount = action.payload.total_count;
        state.repositories =
          action.payload.currentPage === 1
            ? action.payload.items
            : [...state.repositories, ...action.payload.items];
        state.lastSearchedUser = action.payload.user; 
      },
      repositoryRejected(state, action) {
        state.empty = "";
        state.loading = "rejected";
        state.error = action.payload;
      },
      setCurrentPage(state, action) {
        state.currentPage = action.payload;
      },
    },
  });

export const {
  repositoryLoading,
  repositoryReceived,
  repositoryRejected,
  setCurrentPage,
} = repositorySlice.actions;

export default repositorySlice.reducer;
