import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SourcesService from '../api-services/sourcesService';

// initial state
const initialState = {
  sourcesMeta: {
    categories: [],
    languages: [],
    countries: [],
  },
  sources: [],
  isLoading: false,
  errorMessage: null,
};

export const fetchSources = createAsyncThunk(
  'sources/meta',
  async (payload, { rejectWithValue }) => {
    try {
      const sourcesMeta = await SourcesService.getSourcesMeta();
      const sources = await SourcesService.getSources({
        category: sourcesMeta.categories[0]
      });
      return { sourcesMeta, sources};
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


const sourcesSlice = createSlice({
  name: 'sources',
  initialState,
  reducers: {
    setSources: (state, action) => {
        state.sources = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSources.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    });
    builder.addCase(fetchSources.fulfilled, (state, action ) => {
      state.sourcesMeta = action.payload.sourcesMeta;
      state.sources = action.payload.sources.sources.sources;
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(fetchSources.rejected, (state, { payload }) => {
      state.errorMessage = payload;
      state.isLoading = false;
    });
  },
});

export default sourcesSlice;
