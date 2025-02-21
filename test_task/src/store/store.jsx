import { configureStore } from '@reduxjs/toolkit';
import repository from "./slice"

export default configureStore({
  reducer: {
    repository: repository,
  },
});

