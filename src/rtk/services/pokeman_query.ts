import type {Pokemon} from '../../types/pokeman.type';
import baseService from './base_query';

// Define a service using a base URL and expected endpoints
export const pokemonApi = baseService.injectEndpoints({
  endpoints: builder => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: name => `pokemon/${name}`,
    }),

    getAllPokemons: builder.query<Pokemon[], void>({
      query: _ => `pokemon`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetPokemonByNameQuery, useGetAllPokemonsQuery} = pokemonApi;
