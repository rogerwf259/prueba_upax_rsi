import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import { Employee } from '../../types';
import { toggleLoading } from '../slices/Main';

export const getEmployees = createAsyncThunk<Employee[]>(
  'main/getEmployees',
  async (args, { dispatch, rejectWithValue }) => {
    try {
      dispatch(toggleLoading('getEmployees'));
      const { data } = await axios.get(
        `https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/rogelio_silva`
      );
      data.data.employees.forEach((e: any) => {
        e.birthday = new Date(e.birthday).toLocaleDateString();
      });

      dispatch(toggleLoading('getEmployees'));
      return data.data.employees as Employee[];
    } catch (error) {
      dispatch(toggleLoading('getEmployees'));
      return rejectWithValue('GET Request Failed');
    }
  }
);

export const postEmployee = createAsyncThunk<
  void,
  { name: string; lastName: string; birthday: string }
>(
  'main/postEmployee',
  async ({ name, lastName, birthday }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(toggleLoading('postEmployee'));
      const { data } = await axios.post(
        `https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/rogelio_silva`,
        { name, last_name: lastName, birthday }
      );
      dispatch(getEmployees());
      dispatch(toggleLoading('postEmployee'));
      return data;
    } catch (error) {
      dispatch(toggleLoading('postEmployee'));
      return rejectWithValue('Failed to create Employee');
    }
  }
);
