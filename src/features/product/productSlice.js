import { createSlice } from '@reduxjs/toolkit';
import { attemptCreateProduct, attemptGetProducts } from './productActions';

const initialState = {
  loading: false,
  error: null,
  success: false,
  message: null,
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(attemptGetProducts.pending, state => {
        state.loading = true;
      })
      .addCase(attemptGetProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.products.push(payload.products);
      })
      .addCase(attemptGetProducts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(attemptCreateProduct.pending, state => {
        state.loading = true;
      })
      .addCase(attemptCreateProduct.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(attemptCreateProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const productReducer = productSlice.reducer;
