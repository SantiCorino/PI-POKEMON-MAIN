import axios from 'axios';

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const SEARCH_POKEMONS = "SEARCH_POKEMONS";
export const NAME_SORT = "NAME_SORT";
export const ATTACK_SORT = "ATTACK_SORT";
export const TYPE_FILTER = "TYPE_FILTER";
export const ORIGIN_FILTER = "ORIGIN_FILTER";
export const CLEAR_POKEMONS = "CLEAR_POKEMONS";
export const SEARCH_POKEMON_DETAIL = "SEARCH_POKEMON_DETAIL";



export function getAllPokemons(){
    return function(dispatch){
        axios.get('http://localhost:3001/api/pokemons/')
        .then((p)=>{
            dispatch({
                type: GET_ALL_POKEMONS,
                payload: p.data
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
};

export function getTypes(){
    return function(dispatch){
        axios.get('http://localhost:3001/api/types/')
        .then((t)=>{
            dispatch({
                type: GET_TYPES,
                payload: t.data
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
};

export function createPokemon(pokemon){
    return function(dispatch){
        axios.post(`http://localhost:3001/api/pokemons/`, pokemon)
        .then(()=>{
            dispatch({
                type: CREATE_POKEMON
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
};

export function searchPokemon(search){
    return function(dispatch){
        axios.get(`http://localhost:3001/api/pokemons?name=${search.toLowerCase()}`)
        .then((p)=>{
            dispatch({
                type: SEARCH_POKEMONS,
                payload: p.data
            })
        })
        .catch((err)=>{
            console.log(err && alert('Debes ingresar un nombre válido'));
        })
    }
};

export function searchPokemonDetail(id){
    return function(dispatch){
        axios.get(`http://localhost:3001/api/pokemons/${id}`)
        .then((p)=>{
            dispatch({
                type: SEARCH_POKEMON_DETAIL,
                payload: p.data
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
};

export function clearPokemons(){
    return {
        type: CLEAR_POKEMONS
    }
};

export function nameSort(order){
    return {
        type: NAME_SORT,
        payload: order
    }
};

export function attackSort(order){
    return {
        type: ATTACK_SORT,
        payload: order
    }
}

export function typeFilter(type){
    return {
        type: TYPE_FILTER,
        payload: type
    }
}

export function originFilter(type){
    return {
        type: ORIGIN_FILTER,
        payload: type
    }
}