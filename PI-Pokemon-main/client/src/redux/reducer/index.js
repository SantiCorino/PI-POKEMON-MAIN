import { ATTACK_SORT, CREATE_POKEMON, GET_ALL_POKEMONS, GET_POKEMON_DETAILS, GET_TYPES, NAME_SORT, ORIGIN_FILTER, SEARCH_POKEMONS, TYPE_FILTER } from "../actions";

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
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case SEARCH_POKEMONS:
            return {
                ...state,
                filteredPokemons: [action.payload]
            }
        case NAME_SORT:
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
            case ATTACK_SORT:
                let attackOrderedPokemons = [...state.pokemons];
                attackOrderedPokemons = attackOrderedPokemons.sort((a, b) => {
                    if(a.attack < b.attack) {
                        return action.payload === "ascendente" ? -1 : 1;
                    }
                    if(a.attack > b.attack) {
                        return action.payload === "ascendente" ? 1 : -1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    filteredPokemons: attackOrderedPokemons
                };
            case TYPE_FILTER:
                let typeFilteredPokemons = [...state.pokemons];
                if(action.payload === "all") typeFilteredPokemons = state.pokemons;
                else {
                    typeFilteredPokemons=typeFilteredPokemons.filter((p)=> p.types.includes(action.payload) )
                }
                return {
                    ...state,
                    filteredPokemons: typeFilteredPokemons
                };
            case ORIGIN_FILTER:
                let originFilteredPokemons = [...state.pokemons];
                if(action.payload === "all") originFilteredPokemons = state.pokemons;
                if(action.payload === "API") originFilteredPokemons = originFilteredPokemons.filter((p)=> typeof p.id === "number")
                if(action.payload === "created") originFilteredPokemons = originFilteredPokemons.filter((p)=> typeof p.id !== "number")
                return {
                    ...state,
                    filteredPokemons: originFilteredPokemons
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