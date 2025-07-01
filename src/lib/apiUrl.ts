const BASE_URL = "https://pokeapi.co/api/v2";

const api = {
  requestPokemon: `${BASE_URL}/pokemon/`,
  requestAllPokemon: `${BASE_URL}/pokemon?limit=100000&offset=0`,
};

export default api;
