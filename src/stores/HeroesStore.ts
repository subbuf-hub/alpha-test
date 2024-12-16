import { configureStore } from "@reduxjs/toolkit";
import heroesReducer from "../slices/HeroeSlice";

export const store = configureStore({
  reducer: {
    heroes: heroesReducer,
  },
});

// Тип для использования в приложении
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
