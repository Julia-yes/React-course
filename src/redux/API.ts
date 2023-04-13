import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ICharacter, IData } from '../interfaces';

export const dataApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/character/' }),
  endpoints: (builder) => ({
    getData: builder.query<IData, { search: string; page: number }>({
      query: (arg) => {
        const { search, page } = arg;
        return {
          url: page ? `?name=${search}&page=${page}` : `?name=${search}`,
        };
      },
    }),
    getCharacter: builder.query<ICharacter, number | null>({
      query: (id) => `${id}`,
    }),
  }),
});

export const { useGetDataQuery, useGetCharacterQuery } = dataApi;
