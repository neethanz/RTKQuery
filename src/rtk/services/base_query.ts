import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, WebApi, extraOptions) => {
  const accessToken = null;
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
    prepareHeaders: async headers => {
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }
      headers.set('accept', 'application/json');
      return headers;
    },
  });
  return rawBaseQuery(args, WebApi, extraOptions);
};

// initialize an empty api service that we'll inject endpoints into later as needed
const baseService = createApi({
  reducerPath: 'baseService',
  baseQuery: dynamicBaseQuery,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: ['Auth'],
  endpoints: builder => ({}),
  keepUnusedDataFor: 0,
});

export default baseService;
