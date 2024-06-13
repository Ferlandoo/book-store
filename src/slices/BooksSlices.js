import { apiSlice } from "./apiSlice";
import { API_KEY, LISTS_URL } from "../constants";

export const booksSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLists: builder.query({
      query: () => ({
        url: LISTS_URL,
        params: {
          'api-key': API_KEY,
        },
      }),
      transformResponse: (response) => response.results.lists,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetListsQuery } = booksSlice;
