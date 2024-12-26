import { createAppSlice } from "./createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    login(state, action: PayloadAction<any>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  selectors: {
    selectIsAuthenticated: auth => auth.isAuthenticated,
    selectUser: auth => auth.user,
  },
})

export const { setAuthenticated, setUser, clearUser, setLoading, setError } = authSlice.actions
export const { selectIsAuthenticated, selectUser } = authSlice.selectors