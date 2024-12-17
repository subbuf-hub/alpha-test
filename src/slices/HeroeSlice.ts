import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "../models/Result";

interface HeroesState {
  heroes: Result[];
  loadingPage: number;
  maxId: number;
}

const initialState: HeroesState = {
  heroes: [],
  loadingPage: 1,
  maxId: 0,
};

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    // Функция для добавления героя, если он еще не существует в списке
    addHero(state, action: PayloadAction<Result>) {
      const existingHero = state.heroes.find(
        (hero) => hero.id === action.payload.id
      );
      if (!existingHero) {
        state.heroes.push(action.payload);
      }
    },
    // Также можно добавить функцию для сбрасывания героев (optional)
    setHeroes(state, action: PayloadAction<Result[]>) {
      state.heroes = action.payload;
    },
    likeHero(state, action: PayloadAction<number>) {
      const hero = state.heroes.find((h) => h.id === action.payload);
      if (hero) {
        hero.isLiked = !hero.isLiked; // Переключаем статус лайка
      }
    },
    deleteHero(state, action: PayloadAction<number>) {
      state.heroes = state.heroes.filter((hero) => hero.id !== action.payload); // Удаляем героя
    },
    loadPageUp(state, action: PayloadAction<number>) {
      state.loadingPage = action.payload;
    },
    updateHero(state, action: PayloadAction<Result>) {
      const index = state.heroes.findIndex((h) => h.id === action.payload.id);
      if (index !== -1) {
        // Если герой найден, обновляем его свойства
        state.heroes[index] = { ...state.heroes[index], ...action.payload };
      }
    },
    setMaxID(state, action: PayloadAction<number>) {
      state.maxId = action.payload;
    },
  },
});

export const {
  addHero,
  setHeroes,
  likeHero,
  deleteHero,
  loadPageUp,
  updateHero,
  setMaxID,
} = heroesSlice.actions;

export default heroesSlice.reducer;
