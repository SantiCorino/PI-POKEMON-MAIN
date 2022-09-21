import axios from 'axios';

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const SEARCH_POKEMONS = "SEARCH_POKEMONS";
export const GET_POKEMON_DETAILS = "GET_POKEMON_DETAILS";
export const CREATE_POKEMON = "CREATE_POKEMON";

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
}

export function searchPokemon(search){
    return function(dispatch){
        axios.get('http://localhost:3001/api/pokemons?name=' + search)
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