import { CREATE_POKEMON, GET_ALL_POKEMONS, GET_POKEMON_DETAILS, SEARCH_POKEMONS } from "../actions";

const initialState = {
    pokemons: [],
    pokemonDetails: [],
    filteredPokemons: [],
    types: []
}

export default function reducer( state = initialState, action){
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            };
        case SEARCH_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            }
        case GET_POKEMON_DETAILS:
            return {
                ...state,
                pokemonDetails: action.payload
            };
        case CREATE_POKEMON:
            return {
                ...state,
                pokemons: [...state.pokemons, action.payload]
            };
        
        default:
            return state;
    }
}