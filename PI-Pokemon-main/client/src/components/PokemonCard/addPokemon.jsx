import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

export default function AddPokemon(){
    const [ pokemon, setPokemon ] = useState({});
    let history = useHistory();
    function onInputChange(e){
        e.preventDefault();
        setPokemon({
            ...pokemon,
            [e.target.name]: e.target.value
        })
    }

    function onSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/api/pokemons', pokemon)
        .then(()=>{
            history.push('/')
        })
    }

    return <form onSubmit={onSubmit}>
        <label htmlFor="">Nombre</label>
        <input onChange={onInputChange} type="text" name="name" value={pokemon.name} />
        <label htmlFor="">Imagen</label>
        <input onChange={onInputChange} type="text" name="image" value={pokemon.image}/>
        <input type="submit" name="SoySubmit" />
    </form>
}