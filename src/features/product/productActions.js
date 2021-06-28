import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { errorAlert, handleErrorMessage, successAlert } from '@utils/index';
import { updateAuthUser } from '@features/auth/authSlice';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const attemptGetProducts = createAsyncThunk(
  'user/attemptGetProducts',
  async () => {
    try {
      const { data } = await axios.get(`/api/product`, config);
      errorAlert(data.error);
      successAlert(data.message);
    } catch (err) {
      errorAlert(handleErrorMessage(err));
      return handleErrorMessage(err);
    }
  }
);

export const attemptCreateProduct = createAsyncThunk(
  'user/attemptCreateProduct',
  async (productData, { dispatch, getState }) => {
    try {
      const { user } = getState().auth;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/product/create`,
        productData,
        config
      );

      errorAlert(data.error);
      successAlert(data.message);

      return data;
    } catch (err) {
      errorAlert(handleErrorMessage(err));
      return handleErrorMessage(err);
    }
  }
);