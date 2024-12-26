import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../api/api"

export type MovieState = IMovie | null

const initialState: MovieState = null

export const movieSlice = createSlice({
  name: 'movie',
  initialState: initialState as (IMovie | null),
  reducers: {
    setMovie: (state, action: PayloadAction<IMovie>) => {
      return action.payload
    },
    clearMovie: () => {
      return initialState;
    },
  },
  selectors: { selectMovie: movie => movie }
})

export const { setMovie } = movieSlice.actions
export const { selectMovie } = movieSlice.selectors