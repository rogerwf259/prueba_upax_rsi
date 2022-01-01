import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Employee } from '../../types';
import { getEmployees, postEmployee } from '../thunks';

type AppState = {
  auth: null | { username: string };
  employees: null | Employee[];
  loading: string[];
};

const INITIAL_STATE: AppState = {
  auth: null,
  employees: null,
  loading: [],
};

const { reducer, actions } = createSlice({
  name: 'main',
  initialState: INITIAL_STATE,
  reducers: {
    setCredentials(state, { payload }: { payload: string }) {
      state.auth = { username: payload };
    },
    toggleLoading(state, { payload }: { payload: string }) {
      if (state.loading.includes(payload))
        state.loading = state.loading.filter((s) => s !== payload);
      else state.loading.push(payload);
    },
    logout(state) {
      state.auth = null;
      state.employees = null;
      state.loading = [];
    },
  },
  extraReducers: {
    [getEmployees.fulfilled.type]: (
      state,
      { payload }: { payload: Employee[] }
    ) => {
      state.employees = payload;
    },
    [getEmployees.rejected.type]: (state, { payload }) => {
      state.employees = [];
    },
  },
});

export const { toggleLoading, setCredentials, logout } = actions;

export const selectAuth = (state: RootState) => state.main.auth;
export const selectLoading = (state: RootState) => state.main.loading;
export const selectEmployees = (state: RootState) => state.main.employees;

export default reducer;
