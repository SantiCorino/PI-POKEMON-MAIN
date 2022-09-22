import { useEffect, useState } from "react"
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function PokemonDetail(){
    const [ pokemon, setPokemon ] = useState(null)
    let { id } = useParams()
    useEffect(()=>{
        axios.get('http://localhost:3001/api/pokemons/' + id)
        .then((r)=>{
            setPokemon(r.data)
        })
        return ()=>{
            setPokemon(null)
        }
    }, [])
    console.log(pokemon);
    // console.log(pokemon.types);
    // let typesMap = pokemon.types.map((t)=>(
    //     <h4>{t}</h4>
    // ))
    return <div>
        {
            pokemon ?
            <> 
            <h2>Soy PokemonDetail</h2>
            <h2>{pokemon.name}</h2>
            <h3>ID: {pokemon.id}</h3>
            <img src={pokemon.image} alt="imagen" />
            <h4>Tipos:
                <div>{pokemon.types}</div>
            </h4>
            <h4>HP: {pokemon.hp}</h4>
            <h4>Ataque: {pokemon.attack}</h4>
            <h4>Defensa: {pokemon.defense}</h4>
            <h4>Velocidad: {pokemon.speed}</h4>
            <h4>Altura: {pokemon.height}</h4>
            <h4>Peso: {pokemon.weight}</h4>
            </> :
            <div>Estoy loading!</div>
        }
    </div>
}