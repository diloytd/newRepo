import {
  repositoryLoading,
  repositoryReceived,
  repositoryRejected,
  setCurrentPage,
} from "../store/slice";

import 'dotenv/config';

const token = process.env.GITHUB_TOKEN;
export default function Api(user, currentPage) {
  return async function (dispatch, getState) {
    const state = getState().repository;
    if (user !== state.lastSearchedUser) {
      dispatch(setCurrentPage(1));
    }
    dispatch(repositoryLoading());
    try {
      const request = await fetch(
        `https://api.github.com/users/${user}/repos?per_page=20&page=${currentPage}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (!request.ok) {
        throw new Error(`Ошибка запроса: ${request.status}`);
      }
      const response = await request.json();
      if (response.length === 0 && currentPage === 1) {
        throw new Error("Репозитории не найдены");
      }
      dispatch(
        repositoryReceived({
          items: response,
          user: user,
          total_count: response.length,
        })
      );
    } catch (err) {
      dispatch(repositoryRejected(err.message));
    }
  };
}
