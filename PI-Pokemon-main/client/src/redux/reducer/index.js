import { CREATE_POKEMON, GET_ALL_POKEMONS, GET_POKEMON_DETAILS, SEARCH_POKEMONS, SORT } from "../actions";

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
                pokemons: action.payload,
                filteredPokemons: action.payload
            };
        case SEARCH_POKEMONS:
            return {
                ...state,
                filteredPokemons: action.payload
            }
        case SORT:
            let orderedPokemons = [...state.pokemons];
            orderedPokemons = orderedPokemons.sort((a, b) => {
                if(a.name.toLowerCase() < b.name.toLowerCase()) {
                    return action.payload === "ascendente" ? -1 : 1;
                }
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return action.payload === "ascendente" ? 1 : -1;
                }
                return 0;
            })
            return {
                ...state,
                filteredPokemons: orderedPokemons
            };





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