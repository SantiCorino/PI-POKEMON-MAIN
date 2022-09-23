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
        <input onChange={onInputChange} type="text" name="name" value={pokemon.name} /><br/>
        <label htmlFor="">HP</label>
        <input onChange={onInputChange} type="text" name="hp" value={pokemon.hp} /><br/>
        <label htmlFor="">Ataque</label>
        <input onChange={onInputChange} type="text" name="attack" value={pokemon.attack} /><br/>
        <label htmlFor="">Defensa</label>
        <input onChange={onInputChange} type="text" name="defense" value={pokemon.defense} /><br/>
        <label htmlFor="">Velocidad</label>
        <input onChange={onInputChange} type="text" name="speed" value={pokemon.speed} /><br/>
        <label htmlFor="">Altura</label>
        <input onChange={onInputChange} type="text" name="height" value={pokemon.height} /><br/>
        <label htmlFor="">Peso</label>
        <input onChange={onInputChange} type="text" name="weight" value={pokemon.weight} /><br/>
        <label htmlFor="">Imagen</label>
        <input onChange={onInputChange} type="text" name="image" value={pokemon.image}/><br/>
        <input type="submit" name="SoySubmit" />
    </form>
}