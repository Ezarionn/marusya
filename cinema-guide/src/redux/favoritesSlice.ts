import { createAppSlice } from "./createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

function removeElementByValue(arr, value) {
  const index = arr.indexOf(value);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}

interface FavoritesState {
  favoritesId: string[];
}

const storedFavorites = localStorage.getItem('favoritesId');

const initialState: FavoritesState = {
  favoritesId: storedFavorites ? JSON.parse(storedFavorites) : [],
};

export const favoritesSlice = createAppSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<string>) {
      state.favoritesId.push(action.payload)
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      const oldFavorites = state.favoritesId
      state.favoritesId = removeElementByValue(oldFavorites, action.payload);
    },
    setFavorites(state, action: PayloadAction<string[]>) {
      state.favoritesId = action.payload;
    },
  },
  selectors: {
    selectFavoritesId: favorite => favorite.favoritesId,
  },
})

export const isFavorite = (movieId: string) => (state: { favoritesId: FavoritesState }) => {
  return state.favoritesId.favoritesId.includes(movieId);
};


export const { addToFavorites, removeFromFavorites, setFavorites } = favoritesSlice.actions
export const { selectFavoritesId } = favoritesSlice.selectors