import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IFilterBook {
  genre?: string;
  publication_date?: string;
  searchTerm?: string;
}

const initialState: IFilterBook = {
  genre: "",
  publication_date: "",
  searchTerm: "",
};

// Filter code at frontend
const bookFilterSlice = createSlice({
  name: "filterBook",
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    setPublicationYear: (state, action: PayloadAction<string>) => {
      state.publication_date = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setGenre, setPublicationYear, setSearchTerm } =
  bookFilterSlice.actions;

export default bookFilterSlice.reducer;

/*
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "bookFilterApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  endpoints: (builder) => ({
    getBookFilter: builder.query({
      query: (searchTerm: string, genre: string, publication_data: string) => `/books?searchTerm=${searchTerm}&genre=${genre}&publication_data=${publication_data}`,
    }),
  }),
});

export const { useGetBookFilterQuery } = api;

*/
