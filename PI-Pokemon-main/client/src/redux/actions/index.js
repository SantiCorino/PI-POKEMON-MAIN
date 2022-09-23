import axios from 'axios';

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const SEARCH_POKEMONS = "SEARCH_POKEMONS";
export const GET_POKEMON_DETAILS = "GET_POKEMON_DETAILS";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const NAME_SORT = "NAME_SORT";
export const ATTACK_SORT = "ATTACK_SORT";
export const TYPE_FILTER = "TYPE_FILTER";
export const ORIGIN_FILTER = "ORIGIN_FILTER";



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
}

export function searchPokemon(search){
    return function(dispatch){
        axios.get('http://localhost:3001/api/pokemons?name=' + search.toLowerCase())
        .then((p)=>{
            dispatch({
                type: SEARCH_POKEMONS,
                payload: p.data
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

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